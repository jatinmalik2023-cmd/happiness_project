const stopWords = new Set([
  'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours',
  'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself',
  'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which',
  'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be',
  'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an',
  'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by',
  'for', 'with', 'about', 'against', 'between', 'through', 'during', 'before', 'after',
  'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under',
  'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all',
  'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only',
  'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should',
  'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', 'couldn', 'didn', 'doesn',
  'hadn', 'hasn', 'haven', 'isn', 'ma', 'mightn', 'mustn', 'needn', 'shan', 'shouldn',
  'wasn', 'weren', 'won', 'wouldn', 'also', 'really', 'like', 'would', 'could', 'much',
  'think', 'know', 'get', 'got', 'thing', 'things', 'lot', 'always', 'want', 'feel',
  'maybe', 'something', 'kind', 'way', 'make', 'go', 'going', 'one', 'two', 'well',
]);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !stopWords.has(w));
}

export function simpleStem(word: string): string {
  if (word.endsWith('tion') || word.endsWith('sion')) return word.slice(0, -3);
  if (word.endsWith('ment')) return word.slice(0, -4);
  if (word.endsWith('ness')) return word.slice(0, -4);
  if (word.endsWith('able') || word.endsWith('ible')) return word.slice(0, -4);
  if (word.endsWith('ing') && word.length > 5) return word.slice(0, -3);
  if (word.endsWith('ies')) return word.slice(0, -3) + 'y';
  if (word.endsWith('ed') && word.length > 4) return word.slice(0, -2);
  if (word.endsWith('ly') && word.length > 4) return word.slice(0, -2);
  if (word.endsWith('er') && word.length > 4) return word.slice(0, -2);
  if (word.endsWith('est') && word.length > 5) return word.slice(0, -3);
  if (word.endsWith('s') && !word.endsWith('ss') && word.length > 3) return word.slice(0, -1);
  return word;
}

export function processText(input: string): string[] {
  const tokens = tokenize(input);
  return tokens.map(simpleStem);
}

export function extractBigrams(text: string): string[] {
  const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 1);
  const bigrams: string[] = [];
  for (let i = 0; i < words.length - 1; i++) {
    bigrams.push(`${words[i]} ${words[i + 1]}`);
  }
  return bigrams;
}

export function isShortResponse(text: string): boolean {
  const words = text.trim().split(/\s+/);
  return words.length < 5;
}

/**
 * Extract meaningful key phrases from user text.
 * Splits on sentence/comma/conjunction boundaries, then extracts
 * noun-phrase-like chunks (sequences of content words between stop words).
 * Returns 2-6 word phrases that preserve the user's actual language.
 */
export function extractKeyPhrases(text: string): string[] {
  // Split into clauses on sentence boundaries, commas, and conjunctions
  const clauses = text
    .replace(/[.!?;]/g, ',')
    .split(',')
    .map(c => c.trim())
    .filter(c => c.length > 3);

  const phrases: string[] = [];

  for (const clause of clauses) {
    const words = clause.toLowerCase().replace(/[^a-z0-9\s'-]/g, ' ').split(/\s+/).filter(w => w.length > 1);

    // Build phrases by collecting runs of content words
    let currentPhrase: string[] = [];
    for (const word of words) {
      if (stopWords.has(word) || word.length <= 2) {
        if (currentPhrase.length >= 2 && currentPhrase.length <= 6) {
          phrases.push(currentPhrase.join(' '));
        }
        currentPhrase = [];
      } else {
        currentPhrase.push(word);
      }
    }
    // Don't forget the last run
    if (currentPhrase.length >= 2 && currentPhrase.length <= 6) {
      phrases.push(currentPhrase.join(' '));
    }

    // Also keep single significant words (nouns/verbs not in common words)
    const commonWords = new Set(['people', 'time', 'work', 'day', 'life', 'years', 'different', 'important', 'new', 'big', 'long', 'great', 'good', 'bad', 'best', 'first', 'last']);
    for (const word of words) {
      if (!stopWords.has(word) && !commonWords.has(word) && word.length > 3) {
        // Single words that are specific enough (check they're not already in a phrase)
        if (!phrases.some(p => p.includes(word))) {
          phrases.push(word);
        }
      }
    }
  }

  // Deduplicate and return
  return [...new Set(phrases)];
}

/**
 * Extract trigrams from text (3-word sequences).
 */
export function extractTrigrams(text: string): string[] {
  const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 1);
  const trigrams: string[] = [];
  for (let i = 0; i < words.length - 2; i++) {
    trigrams.push(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
  }
  return trigrams;
}
