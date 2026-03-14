import { Dimension } from '../types/chat';
import { Recommendation, Theme, UserPhrase } from '../types/analysis';
import { recommendationTemplates } from '../data/recommendationTemplates';
import { getTopPhraseForDimension } from './themeExtractor';

export function generateRecommendations(
  allThemes: string[],
  allSubcats: string[],
  dimensionThemes: Record<Dimension, Theme[]>,
  allPhrases: UserPhrase[]
): Recommendation[] {
  const topPhrase1 = getTopPhraseForDimension(dimensionThemes.love) || getTopPhraseForDimension(dimensionThemes.goodAt) || 'your passion';
  const topPhrase2 = getTopPhraseForDimension(dimensionThemes.goodAt) || getTopPhraseForDimension(dimensionThemes.paidFor) || 'your skills';

  const phraseMap = buildPhraseMap(allPhrases, dimensionThemes);

  const matching = recommendationTemplates
    .filter(template => template.condition(allThemes, allSubcats))
    .map(template => ({
      title: fillTemplate(template.titleTemplate, phraseMap, topPhrase1, topPhrase2),
      description: fillTemplate(template.descriptionTemplate, phraseMap, topPhrase1, topPhrase2),
      priority: template.priority,
      category: template.category,
      specificActions: template.specificActionTemplates.map(a => fillTemplate(a, phraseMap, topPhrase1, topPhrase2)),
    } as Recommendation));

  if (matching.length < 5) {
    matching.push(
      { title: 'Create a vision board for your Ikigai', description: 'Visualize your Ikigai by combining images from all four dimensions.', priority: 'low', category: 'Visualization', specificActions: ['Collect images of your passions and goals', 'Arrange on a physical or digital board', 'Review weekly'] },
      { title: 'Have meaningful conversations about your purpose', description: 'Share insights with trusted friends and family for new perspective.', priority: 'low', category: 'Relationships', specificActions: ['Share this report with someone you trust', 'Ask what they see as your strengths', 'Discuss how your passions could create impact'] },
    );
  }

  const priorityOrder = { high: 0, medium: 1, low: 2 };
  matching.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  return matching.slice(0, 8);
}

function buildPhraseMap(allPhrases: UserPhrase[], dimensionThemes: Record<Dimension, Theme[]>) {
  const find = (cats: string[], subcats: string[]): string => {
    for (const p of allPhrases) {
      if ((cats.includes(p.category) || subcats.includes(p.subcategory)) && p.raw.includes(' ')) return p.raw;
    }
    for (const p of allPhrases) {
      if (cats.includes(p.category) || subcats.includes(p.subcategory)) return p.raw;
    }
    for (const themes of Object.values(dimensionThemes)) {
      for (const t of themes) {
        if (cats.includes(t.category) || subcats.includes(t.subcategory)) return t.label.toLowerCase();
      }
    }
    return 'your interests';
  };

  return {
    userWritingPhrase: find(['writing_content', 'creativity'], ['creative_writing', 'fiction_writing', 'nonfiction_writing', 'screenwriting', 'content_marketing']),
    userTechPhrase: find(['technology'], ['web_development', 'mobile_development', 'software_engineering', 'ai_ml', 'devops_infra', 'cybersecurity']),
    userTeachPhrase: find(['teaching', 'education'], ['children_education', 'online_teaching', 'mentoring_coaching', 'adult_training', 'academic_teaching']),
    userHelpPhrase: find(['helping', 'social_justice'], ['social_work', 'volunteering', 'community_building', 'caregiving', 'activism']),
    userNaturePhrase: find(['nature'], ['conservation', 'sustainability', 'farming_gardening', 'outdoor_adventure']),
    userArtPhrase: find(['arts_performance', 'creativity'], ['theater_acting', 'dance', 'comedy', 'music_performance', 'visual_art', 'music_creation']),
    userBizPhrase: find(['business', 'leadership'], ['entrepreneurship', 'startup_culture', 'ecommerce', 'marketing_sales', 'consulting']),
    userDataPhrase: find(['data_analytics'], ['data_science', 'business_intelligence', 'data_engineering', 'analytics_research']),
    userHealthPhrase: find(['healthcare'], ['medical_practice', 'mental_health', 'wellness_fitness', 'public_health']),
    userSpiritPhrase: find(['spirituality'], ['meditation_mindfulness', 'philosophy', 'religious_spiritual']),
    userDesignPhrase: find(['design'], ['ux_design', 'ui_visual', 'product_design', 'graphic_design']),
  };
}

function fillTemplate(template: string, pm: Record<string, string>, p1: string, p2: string): string {
  let result = template.replace(/\{topPhrase1\}/g, p1).replace(/\{topPhrase2\}/g, p2);
  for (const [key, val] of Object.entries(pm)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), val);
  }
  return result;
}
