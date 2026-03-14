import { Dimension } from '../types/chat';
import { Theme, Strength, UserPhrase } from '../types/analysis';

export function buildStrengthsProfile(
  dimensionThemes: Record<Dimension, Theme[]>,
  allPhrases: UserPhrase[]
): Strength[] {
  const strengthMap: Record<string, { score: number; sources: Set<string>; phrases: string[] }> = {};

  for (const [dim, themes] of Object.entries(dimensionThemes)) {
    for (const theme of themes) {
      const key = theme.subcategory !== 'general' ? theme.subcategory : theme.category;
      if (!strengthMap[key]) {
        strengthMap[key] = { score: 0, sources: new Set(), phrases: [] };
      }
      strengthMap[key].score += theme.confidence;
      strengthMap[key].sources.add(dim);

      // Collect user phrases as evidence
      for (const up of theme.userPhrases) {
        if (up.raw.includes(' ') && strengthMap[key].phrases.length < 3) {
          if (!strengthMap[key].phrases.includes(up.raw)) {
            strengthMap[key].phrases.push(up.raw);
          }
        }
      }
    }
  }

  // Also check for single-word phrases if no multi-word found
  for (const [key, data] of Object.entries(strengthMap)) {
    if (data.phrases.length === 0) {
      const related = allPhrases.filter(p => p.category === key || p.subcategory === key).slice(0, 2);
      for (const p of related) {
        data.phrases.push(p.raw);
      }
    }
  }

  const baseDescriptions: Record<string, string> = {
    creativity: 'You have a natural ability to think creatively and bring imaginative ideas to life.',
    technology: 'You excel at understanding and leveraging technology to solve complex problems.',
    teaching: 'You have a gift for making complex ideas accessible and empowering others to learn.',
    healthcare: 'Your empathetic nature and care for wellbeing make you a natural healer.',
    leadership: 'You possess the vision and charisma to guide teams toward their goals.',
    nature: 'Your deep connection with the natural world gives you unique perspective.',
    communication: 'You articulate ideas powerfully, connecting with people through words and stories.',
    helping: 'Your compassion and desire to serve others is a rare and beautiful strength.',
    science: 'Your analytical mind and curiosity drive you to understand the world deeply.',
    business: 'You have sharp instincts for value creation and market dynamics.',
    arts_performance: 'Your expressive abilities captivate and move audiences.',
    sports_fitness: 'Your dedication to physical excellence inspires discipline and resilience.',
    food_culinary: 'Your culinary creativity brings joy and nourishment.',
    psychology: 'Your understanding of the human mind gives you remarkable empathy and insight.',
    design: 'You see beauty and function in everything, creating experiences that delight.',
    writing_content: 'Your words have the power to inform, inspire, and transform.',
    travel: 'Your worldly perspective bridges cultures and broadens horizons.',
    social_justice: 'Your passion for fairness and equity drives meaningful change.',
    finance: 'Your financial acumen creates stability and enables growth.',
    education: 'Your dedication to learning elevates everyone around you.',
    craftsmanship: 'Your skilled hands and attention to detail create lasting, beautiful work.',
    gaming: 'Your understanding of interactive systems creates immersive experiences.',
    parenting: 'Your nurturing nature creates safe spaces for growth.',
    spirituality: 'Your spiritual depth provides wisdom and grounding.',
    data_analytics: 'Your ability to find patterns in data unlocks insights others miss.',
    // Subcategory-specific descriptions
    creative_writing: 'You have a gift for crafting stories and expressing ideas through the written word.',
    fiction_writing: 'Your imagination brings fictional worlds to life in vivid, compelling ways.',
    visual_art: 'Your artistic eye creates visual works that move and inspire.',
    music_creation: 'You have an innate ability to create and shape music that resonates.',
    web_development: 'You build powerful web experiences that connect people with technology.',
    software_engineering: 'Your coding skills solve real problems with elegant, efficient solutions.',
    ai_ml: 'You push the boundaries of what machines can learn and accomplish.',
    children_education: 'You have a special ability to connect with and inspire young learners.',
    online_teaching: 'You make knowledge accessible to anyone, anywhere through digital teaching.',
    mentoring_coaching: 'You guide others toward their potential with patience and insight.',
    mental_health: 'Your sensitivity to mental wellbeing helps others heal and thrive.',
    wellness_fitness: 'You inspire physical and mental wellness in yourself and others.',
    conservation: 'Your passion for conservation protects the natural world for future generations.',
    sustainability: 'You champion sustainable practices that benefit both people and planet.',
    entrepreneurship: 'Your entrepreneurial spirit turns ideas into reality.',
    data_science: 'You extract meaningful stories and predictions from raw data.',
    ux_design: 'You create human-centered designs that are both beautiful and functional.',
    game_development: 'You build interactive experiences that engage and delight players.',
  };

  return Object.entries(strengthMap)
    .sort(([, a], [, b]) => b.score - a.score)
    .slice(0, 6)
    .map(([key, data]) => {
      const baseName = key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      const baseDesc = baseDescriptions[key] || baseDescriptions[key.split('_')[0]] || 'A unique strength that sets you apart.';

      // Personalize description with user evidence
      let description = baseDesc;
      if (data.phrases.length > 0) {
        const evidenceStr = data.phrases.slice(0, 2).join(' and ');
        description += ` You demonstrated this through ${evidenceStr}.`;
      }

      return {
        name: baseName,
        score: Math.min(Math.round((data.score / 2) * 100), 100),
        description,
        evidence: data.phrases,
      };
    });
}
