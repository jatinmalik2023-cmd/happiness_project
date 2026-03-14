import { keywordDictionary, ngramPhrases } from '../data/keywords';
import { processText, extractBigrams } from '../utils/textProcessing';

export interface AnalysisResult {
  categories: Record<string, number>;
  rawKeywords: string[];
}

export function analyzeResponse(text: string): AnalysisResult {
  const tokens = processText(text);
  const bigrams = extractBigrams(text);
  const categories: Record<string, number> = {};
  const rawKeywords: string[] = [];

  // Layer 1: Dictionary matching
  for (const token of tokens) {
    for (const [category, keywords] of Object.entries(keywordDictionary)) {
      for (const kw of keywords) {
        if (token.includes(kw) || kw.includes(token)) {
          categories[category] = (categories[category] || 0) + 1;
          if (!rawKeywords.includes(kw)) rawKeywords.push(kw);
          break;
        }
      }
    }
  }

  // Layer 2: N-gram phrase detection
  for (const bigram of bigrams) {
    for (const [phrase, category] of Object.entries(ngramPhrases)) {
      if (bigram.includes(phrase) || phrase.includes(bigram)) {
        categories[category] = (categories[category] || 0) + 2; // phrases worth more
        if (!rawKeywords.includes(phrase)) rawKeywords.push(phrase);
      }
    }
  }

  return { categories, rawKeywords };
}

export function containsKeywords(text: string, keywords: string[]): boolean {
  const lower = text.toLowerCase();
  return keywords.some(kw => lower.includes(kw));
}
