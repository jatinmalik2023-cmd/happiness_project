import { Dimension } from '../types/chat';
import { Theme, IntersectionResult, IntersectionType, UserPhrase } from '../types/analysis';
import { intersectionDescriptions, intersectionTemplates } from '../data/ikigaiDescriptions';
import { getTopPhraseForDimension } from './themeExtractor';

const intersectionDefinitions: { type: IntersectionType; dims: [Dimension, Dimension] }[] = [
  { type: 'passion', dims: ['love', 'goodAt'] },
  { type: 'mission', dims: ['love', 'worldNeeds'] },
  { type: 'vocation', dims: ['worldNeeds', 'paidFor'] },
  { type: 'profession', dims: ['goodAt', 'paidFor'] },
];

export function computeIntersections(
  dimensionThemes: Record<Dimension, Theme[]>,
  dimensionPhrases?: Record<Dimension, UserPhrase[]>
): IntersectionResult[] {
  return intersectionDefinitions.map(({ type, dims }) => {
    const [dim1, dim2] = dims;
    const themes1 = dimensionThemes[dim1] || [];
    const themes2 = dimensionThemes[dim2] || [];

    // Find overlapping categories
    const categories1 = new Set(themes1.map(t => t.category));
    const categories2 = new Set(themes2.map(t => t.category));
    const overlapping = [...categories1].filter(c => categories2.has(c));

    // Find overlapping subcategories (more specific)
    const subcats1 = new Set(themes1.map(t => t.subcategory).filter(s => s !== 'general'));
    const subcats2 = new Set(themes2.map(t => t.subcategory).filter(s => s !== 'general'));
    const overlappingSubcats = [...subcats1].filter(s => subcats2.has(s));

    // Find shared keywords
    const keywords1 = new Set(themes1.flatMap(t => t.keywords));
    const keywords2 = new Set(themes2.flatMap(t => t.keywords));
    const sharedKeywords = [...keywords1].filter(k => keywords2.has(k));

    // Combine theme names
    const themeNames = [
      ...overlapping.map(c => {
        const theme = themes1.find(t => t.category === c) || themes2.find(t => t.category === c);
        return theme?.label || c;
      }),
      ...sharedKeywords.slice(0, 2),
    ];

    if (themeNames.length === 0 && themes1.length > 0 && themes2.length > 0) {
      themeNames.push(themes1[0].label, themes2[0].label);
    }

    // Calculate strength — subcategory overlap is stronger
    let strength: number;
    if (overlappingSubcats.length > 0) {
      strength = Math.min(0.4 + overlappingSubcats.length * 0.25 + sharedKeywords.length * 0.1, 1);
    } else if (overlapping.length > 0) {
      strength = Math.min(0.3 + overlapping.length * 0.2 + sharedKeywords.length * 0.1, 1);
    } else {
      strength = 0.2 + sharedKeywords.length * 0.1;
    }

    // Build dynamic description using user phrases
    const dim1Phrase = getTopPhraseForDimension(themes1);
    const dim2Phrase = getTopPhraseForDimension(themes2);
    const description = buildDynamicDescription(type, dim1Phrase, dim2Phrase);

    // Collect user evidence — actual quotes from both dimensions
    const userEvidence: string[] = [];
    const phrases1 = dimensionPhrases?.[dim1] || themes1.flatMap(t => t.userPhrases);
    const phrases2 = dimensionPhrases?.[dim2] || themes2.flatMap(t => t.userPhrases);

    // Pick the best multi-word phrases as evidence
    for (const p of phrases1) {
      if (p.raw.includes(' ') && userEvidence.length < 2) {
        userEvidence.push(p.raw);
      }
    }
    for (const p of phrases2) {
      if (p.raw.includes(' ') && userEvidence.length < 4) {
        userEvidence.push(p.raw);
      }
    }
    // Fill with single-word phrases if needed
    if (userEvidence.length === 0) {
      for (const p of [...phrases1, ...phrases2].slice(0, 3)) {
        userEvidence.push(p.raw);
      }
    }

    return {
      type,
      dimensions: dims,
      themes: themeNames.slice(0, 4),
      description,
      userEvidence: [...new Set(userEvidence)].slice(0, 4),
      strength: Math.min(strength, 1),
    };
  });
}

function buildDynamicDescription(
  type: IntersectionType,
  dim1Phrase: string,
  dim2Phrase: string
): string {
  // If we have meaningful phrases, use dynamic templates
  if (dim1Phrase && dim2Phrase && dim1Phrase !== dim2Phrase) {
    const templates = intersectionTemplates[type];
    const template = templates[Math.floor(Math.random() * templates.length)];
    return template
      .replace('{dim1Phrase}', dim1Phrase)
      .replace('{dim2Phrase}', dim2Phrase);
  }

  // Fall back to static description
  return intersectionDescriptions[type].description;
}
