export const synonymGroups: Record<string, string[]> = {
  teaching: ['teach', 'educate', 'mentor', 'tutor', 'instruct', 'coach', 'train', 'guide', 'facilitate'],
  writing: ['write', 'author', 'blog', 'journal', 'storytell', 'content', 'copy', 'edit', 'publish'],
  creating: ['create', 'make', 'build', 'design', 'craft', 'construct', 'develop', 'produce', 'invent'],
  helping: ['help', 'assist', 'support', 'aid', 'serve', 'volunteer', 'counsel', 'advise', 'care'],
  leading: ['lead', 'manage', 'direct', 'organize', 'supervise', 'coordinate', 'oversee', 'govern', 'steer'],
  analyzing: ['analyze', 'research', 'investigate', 'study', 'examine', 'evaluate', 'assess', 'diagnose'],
  communicating: ['communicate', 'speak', 'present', 'negotiate', 'persuade', 'articulate', 'express', 'convey'],
  healing: ['heal', 'cure', 'treat', 'therapy', 'rehabilitate', 'restore', 'nurture', 'mend'],
  innovating: ['innovate', 'invent', 'pioneer', 'disrupt', 'revolutionize', 'transform', 'modernize'],
  performing: ['perform', 'act', 'sing', 'dance', 'play', 'entertain', 'showcase', 'demonstrate'],
  cooking: ['cook', 'bake', 'chef', 'culinary', 'recipe', 'cuisine', 'gastronomy', 'gourmet'],
  exploring: ['explore', 'travel', 'discover', 'adventure', 'wander', 'journey', 'trek', 'roam'],
  solving: ['solve', 'fix', 'resolve', 'troubleshoot', 'debug', 'repair', 'remedy', 'address'],
  designing: ['design', 'prototype', 'wireframe', 'layout', 'sketch', 'blueprint', 'architect', 'model'],
  nurturing: ['nurture', 'parent', 'raise', 'foster', 'cultivate', 'grow', 'develop', 'nourish'],
};

export function findSynonymGroup(word: string): string | null {
  const lower = word.toLowerCase();
  for (const [group, words] of Object.entries(synonymGroups)) {
    if (words.some(w => lower.includes(w) || w.includes(lower))) {
      return group;
    }
  }
  return null;
}
