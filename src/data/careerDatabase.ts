import { Dimension } from '../types/chat';
import { Theme, CareerPath, UserPhrase } from '../types/analysis';
import { findFieldForSubcategory, composeCareerTitle } from './careerAtoms';

export interface CareerMapping {
  themes: string[];
  careers: { title: string; description: string }[];
}

/**
 * Expanded career mappings — subcategory-level and broad-category fallback.
 */
export const careerMappings: CareerMapping[] = [
  // ── WRITING combinations ──
  { themes: ['creative_writing', 'children_education'], careers: [
    { title: "Children's Book Author", description: 'Write captivating stories that spark young imaginations' },
    { title: 'Youth Creative Writing Instructor', description: 'Teach young people to express themselves through storytelling' },
    { title: 'Educational Content Writer', description: 'Create engaging written learning materials for children' },
  ]},
  { themes: ['fiction_writing', 'children_education'], careers: [
    { title: "Children's Fiction Author", description: 'Create enchanting fictional worlds for young readers' },
    { title: 'Youth Literacy Program Director', description: 'Lead programs that foster a love of reading in children' },
    { title: 'Story-Based Curriculum Designer', description: 'Design learning experiences built around narrative and fiction' },
  ]},
  { themes: ['creative_writing', 'online_teaching'], careers: [
    { title: 'Online Writing Course Creator', description: 'Build and teach creative writing courses for aspiring authors' },
    { title: 'Writing Workshop Facilitator', description: 'Guide writers through the craft of storytelling online' },
    { title: 'Literary Content Entrepreneur', description: 'Create a writing-focused educational platform' },
  ]},
  { themes: ['fiction_writing', 'film_video'], careers: [
    { title: 'Screenwriter', description: 'Adapt stories into compelling film and television scripts' },
    { title: 'Narrative Designer', description: 'Craft story arcs and character development for visual media' },
    { title: 'Story Producer', description: 'Develop fictional content for film, TV, and streaming platforms' },
  ]},
  { themes: ['creative_writing', 'mental_health'], careers: [
    { title: 'Writing Therapist', description: 'Use creative writing as a therapeutic tool for healing' },
    { title: 'Mental Health Content Writer', description: 'Create accessible mental health content through storytelling' },
    { title: 'Therapeutic Journal Designer', description: 'Create guided journals for mental health and self-reflection' },
  ]},
  { themes: ['nonfiction_writing', 'journalism_media'], careers: [
    { title: 'Investigative Journalist', description: 'Uncover and report on stories that matter to society' },
    { title: 'Feature Writer', description: 'Craft in-depth long-form articles on important topics' },
    { title: 'Documentary Writer', description: 'Research and write compelling non-fiction narratives' },
  ]},
  { themes: ['content_marketing', 'web_development'], careers: [
    { title: 'Technical Content Strategist', description: 'Create content strategy for tech companies and products' },
    { title: 'Developer Relations Writer', description: 'Bridge technical knowledge and accessible content' },
    { title: 'SEO & Content Engineering Lead', description: 'Combine technical SEO with compelling content creation' },
  ]},
  { themes: ['technical_writing', 'software_engineering'], careers: [
    { title: 'Developer Documentation Engineer', description: 'Create exceptional developer documentation and API guides' },
    { title: 'Technical Writing Lead', description: 'Lead documentation strategy for software products' },
    { title: 'Developer Education Specialist', description: 'Create tutorials and learning paths for software engineers' },
  ]},

  // ── TECHNOLOGY combinations ──
  { themes: ['web_development', 'ux_design'], careers: [
    { title: 'Frontend UX Engineer', description: 'Build beautiful, user-centered web interfaces' },
    { title: 'Design Systems Developer', description: 'Create reusable component libraries bridging design and code' },
    { title: 'Full-Stack Product Developer', description: 'Build complete web products from design to deployment' },
  ]},
  { themes: ['ai_ml', 'medical_practice'], careers: [
    { title: 'Medical AI Researcher', description: 'Apply AI to revolutionize medical diagnosis and treatment' },
    { title: 'Health AI Engineer', description: 'Build machine learning systems for healthcare applications' },
    { title: 'Clinical AI Product Manager', description: 'Lead development of AI-powered medical tools' },
  ]},
  { themes: ['ai_ml', 'data_science'], careers: [
    { title: 'Machine Learning Engineer', description: 'Build and deploy production ML systems' },
    { title: 'AI Research Scientist', description: 'Push the boundaries of artificial intelligence research' },
    { title: 'Applied ML Lead', description: 'Lead teams applying machine learning to business challenges' },
  ]},
  { themes: ['software_engineering', 'mentoring_coaching'], careers: [
    { title: 'Engineering Manager', description: 'Lead and mentor engineering teams to build great software' },
    { title: 'Developer Advocate', description: 'Bridge engineering and education for tech communities' },
    { title: 'Tech Mentorship Program Director', description: 'Build programs that grow the next generation of engineers' },
  ]},
  { themes: ['mobile_development', 'wellness_fitness'], careers: [
    { title: 'Health & Fitness App Developer', description: 'Build mobile apps that improve physical and mental wellness' },
    { title: 'Digital Health Product Lead', description: 'Lead development of wellness-focused mobile products' },
    { title: 'Fitness Tech Entrepreneur', description: 'Create innovative mobile fitness solutions' },
  ]},
  { themes: ['web_development', 'ecommerce'], careers: [
    { title: 'E-Commerce Developer', description: 'Build online shopping experiences that drive sales' },
    { title: 'Shopify/Platform Specialist', description: 'Create custom e-commerce solutions for businesses' },
    { title: 'Digital Commerce Architect', description: 'Design scalable e-commerce platforms' },
  ]},

  // ── TEACHING combinations ──
  { themes: ['children_education', 'visual_art'], careers: [
    { title: "Children's Art Teacher", description: 'Inspire creativity and artistic expression in young learners' },
    { title: 'Art Education Program Director', description: 'Design visual arts curricula for schools' },
    { title: 'Creative Youth Workshop Leader', description: 'Lead hands-on art workshops that develop creativity' },
  ]},
  { themes: ['online_teaching', 'software_engineering'], careers: [
    { title: 'Coding Bootcamp Instructor', description: 'Teach aspiring developers through intensive programs' },
    { title: 'Technical Course Creator', description: 'Build comprehensive programming courses online' },
    { title: 'EdTech Platform Developer', description: 'Build technology that makes learning to code accessible' },
  ]},
  { themes: ['mentoring_coaching', 'entrepreneurship'], careers: [
    { title: 'Startup Coach', description: 'Guide entrepreneurs through building a business' },
    { title: 'Business Mentor', description: 'Provide strategic mentorship to founders and leaders' },
    { title: 'Accelerator Program Director', description: 'Lead startup accelerators that launch companies' },
  ]},
  { themes: ['academic_teaching', 'research_methods'], careers: [
    { title: 'University Professor', description: 'Teach and conduct cutting-edge research' },
    { title: 'Research Director', description: 'Lead research teams and shape the future of your field' },
    { title: 'Academic Program Director', description: 'Lead academic programs and shape educational direction' },
  ]},

  // ── HEALTHCARE combinations ──
  { themes: ['mental_health', 'online_teaching'], careers: [
    { title: 'Online Therapy Provider', description: 'Deliver mental health support through digital platforms' },
    { title: 'Mental Health Content Creator', description: 'Create educational content that destigmatizes mental health' },
    { title: 'Digital Wellness Coach', description: 'Provide wellness coaching and mental health support online' },
  ]},
  { themes: ['wellness_fitness', 'entrepreneurship'], careers: [
    { title: 'Wellness Brand Founder', description: 'Build a wellness brand that improves lives at scale' },
    { title: 'Health & Wellness Entrepreneur', description: 'Create products and services in the wellness industry' },
    { title: 'Wellness Retreat Owner', description: 'Design and run transformative retreat experiences' },
  ]},

  // ── NATURE combinations ──
  { themes: ['conservation', 'photography_art'], careers: [
    { title: 'Wildlife Photographer', description: 'Document the natural world through stunning photography' },
    { title: 'Conservation Visual Storyteller', description: 'Use photography to drive environmental awareness' },
    { title: 'Nature Documentary Photographer', description: 'Capture images for conservation documentaries' },
  ]},
  { themes: ['sustainability', 'consulting'], careers: [
    { title: 'Sustainability Consultant', description: 'Help organizations reduce their environmental impact' },
    { title: 'ESG Strategy Advisor', description: 'Guide companies in ESG strategy' },
    { title: 'Green Business Strategist', description: 'Help businesses transition to sustainable practices' },
  ]},
  { themes: ['farming_gardening', 'community_building'], careers: [
    { title: 'Community Garden Organizer', description: 'Build urban gardens that bring communities together' },
    { title: 'Urban Agriculture Director', description: 'Lead urban farming initiatives' },
    { title: 'Sustainable Agriculture Educator', description: 'Teach communities sustainable farming practices' },
  ]},
  { themes: ['outdoor_adventure', 'children_education'], careers: [
    { title: 'Outdoor Education Instructor', description: 'Teach children through nature and adventure' },
    { title: 'Wilderness Camp Director', description: 'Lead outdoor education programs for youth' },
    { title: 'Nature-Based Learning Specialist', description: 'Design curricula using the outdoors as a classroom' },
  ]},

  // ── BUSINESS combinations ──
  { themes: ['startup_culture', 'ai_ml'], careers: [
    { title: 'AI Startup Founder', description: 'Build innovative AI-powered companies' },
    { title: 'AI Product Manager', description: 'Lead product strategy for AI products' },
    { title: 'ML Startup Advisor', description: 'Guide AI startups from concept to market' },
  ]},
  { themes: ['marketing_sales', 'podcasting_video'], careers: [
    { title: 'Video Marketing Strategist', description: 'Drive brand growth through video and podcast content' },
    { title: 'Content Marketing Director', description: 'Lead content-driven marketing strategies' },
    { title: 'Brand Podcast Producer', description: 'Create branded podcast content' },
  ]},
  { themes: ['consulting', 'data_science'], careers: [
    { title: 'Data Strategy Consultant', description: 'Help organizations leverage data for decisions' },
    { title: 'Analytics Consulting Lead', description: 'Lead data analytics engagements' },
    { title: 'AI Strategy Advisor', description: 'Guide businesses in adopting AI strategies' },
  ]},

  // ── SOCIAL IMPACT combinations ──
  { themes: ['social_work', 'mental_health'], careers: [
    { title: 'Clinical Social Worker', description: 'Provide therapy and support to communities' },
    { title: 'Community Mental Health Counselor', description: 'Deliver mental health services in community settings' },
    { title: 'Crisis Intervention Specialist', description: 'Provide immediate support during crises' },
  ]},
  { themes: ['activism', 'journalism_media'], careers: [
    { title: 'Advocacy Journalist', description: 'Use investigative journalism to drive social change' },
    { title: 'Social Impact Media Director', description: 'Lead media campaigns for social justice' },
    { title: 'Nonprofit Communications Director', description: 'Shape messaging for social organizations' },
  ]},
  { themes: ['equality_dei', 'consulting'], careers: [
    { title: 'DEI Consultant', description: 'Help organizations build inclusive workplaces' },
    { title: 'Inclusion Strategy Director', description: 'Lead organizational DEI strategy' },
    { title: 'Equity & Belonging Advisor', description: 'Create cultures where everyone thrives' },
  ]},

  // ── PERFORMANCE combinations ──
  { themes: ['theater_acting', 'children_education'], careers: [
    { title: 'Drama Teacher', description: 'Teach children the art of theater and performance' },
    { title: "Children's Theater Director", description: 'Direct theatrical productions for young performers' },
    { title: 'Creative Drama Specialist', description: 'Use drama to enhance learning and confidence' },
  ]},
  { themes: ['music_creation', 'film_video'], careers: [
    { title: 'Film Composer', description: 'Create original music scores for film and television' },
    { title: 'Music Supervisor', description: 'Select and license music for visual media' },
    { title: 'Audio Director', description: 'Lead audio and music direction for media projects' },
  ]},

  // ── DATA combinations ──
  { themes: ['data_science', 'public_health'], careers: [
    { title: 'Health Data Scientist', description: 'Use data science to improve public health outcomes' },
    { title: 'Epidemiological Analyst', description: 'Analyze disease patterns and health data' },
    { title: 'Health Informatics Specialist', description: 'Build data systems that improve healthcare' },
  ]},
  { themes: ['analytics_research', 'marketing_sales'], careers: [
    { title: 'Marketing Analytics Lead', description: 'Drive marketing decisions through data' },
    { title: 'Consumer Insights Analyst', description: 'Uncover customer behavior patterns' },
    { title: 'Growth Data Scientist', description: 'Use data to identify growth opportunities' },
  ]},

  // ── FOOD combinations ──
  { themes: ['cooking_chef', 'content_marketing'], careers: [
    { title: 'Food Content Creator', description: 'Share recipes and culinary stories digitally' },
    { title: 'Recipe Developer', description: 'Create original recipes for publications and brands' },
    { title: 'Culinary Media Producer', description: 'Produce food-focused content for media' },
  ]},
  { themes: ['nutrition_health', 'mentoring_coaching'], careers: [
    { title: 'Nutrition Coach', description: 'Guide individuals toward healthier eating' },
    { title: 'Holistic Health Coach', description: 'Combine nutrition and wellness coaching' },
    { title: 'Corporate Wellness Nutritionist', description: 'Design nutrition programs for workplaces' },
  ]},
  { themes: ['baking_pastry', 'entrepreneurship'], careers: [
    { title: 'Bakery Owner', description: 'Build a bakery business that brings joy' },
    { title: 'Pastry Brand Founder', description: 'Create a pastry brand from scratch' },
    { title: 'Custom Cake Artist', description: 'Build a business creating custom cakes' },
  ]},

  // ── GAMING combinations ──
  { themes: ['game_development', 'creative_writing'], careers: [
    { title: 'Game Narrative Designer', description: 'Write stories, dialogue, and lore for video games' },
    { title: 'Interactive Fiction Developer', description: 'Create choice-driven stories and narrative games' },
    { title: 'Game Writer', description: 'Craft character stories and quest narratives' },
  ]},
  { themes: ['game_development', 'visual_art'], careers: [
    { title: 'Game Artist', description: 'Create the visual worlds and characters of video games' },
    { title: 'Concept Artist for Games', description: 'Design concept art for game projects' },
    { title: 'Environment Artist', description: 'Build immersive game environments' },
  ]},

  // ── PSYCHOLOGY combinations ──
  { themes: ['behavioral_science', 'marketing_sales'], careers: [
    { title: 'Behavioral Marketing Strategist', description: 'Apply psychology to effective marketing' },
    { title: 'Consumer Psychology Consultant', description: 'Help brands understand consumer behavior' },
    { title: 'UX Researcher', description: 'Study user behavior to create better products' },
  ]},
  { themes: ['emotional_intelligence', 'team_management'], careers: [
    { title: 'Executive Coach', description: 'Develop emotional intelligence in leaders' },
    { title: 'Organizational Development Specialist', description: 'Build emotionally intelligent organizations' },
    { title: 'Workplace Wellness Director', description: 'Create psychologically safe work environments' },
  ]},
  { themes: ['clinical_psychology', 'children_education'], careers: [
    { title: 'Child Psychologist', description: 'Support children\'s mental health and development' },
    { title: 'School Psychologist', description: 'Provide psychological support in schools' },
    { title: 'Developmental Specialist', description: 'Help children overcome developmental challenges' },
  ]},

  // ── SPIRITUALITY combinations ──
  { themes: ['meditation_mindfulness', 'wellness_fitness'], careers: [
    { title: 'Mindfulness & Wellness Coach', description: 'Guide individuals toward peace and wellness' },
    { title: 'Yoga & Meditation Teacher', description: 'Teach practices that transform lives' },
    { title: 'Wellness Retreat Facilitator', description: 'Create immersive mindfulness retreat experiences' },
  ]},

  // ── FINANCE combinations ──
  { themes: ['personal_finance', 'online_teaching'], careers: [
    { title: 'Financial Literacy Educator', description: 'Teach personal finance skills online' },
    { title: 'Money Coach', description: 'Help individuals build healthy financial habits' },
    { title: 'Financial Planning Content Creator', description: 'Create financial education content' },
  ]},
  { themes: ['fintech_crypto', 'software_engineering'], careers: [
    { title: 'Fintech Developer', description: 'Build innovative financial technology applications' },
    { title: 'Blockchain Engineer', description: 'Develop blockchain and decentralized solutions' },
    { title: 'Crypto Product Engineer', description: 'Build products in cryptocurrency and DeFi' },
  ]},

  // ── DESIGN combinations ──
  { themes: ['ux_design', 'mental_health'], careers: [
    { title: 'Health UX Designer', description: 'Design digital mental health tools with empathy' },
    { title: 'Therapeutic App Designer', description: 'Create UX for mental health applications' },
    { title: 'Inclusive Design Specialist', description: 'Design products supporting neurodiversity' },
  ]},
  { themes: ['product_design', 'sustainability'], careers: [
    { title: 'Sustainable Product Designer', description: 'Design eco-friendly products' },
    { title: 'Circular Design Specialist', description: 'Apply circular economy principles to design' },
    { title: 'Green Innovation Designer', description: 'Solve environmental challenges through design' },
  ]},

  // ── CRAFTSMANSHIP combinations ──
  { themes: ['woodworking', 'online_teaching'], careers: [
    { title: 'Woodworking Instructor', description: 'Teach woodworking skills through courses' },
    { title: 'Maker Space Director', description: 'Lead maker spaces teaching craftsmanship' },
    { title: 'Craft Education Content Creator', description: 'Create educational craftsmanship content' },
  ]},
  { themes: ['textile_fiber', 'ecommerce'], careers: [
    { title: 'Handmade Fashion Entrepreneur', description: 'Sell handcrafted clothing and textiles online' },
    { title: 'Textile Design Studio Owner', description: 'Run a textile design business' },
    { title: 'Online Craft Marketplace Seller', description: 'Build a successful online craft business' },
  ]},

  // ── TRAVEL combinations ──
  { themes: ['cultural_exploration', 'nonfiction_writing'], careers: [
    { title: 'Travel Writer', description: 'Document cultures through evocative travel writing' },
    { title: 'Cultural Journalist', description: 'Report on cultural stories worldwide' },
    { title: 'Guidebook Author', description: 'Write travel guides for meaningful exploration' },
  ]},
  { themes: ['adventure_travel', 'photography_art'], careers: [
    { title: 'Adventure Travel Photographer', description: 'Capture images from adventurous destinations' },
    { title: 'Travel Content Creator', description: 'Create visual travel content' },
    { title: 'Expedition Photographer', description: 'Document outdoor expeditions through photography' },
  ]},

  // ── SPORTS combinations ──
  { themes: ['fitness_training', 'online_teaching'], careers: [
    { title: 'Online Fitness Coach', description: 'Build and lead online fitness programs' },
    { title: 'Fitness Content Creator', description: 'Create workout programs for digital platforms' },
    { title: 'Virtual Personal Trainer', description: 'Provide personalized fitness training digitally' },
  ]},
  { themes: ['team_sports', 'mentoring_coaching'], careers: [
    { title: 'Sports Coach', description: 'Coach and develop athletes' },
    { title: 'Athletic Director', description: 'Lead sports programs and develop talent' },
    { title: 'Youth Sports Mentor', description: 'Guide young athletes in sports and life' },
  ]},

  // ── BROAD CATEGORY FALLBACKS ──
  { themes: ['creativity', 'technology'], careers: [
    { title: 'Creative Technologist', description: 'Bridge art and technology to create innovative experiences' },
    { title: 'Interactive Media Developer', description: 'Build creative interactive digital experiences' },
    { title: 'Digital Experience Designer', description: 'Design technology-driven creative experiences' },
  ]},
  { themes: ['creativity', 'communication'], careers: [
    { title: 'Content Strategist', description: 'Shape brand narratives and creative communication' },
    { title: 'Creative Director', description: 'Lead creative vision across campaigns' },
    { title: 'Brand Storyteller', description: 'Build compelling brand stories' },
  ]},
  { themes: ['technology', 'business'], careers: [
    { title: 'Product Manager', description: 'Drive product strategy at tech and business intersection' },
    { title: 'Tech Entrepreneur', description: 'Build innovative tech startups' },
    { title: 'Solutions Architect', description: 'Design technical solutions for business challenges' },
  ]},
  { themes: ['helping', 'psychology'], careers: [
    { title: 'Counselor / Therapist', description: 'Guide people through challenges and growth' },
    { title: 'Life Coach', description: 'Help people discover and achieve their goals' },
    { title: 'Social Worker', description: 'Support communities with compassion and expertise' },
  ]},
  { themes: ['helping', 'teaching'], careers: [
    { title: 'School Counselor', description: 'Support student wellbeing and success' },
    { title: 'Community Educator', description: 'Empower communities through education' },
    { title: 'Youth Mentor', description: 'Guide young people to discover their potential' },
  ]},
  { themes: ['science', 'healthcare'], careers: [
    { title: 'Medical Researcher', description: 'Push boundaries of medical knowledge' },
    { title: 'Clinical Scientist', description: 'Bridge lab research and patient care' },
    { title: 'Biomedical Engineer', description: 'Design medical devices that save lives' },
  ]},
  { themes: ['nature', 'science'], careers: [
    { title: 'Environmental Scientist', description: 'Study and protect the natural world' },
    { title: 'Conservation Biologist', description: 'Preserve biodiversity and ecosystems' },
    { title: 'Sustainability Researcher', description: 'Research sustainable environmental solutions' },
  ]},
  { themes: ['leadership', 'business'], careers: [
    { title: 'CEO / Founder', description: 'Lead organizations and build visionary companies' },
    { title: 'Management Consultant', description: 'Transform organizations through strategic insight' },
    { title: 'Business Development Director', description: 'Drive growth and strategic partnerships' },
  ]},
  { themes: ['writing_content', 'communication'], careers: [
    { title: 'Author / Writer', description: 'Craft stories and ideas that inspire' },
    { title: 'Communications Director', description: 'Shape organizational narratives' },
    { title: 'Editorial Director', description: 'Lead content and editorial strategy' },
  ]},
  { themes: ['data_analytics', 'business'], careers: [
    { title: 'Data Scientist', description: 'Extract insights from data to drive decisions' },
    { title: 'Business Intelligence Analyst', description: 'Turn data into actionable strategies' },
    { title: 'Analytics Lead', description: 'Lead data analytics teams' },
  ]},
];

