import { Dimension } from '../types/chat';
import { Theme, IntersectionResult, IkigaiResult, UserPhrase } from '../types/analysis';
import { ikigaiStatementTemplates } from '../data/ikigaiDescriptions';
import { extractThemes, extractUserPhrases, getAllCategories, getAllSubcategories, getTopPhraseForDimension } from './themeExtractor';
import { computeIntersections } from './intersectionMapper';
import { generateRecommendations } from './recommendationEngine';
import { findMatchingCareers } from '../data/careerDatabase';
import { buildStrengthsProfile } from './strengthsProfiler';

export function computeIkigai(responses: Record<Dimension, string[]>): IkigaiResult {
  // Step 1: Extract user phrases per dimension (verbatim capture)
  const dimensionPhrases: Record<Dimension, UserPhrase[]> = {
    love: extractUserPhrases(responses.love, 'love'),
    goodAt: extractUserPhrases(responses.goodAt, 'goodAt'),
    worldNeeds: extractUserPhrases(responses.worldNeeds, 'worldNeeds'),
    paidFor: extractUserPhrases(responses.paidFor, 'paidFor'),
  };

  // Step 2: Extract themes per dimension (with subcategories)
  const dimensionThemes: Record<Dimension, Theme[]> = {
    love: extractThemes(responses.love, 'love'),
    goodAt: extractThemes(responses.goodAt, 'goodAt'),
    worldNeeds: extractThemes(responses.worldNeeds, 'worldNeeds'),
    paidFor: extractThemes(responses.paidFor, 'paidFor'),
  };

  // Step 3: Collect all categories, subcategories, and phrases
  const allCategories = getAllCategories(dimensionThemes);
  const allSubcategories = getAllSubcategories(dimensionThemes);
  const allPhrases: UserPhrase[] = [];
  const seenPhrases = new Set<string>();
  for (const phrases of Object.values(dimensionPhrases)) {
    for (const p of phrases) {
      if (!seenPhrases.has(p.normalized)) {
        allPhrases.push(p);
        seenPhrases.add(p.normalized);
      }
    }
  }

  // Step 4: Compute intersections with user evidence
  const intersections = computeIntersections(dimensionThemes, dimensionPhrases);

  // Step 5: Find central Ikigai — themes appearing across 3+ dimensions
  const categoryCounts: Record<string, number> = {};
  for (const dim of Object.values(dimensionThemes)) {
    const seen = new Set<string>();
    for (const theme of dim) {
      if (!seen.has(theme.category)) {
        categoryCounts[theme.category] = (categoryCounts[theme.category] || 0) + 1;
        seen.add(theme.category);
      }
    }
  }

  const centralCategories = Object.entries(categoryCounts)
    .filter(([, count]) => count >= 3)
    .sort(([, a], [, b]) => b - a)
    .map(([cat]) => cat);

  let centralThemes: string[];
  let confidence: number;

  if (centralCategories.length > 0) {
    // Use user phrases for central theme names (more specific than category labels)
    centralThemes = centralCategories.map(c => {
      const phrase = allPhrases.find(p => p.category === c && p.raw.includes(' '));
      if (phrase) return phrase.raw;
      // Fall back to subcategory label or category label
      for (const themes of Object.values(dimensionThemes)) {
        const theme = themes.find(t => t.category === c);
        if (theme) return theme.label;
      }
      return c;
    });
    confidence = Math.min(0.5 + centralCategories.length * 0.15, 1);
  } else {
    const strongest = [...intersections].sort((a, b) => b.strength - a.strength)[0];
    centralThemes = strongest?.themes.slice(0, 2) || ['Personal Growth'];
    confidence = 0.4;
  }

  // Step 6: Generate Ikigai statement using user phrases
  const statement = generateIkigaiStatement(centralThemes, dimensionThemes);

  // Step 7: Career paths (subcategory-aware)
  const careerPaths = findMatchingCareers(allCategories, allSubcategories, dimensionThemes, allPhrases);

  // Step 8: Recommendations (personalized with phrases)
  const recommendations = generateRecommendations(allCategories, allSubcategories, dimensionThemes, allPhrases);

  // Step 9: Strengths (with evidence)
  const strengths = buildStrengthsProfile(dimensionThemes, allPhrases);

  // Step 10: Growth areas (personalized)
  const growthAreas = identifyGrowthAreas(dimensionThemes, allPhrases);

  // Step 11: Summary (using actual phrases)
  const summary = generateSummary(dimensionThemes, intersections, centralThemes);

  return {
    dimensions: dimensionThemes,
    intersections,
    centralIkigai: { statement, themes: centralThemes, confidence },
    recommendations,
    careerPaths,
    strengths,
    growthAreas,
    summary,
  };
}

