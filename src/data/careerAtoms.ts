/**
 * Career atoms for compositional career generation.
 * When no exact subcategory-pair match exists in the static table,
 * we compose careers from field + role combinations.
 */

export interface FieldAtom {
  id: string;
  subcategories: string[];  // Which subcategories trigger this field
  titles: string[];         // Possible role titles for this field
  descriptionBases: string[];
}

export interface RoleModifier {
  id: string;
  subcategories: string[];
  titleSuffix: string[];    // e.g., "Educator", "Consultant", "Specialist"
  descriptionSuffix: string[];
}

export const fieldAtoms: FieldAtom[] = [
  {
    id: 'writing',
    subcategories: ['creative_writing', 'fiction_writing', 'nonfiction_writing', 'screenwriting', 'content_marketing', 'technical_writing'],
    titles: ['Writer', 'Author', 'Content Creator', 'Editor', 'Storyteller'],
    descriptionBases: ['Craft compelling written content', 'Tell stories through the written word', 'Create meaningful written works'],
  },
  {
    id: 'visual_arts',
    subcategories: ['visual_art', 'photography_art', 'digital_art', 'graphic_design'],
    titles: ['Artist', 'Designer', 'Creative', 'Illustrator', 'Visual Storyteller'],
    descriptionBases: ['Create visual works that inspire', 'Express ideas through visual media', 'Design compelling visual experiences'],
  },
  {
    id: 'music',
    subcategories: ['music_creation', 'music_performance'],
    titles: ['Musician', 'Composer', 'Music Producer', 'Sound Designer'],
    descriptionBases: ['Create music that moves people', 'Compose and produce original music', 'Shape sonic experiences'],
  },
  {
    id: 'tech',
    subcategories: ['web_development', 'mobile_development', 'software_engineering', 'ai_ml', 'devops_infra', 'cybersecurity'],
    titles: ['Developer', 'Engineer', 'Architect', 'Tech Lead'],
    descriptionBases: ['Build technology solutions', 'Engineer innovative software', 'Create technical systems'],
  },
  {
    id: 'education',
    subcategories: ['children_education', 'adult_training', 'online_teaching', 'academic_teaching', 'k12_education', 'higher_education', 'edtech', 'special_education', 'mentoring_coaching'],
    titles: ['Educator', 'Teacher', 'Instructor', 'Trainer', 'Learning Designer'],
    descriptionBases: ['Help others learn and grow', 'Design transformative learning experiences', 'Share knowledge that empowers'],
  },
  {
    id: 'health',
    subcategories: ['medical_practice', 'mental_health', 'wellness_fitness', 'public_health', 'fitness_training'],
    titles: ['Health Professional', 'Wellness Practitioner', 'Health Advocate'],
    descriptionBases: ['Improve health and wellbeing', 'Support physical and mental wellness', 'Promote healthier lives'],
  },
  {
    id: 'business',
    subcategories: ['marketing_sales', 'consulting', 'ecommerce', 'startup_culture', 'corporate_finance'],
    titles: ['Strategist', 'Consultant', 'Entrepreneur', 'Business Leader'],
    descriptionBases: ['Drive business growth and strategy', 'Create sustainable business ventures', 'Solve complex business challenges'],
  },
  {
    id: 'nature',
    subcategories: ['conservation', 'sustainability', 'farming_gardening', 'outdoor_adventure'],
    titles: ['Environmentalist', 'Conservationist', 'Sustainability Expert'],
    descriptionBases: ['Protect and preserve the natural world', 'Champion environmental sustainability', 'Connect people with nature'],
  },
  {
    id: 'social_impact',
    subcategories: ['social_work', 'volunteering', 'community_building', 'caregiving', 'human_rights', 'equality_dei', 'activism', 'policy_law'],
    titles: ['Advocate', 'Community Leader', 'Social Impact Professional'],
    descriptionBases: ['Create positive social change', 'Serve communities and uplift others', 'Champion justice and equity'],
  },
  {
    id: 'data',
    subcategories: ['data_science', 'business_intelligence', 'data_engineering', 'analytics_research'],
    titles: ['Data Professional', 'Analyst', 'Data Scientist', 'Research Analyst'],
    descriptionBases: ['Extract insights from data', 'Drive decisions through analytics', 'Uncover patterns that matter'],
  },
  {
    id: 'performance',
    subcategories: ['theater_acting', 'dance', 'comedy', 'music_performance', 'public_speaking'],
    titles: ['Performer', 'Artist', 'Entertainer', 'Speaker'],
    descriptionBases: ['Captivate audiences through performance', 'Express and entertain through live art', 'Connect with people through performance'],
  },
  {
    id: 'food',
    subcategories: ['cooking_chef', 'baking_pastry', 'food_entrepreneurship', 'nutrition_health'],
    titles: ['Culinary Professional', 'Food Creator', 'Chef', 'Nutritionist'],
    descriptionBases: ['Create nourishing food experiences', 'Innovate in the culinary world', 'Share the joy of food'],
  },
  {
    id: 'psychology',
    subcategories: ['clinical_psychology', 'behavioral_science', 'emotional_intelligence', 'relationships'],
    titles: ['Psychology Professional', 'Behavioral Expert', 'Counselor'],
    descriptionBases: ['Understand and support the human mind', 'Apply psychological insights', 'Help people thrive mentally'],
  },
  {
    id: 'crafts',
    subcategories: ['woodworking', 'textile_fiber', 'pottery_ceramics', 'jewelry_metalwork'],
    titles: ['Artisan', 'Craftsperson', 'Maker', 'Designer-Maker'],
    descriptionBases: ['Create beautiful handcrafted objects', 'Bring ideas to life through skilled hands', 'Craft unique physical works'],
  },
];

/**
 * Compose a career title from two fields + user context
 */
export function composeCareerTitle(field1: FieldAtom, field2: FieldAtom): string[] {
  const titles: string[] = [];

  // Combine primary field title with secondary field context
  for (const t1 of field1.titles.slice(0, 2)) {
    for (const t2 of field2.titles.slice(0, 1)) {
      titles.push(`${t1} & ${t2}`);
    }
  }

  // Also generate "Field1 for Field2" style
  if (field1.titles[0] && field2.id) {
    const contextMap: Record<string, string> = {
      education: 'for Education',
      health: 'in Healthcare',
      business: 'for Business',
      tech: 'in Tech',
      nature: 'for the Environment',
      social_impact: 'for Social Good',
      food: 'in Food & Culinary',
      performance: 'in Entertainment',
      data: 'with Data',
      psychology: 'in Psychology',
    };
    const ctx = contextMap[field2.id];
    if (ctx) {
      titles.push(`${field1.titles[0]} ${ctx}`);
    }
  }

  return titles.slice(0, 3);
}

/**
 * Find the matching field atom for a given subcategory
 */
export function findFieldForSubcategory(subcategory: string): FieldAtom | undefined {
  return fieldAtoms.find(f => f.subcategories.includes(subcategory));
}
