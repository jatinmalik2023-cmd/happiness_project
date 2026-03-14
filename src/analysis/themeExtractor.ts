import { Dimension } from '../types/chat';
import { Theme, UserPhrase } from '../types/analysis';
import { keywordDictionary, ngramPhrases, categoryLabels } from '../data/keywords';
import { subcategories, subcategoryLabels } from '../data/subcategories';
import { processText, extractBigrams, extractKeyPhrases } from '../utils/textProcessing';
import { findSynonymGroup } from '../data/synonymMap';

interface SubcategoryScore {
  subcategoryId: string;
  parentCategory: string;
  score: number;
  matchedKeywords: Set<string>;
}

/**
 * Extract user phrases from responses — preserves the user's verbatim language
 * and maps each phrase to a category/subcategory.
 */
export function extractUserPhrases(responses: string[], dimension: Dimension): UserPhrase[] {
  const phrases: UserPhrase[] = [];

  for (const response of responses) {
    const keyPhrases = extractKeyPhrases(response);

    for (const rawPhrase of keyPhrases) {
      const normalized = rawPhrase.toLowerCase().trim();

      // Try to match against subcategories first
      let bestSubcat = '';
      let bestCategory = '';
      let bestScore = 0;

      for (const sc of subcategories) {
        let score = 0;
        for (const kw of sc.keywords) {
          if (normalized.includes(kw) || kw.includes(normalized)) {
            score += kw.length;
          }
        }
        if (score > bestScore) {
          bestScore = score;
          bestSubcat = sc.id;
          bestCategory = sc.parentCategory;
        }
      }

      // Fall back to parent category matching
      if (!bestCategory) {
        for (const [category, keywords] of Object.entries(keywordDictionary)) {
          for (const kw of keywords) {
            if (normalized.includes(kw) || kw.includes(normalized)) {
              bestCategory = category;
              break;
            }
          }
          if (bestCategory) break;
        }
      }

      if (bestCategory || rawPhrase.split(' ').length >= 2) {
        phrases.push({
          raw: rawPhrase,
          normalized,
          category: bestCategory || 'unclassified',
          subcategory: bestSubcat || 'general',
          dimension,
        });
      }
    }
  }

  return phrases;
}