function generateIkigaiStatement(centralThemes: string[], dimensionThemes: Record<Dimension, Theme[]>): string {
  const template = ikigaiStatementTemplates[Math.floor(Math.random() * ikigaiStatementTemplates.length)];

  // Use user phrases instead of generic category labels
  const lovePhrase = getTopPhraseForDimension(dimensionThemes.love) || 'what inspires you';
  const goodAtPhrase = getTopPhraseForDimension(dimensionThemes.goodAt) || 'your natural talents';
  const worldNeedsPhrase = getTopPhraseForDimension(dimensionThemes.worldNeeds) || 'making a difference';
  const paidForPhrase = getTopPhraseForDimension(dimensionThemes.paidFor) || 'creating value';

  return template
    .replace('{theme1}', centralThemes[0] || 'your unique purpose')
    .replace('{love}', lovePhrase)
    .replace('{goodAt}', goodAtPhrase)
    .replace('{worldNeeds}', worldNeedsPhrase)
    .replace('{paidFor}', paidForPhrase);
}

function identifyGrowthAreas(dimensionThemes: Record<Dimension, Theme[]>, allPhrases: UserPhrase[]) {
  const dimLabels: Record<Dimension, string> = {
    love: 'Passion Discovery',
    goodAt: 'Skill Development',
    worldNeeds: 'Purpose Clarity',
    paidFor: 'Market Positioning',
  };

  // Build personalized suggestions that reference what the user DID say in other dimensions
  const dims: Dimension[] = ['love', 'goodAt', 'worldNeeds', 'paidFor'];

  return dims
    .filter(d => {
      const themes = dimensionThemes[d];
      return themes.length <= 1 || themes[0].confidence < 0.3;
    })
    .map(d => {
      // Find strong phrases from other dimensions to suggest connections
      const otherDims = dims.filter(od => od !== d);
      const strongPhrases = otherDims
        .flatMap(od => dimensionThemes[od])
        .flatMap(t => t.userPhrases)
        .filter(p => p.raw.includes(' '))
        .slice(0, 2);

      let suggestion: string;
      if (strongPhrases.length > 0) {
        const phraseStr = strongPhrases.map(p => p.raw).join(' and ');
        const suggestions: Record<Dimension, string> = {
          love: `You mentioned ${phraseStr} in other areas. Try exploring how these connect to what truly excites you — your deepest passions may be related.`,
          goodAt: `You\'re passionate about ${phraseStr}. Consider developing practical skills in these areas through courses, practice, or mentorship.`,
          worldNeeds: `Think about how ${phraseStr} could address real problems in the world. Your skills and passions can create meaningful impact.`,
          paidFor: `You have strong interests in ${phraseStr}. Research how people in these fields earn a living — your unique combination could be valuable.`,
        };
        suggestion = suggestions[d];
      } else {
        const defaults: Record<Dimension, string> = {
          love: 'Spend more time experimenting with new activities. Your deepest passions may still be waiting to be discovered.',
          goodAt: 'Invest in deliberate practice and skill-building. Courses, mentors, and challenging projects stretch your abilities.',
          worldNeeds: 'Explore volunteer opportunities and engage with different communities to clarify which causes resonate most.',
          paidFor: 'Research market trends and identify gaps where your skills could create value. Networking reveals unexpected opportunities.',
        };
        suggestion = defaults[d];
      }

      return {
        area: dimLabels[d],
        suggestion,
        relatedDimension: d,
      };
    });
}

function generateSummary(
  dimensionThemes: Record<Dimension, Theme[]>,
  intersections: IntersectionResult[],
  centralThemes: string[]
): string {
  // Use user phrases for a personalized summary
  const love = getTopPhraseForDimension(dimensionThemes.love) || dimensionThemes.love[0]?.label || 'creative pursuits';
  const goodAt = getTopPhraseForDimension(dimensionThemes.goodAt) || dimensionThemes.goodAt[0]?.label || 'problem-solving';
  const worldNeeds = getTopPhraseForDimension(dimensionThemes.worldNeeds) || dimensionThemes.worldNeeds[0]?.label || 'making a positive impact';
  const paidFor = getTopPhraseForDimension(dimensionThemes.paidFor) || dimensionThemes.paidFor[0]?.label || 'professional expertise';

  const strongestIntersection = [...intersections].sort((a, b) => b.strength - a.strength)[0];

  return `Based on our conversation, a clear picture of your Ikigai has emerged. Your heart is drawn to ${love}, and you possess genuine talent in ${goodAt}. You feel called to address the world's need for ${worldNeeds}, and you can create sustainable value through ${paidFor}.\n\nYour strongest alignment is in your ${strongestIntersection?.type || 'passion'} — ${strongestIntersection?.description.split('.')[0] || 'where multiple dimensions of your purpose converge'}. ${centralThemes.length > 0 ? `At the center of it all, ${centralThemes[0]} represents your core Ikigai — the thread that weaves through every dimension of your purpose.` : 'Your journey to discovering your central Ikigai is beautifully underway.'}`;
}