/**
 * Find matching careers using subcategory-level matching first, then parent categories.
 * Adds personalized reasons using user phrases.
 */
export function findMatchingCareers(
  themes: string[],
  subcats: string[],
  dimensionThemes: Record<Dimension, Theme[]>,
  allPhrases: UserPhrase[]
): CareerPath[] {
  const results: CareerPath[] = [];
  const seenTitles = new Set<string>();

  // 1. Match subcategory-specific mappings first (highest priority)
  for (const mapping of careerMappings) {
    const subcatMatchCount = mapping.themes.filter(t => subcats.includes(t)).length;
    const catMatchCount = mapping.themes.filter(t => themes.includes(t)).length;
    const matchCount = subcatMatchCount > 0 ? subcatMatchCount : catMatchCount;

    if (matchCount > 0) {
      const score = subcatMatchCount > 0
        ? 0.5 + (subcatMatchCount / mapping.themes.length) * 0.5
        : (catMatchCount / mapping.themes.length) * 0.5;

      for (const career of mapping.careers) {
        if (seenTitles.has(career.title)) continue;
        seenTitles.add(career.title);
        results.push({
          title: career.title,
          description: career.description,
          matchScore: score,
          relatedThemes: mapping.themes.filter(t => subcats.includes(t) || themes.includes(t)),
          personalizedReason: buildPersonalizedReason(mapping.themes, dimensionThemes, allPhrases),
        });
      }
    }
  }

  // 2. Compositional generation for uncovered subcategory pairs
  if (results.length < 6) {
    const topSubcats = subcats.slice(0, 4);
    for (let i = 0; i < topSubcats.length; i++) {
      for (let j = i + 1; j < topSubcats.length; j++) {
        const field1 = findFieldForSubcategory(topSubcats[i]);
        const field2 = findFieldForSubcategory(topSubcats[j]);
        if (!field1 || !field2 || field1.id === field2.id) continue;

        const composedTitles = composeCareerTitle(field1, field2);
        for (const title of composedTitles) {
          if (seenTitles.has(title) || results.length >= 10) continue;
          seenTitles.add(title);
          results.push({
            title,
            description: `${field1.descriptionBases[0]} while you ${field2.descriptionBases[0]?.toLowerCase() || 'grow'}`,
            matchScore: 0.4,
            relatedThemes: [topSubcats[i], topSubcats[j]],
            personalizedReason: buildPersonalizedReason([topSubcats[i], topSubcats[j]], dimensionThemes, allPhrases),
          });
        }
      }
    }
  }

  results.sort((a, b) => b.matchScore - a.matchScore);
  return results.slice(0, 8);
}

function buildPersonalizedReason(
  matchedThemes: string[],
  dimensionThemes: Record<Dimension, Theme[]>,
  allPhrases: UserPhrase[]
): string {
  const relevantPhrases = allPhrases.filter(p =>
    matchedThemes.includes(p.category) || matchedThemes.includes(p.subcategory)
  );

  const multiWord = relevantPhrases.filter(p => p.raw.includes(' ')).slice(0, 2);
  const bestPhrases = multiWord.length > 0 ? multiWord : relevantPhrases.slice(0, 1);

  if (bestPhrases.length === 0) {
    const labels: string[] = [];
    for (const ts of Object.values(dimensionThemes)) {
      for (const theme of ts) {
        if (matchedThemes.includes(theme.category) || matchedThemes.includes(theme.subcategory)) {
          labels.push(theme.label.toLowerCase());
        }
      }
    }
    if (labels.length > 0) return `Aligns with your interest in ${[...new Set(labels)].slice(0, 2).join(' and ')}`;
    return '';
  }

  if (bestPhrases.length === 1) return `Because you mentioned ${bestPhrases[0].raw}`;
  return `Connects your interest in ${bestPhrases[0].raw} with ${bestPhrases[1].raw}`;
}