export function extractThemes(responses: string[], dimension: Dimension): Theme[] {
  const subcategoryScoreMap: Record<string, SubcategoryScore> = {};
  const categoryScores: Record<string, number> = {};
  const categoryKeywords: Record<string, Set<string>> = {};

  // Extract user phrases for this dimension
  const userPhrases = extractUserPhrases(responses, dimension);

  for (const response of responses) {
    const tokens = processText(response);
    const bigrams = extractBigrams(response);

    // 1. Subcategory matching (most specific)
    for (const token of tokens) {
      for (const sc of subcategories) {
        for (const kw of sc.keywords) {
          if (token.includes(kw) || kw.includes(token)) {
            if (!subcategoryScoreMap[sc.id]) {
              subcategoryScoreMap[sc.id] = { subcategoryId: sc.id, parentCategory: sc.parentCategory, score: 0, matchedKeywords: new Set() };
            }
            subcategoryScoreMap[sc.id].score += 1.5;
            subcategoryScoreMap[sc.id].matchedKeywords.add(kw);
            break;
          }
        }
      }
    }

    // 2. Bigram matching against subcategory keywords (multi-word keywords)
    for (const bigram of bigrams) {
      for (const sc of subcategories) {
        for (const kw of sc.keywords) {
          if (kw.includes(' ') && (bigram.includes(kw) || kw.includes(bigram))) {
            if (!subcategoryScoreMap[sc.id]) {
              subcategoryScoreMap[sc.id] = { subcategoryId: sc.id, parentCategory: sc.parentCategory, score: 0, matchedKeywords: new Set() };
            }
            subcategoryScoreMap[sc.id].score += 3;
            subcategoryScoreMap[sc.id].matchedKeywords.add(kw);
          }
        }
      }
    }

    // 3. Parent category dictionary matching
    for (const token of tokens) {
      for (const [category, keywords] of Object.entries(keywordDictionary)) {
        for (const kw of keywords) {
          if (token.includes(kw) || kw.includes(token)) {
            categoryScores[category] = (categoryScores[category] || 0) + 1;
            if (!categoryKeywords[category]) categoryKeywords[category] = new Set();
            categoryKeywords[category].add(kw);
            break;
          }
        }
      }

      // Synonym group matching
      const group = findSynonymGroup(token);
      if (group) {
        const relatedCategories = Object.entries(keywordDictionary).filter(([, kws]) =>
          kws.some(k => token.includes(k) || k.includes(token))
        );
        for (const [cat] of relatedCategories) {
          categoryScores[cat] = (categoryScores[cat] || 0) + 0.5;
        }
      }
    }

    // 4. N-gram phrase matching
    for (const bigram of bigrams) {
      for (const [phrase, category] of Object.entries(ngramPhrases)) {
        if (bigram.includes(phrase) || phrase.includes(bigram)) {
          categoryScores[category] = (categoryScores[category] || 0) + 2;
          if (!categoryKeywords[category]) categoryKeywords[category] = new Set();
          categoryKeywords[category].add(phrase);
        }
      }
    }
  }

  // Merge subcategory scores into a unified scoring system
  const themeScores: Record<string, {
    category: string;
    subcategory: string;
    label: string;
    score: number;
    keywords: Set<string>;
  }> = {};

  // Add subcategory-level themes (preferred — most specific)
  for (const [scId, scData] of Object.entries(subcategoryScoreMap)) {
    themeScores[scId] = {
      category: scData.parentCategory,
      subcategory: scId,
      label: subcategoryLabels[scId] || categoryLabels[scData.parentCategory] || scId,
      score: scData.score,
      keywords: scData.matchedKeywords,
    };
  }

  // Add parent category themes only if no subcategory already scored for that category
  for (const [cat, score] of Object.entries(categoryScores)) {
    const hasSubcategory = Object.values(themeScores).some(ts => ts.category === cat);
    if (!hasSubcategory) {
      themeScores[cat] = {
        category: cat,
        subcategory: 'general',
        label: categoryLabels[cat] || cat,
        score,
        keywords: categoryKeywords[cat] || new Set(),
      };
    } else {
      // Boost existing subcategory scores with parent category score
      for (const ts of Object.values(themeScores)) {
        if (ts.category === cat) {
          ts.score += score * 0.3;
        }
      }
    }
  }

  // Convert to Theme objects sorted by score
  const totalScore = Object.values(themeScores).reduce((a, b) => a + b.score, 0) || 1;

  const themes: Theme[] = Object.values(themeScores)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(ts => ({
      label: ts.label,
      category: ts.category,
      subcategory: ts.subcategory,
      keywords: Array.from(ts.keywords),
      userPhrases: userPhrases.filter(up =>
        up.category === ts.category || up.subcategory === ts.subcategory
      ),
      confidence: Math.min(ts.score / totalScore * 2, 1),
      dimension,
    }));

  // If no themes found, provide a generic one
  if (themes.length === 0) {
    themes.push({
      label: 'Personal Growth',
      category: 'personal_growth',
      subcategory: 'general',
      keywords: [],
      userPhrases: userPhrases.slice(0, 3),
      confidence: 0.3,
      dimension,
    });
  }

  return themes;
}

export function getAllCategories(dimensionThemes: Record<Dimension, Theme[]>): string[] {
  const categories = new Set<string>();
  for (const themes of Object.values(dimensionThemes)) {
    for (const theme of themes) {
      categories.add(theme.category);
    }
  }
  return Array.from(categories);
}

export function getAllSubcategories(dimensionThemes: Record<Dimension, Theme[]>): string[] {
  const subcats = new Set<string>();
  for (const themes of Object.values(dimensionThemes)) {
    for (const theme of themes) {
      if (theme.subcategory && theme.subcategory !== 'general') {
        subcats.add(theme.subcategory);
      }
    }
  }
  return Array.from(subcats);
}

/** Get all user phrases across all dimensions */
export function getAllUserPhrases(dimensionThemes: Record<Dimension, Theme[]>): UserPhrase[] {
  const phrases: UserPhrase[] = [];
  const seen = new Set<string>();
  for (const themes of Object.values(dimensionThemes)) {
    for (const theme of themes) {
      for (const up of theme.userPhrases) {
        if (!seen.has(up.normalized)) {
          phrases.push(up);
          seen.add(up.normalized);
        }
      }
    }
  }
  return phrases;
}

/** Get the top user phrase for a dimension (prefer multi-word) */
export function getTopPhraseForDimension(themes: Theme[]): string {
  for (const theme of themes) {
    const multiWord = theme.userPhrases.find(p => p.raw.includes(' '));
    if (multiWord) return multiWord.raw;
  }
  for (const theme of themes) {
    if (theme.userPhrases.length > 0) return theme.userPhrases[0].raw;
  }
  return themes[0]?.label || '';
}
