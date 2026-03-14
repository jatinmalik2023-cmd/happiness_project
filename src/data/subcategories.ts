export interface Subcategory {
  id: string;
  parentCategory: string;
  label: string;
  keywords: string[];
}

export const subcategories: Subcategory[] = [
  // ── CREATIVITY ──
  { id: 'visual_art', parentCategory: 'creativity', label: 'Visual Art', keywords: ['paint', 'painting', 'draw', 'drawing', 'sketch', 'watercolor', 'oil', 'acrylic', 'canvas', 'illustration', 'portrait', 'landscape', 'mural', 'abstract', 'sculpture', 'sculpt', 'gallery', 'exhibit'] },
  { id: 'music_creation', parentCategory: 'creativity', label: 'Music & Composition', keywords: ['compose', 'composition', 'music', 'song', 'songwriting', 'instrument', 'guitar', 'piano', 'violin', 'drums', 'sing', 'singing', 'melody', 'beat', 'produce', 'producer', 'dj', 'mixing', 'recording', 'album', 'band', 'orchestra'] },
  { id: 'creative_writing', parentCategory: 'creativity', label: 'Creative Writing', keywords: ['novel', 'fiction', 'poetry', 'poem', 'story', 'stories', 'narrative', 'prose', 'short story', 'fantasy', 'sci-fi', 'mystery', 'thriller', 'romance', 'literary', 'chapter', 'character', 'plot', 'worldbuilding'] },
  { id: 'film_video', parentCategory: 'creativity', label: 'Film & Video', keywords: ['film', 'filming', 'video', 'cinema', 'direct', 'directing', 'documentary', 'screenplay', 'cinematography', 'edit', 'editing', 'production', 'short film', 'movie', 'animation', 'animate'] },
  { id: 'photography_art', parentCategory: 'creativity', label: 'Photography', keywords: ['photograph', 'photography', 'camera', 'portrait', 'landscape', 'shoot', 'shooting', 'photo', 'lens', 'exposure', 'lightroom', 'photoshop'] },
  { id: 'digital_art', parentCategory: 'creativity', label: 'Digital Art & Design', keywords: ['digital art', '3d', 'cgi', 'render', 'blender', 'pixel', 'procreate', 'tablet', 'nft', 'generative', 'ai art'] },

  // ── TECHNOLOGY ──
  { id: 'web_development', parentCategory: 'technology', label: 'Web Development', keywords: ['web', 'website', 'frontend', 'backend', 'fullstack', 'html', 'css', 'javascript', 'react', 'angular', 'vue', 'node', 'api', 'rest', 'graphql', 'responsive'] },
  { id: 'mobile_development', parentCategory: 'technology', label: 'Mobile Development', keywords: ['mobile', 'ios', 'android', 'app', 'swift', 'kotlin', 'flutter', 'react native', 'smartphone', 'tablet'] },
  { id: 'ai_ml', parentCategory: 'technology', label: 'AI & Machine Learning', keywords: ['ai', 'artificial intelligence', 'machine learning', 'deep learning', 'neural', 'nlp', 'computer vision', 'tensorflow', 'pytorch', 'model', 'training', 'chatbot', 'gpt', 'llm'] },
  { id: 'devops_infra', parentCategory: 'technology', label: 'DevOps & Infrastructure', keywords: ['devops', 'cloud', 'aws', 'azure', 'docker', 'kubernetes', 'ci/cd', 'deploy', 'server', 'infrastructure', 'linux', 'terraform'] },
  { id: 'cybersecurity', parentCategory: 'technology', label: 'Cybersecurity', keywords: ['security', 'cyber', 'hack', 'hacking', 'ethical', 'penetration', 'vulnerability', 'encryption', 'firewall', 'privacy', 'compliance'] },
  { id: 'software_engineering', parentCategory: 'technology', label: 'Software Engineering', keywords: ['code', 'coding', 'program', 'programming', 'software', 'algorithm', 'debug', 'architecture', 'clean code', 'refactor', 'testing', 'agile', 'scrum', 'python', 'java', 'c++', 'rust', 'go'] },

  // ── TEACHING ──
  { id: 'children_education', parentCategory: 'teaching', label: 'Children & Youth Education', keywords: ['kid', 'kids', 'child', 'children', 'elementary', 'preschool', 'young', 'toddler', 'youth', 'teen', 'teenager', 'middle school', 'high school', 'playground', 'nursery'] },
  { id: 'adult_training', parentCategory: 'teaching', label: 'Adult & Corporate Training', keywords: ['adult', 'professional', 'corporate', 'training', 'workshop', 'seminar', 'upskill', 'reskill', 'employee', 'workforce', 'hr'] },
  { id: 'online_teaching', parentCategory: 'teaching', label: 'Online Teaching & Content', keywords: ['online', 'course', 'elearning', 'youtube', 'tutorial', 'video lesson', 'webinar', 'platform', 'udemy', 'coursera', 'remote'] },
  { id: 'mentoring_coaching', parentCategory: 'teaching', label: 'Mentoring & Coaching', keywords: ['mentor', 'mentoring', 'guide', 'guiding', 'coach', 'coaching', 'advise', 'advising', 'one-on-one', 'personal development'] },
  { id: 'academic_teaching', parentCategory: 'teaching', label: 'Academic & University Teaching', keywords: ['university', 'professor', 'lecturer', 'academic', 'research', 'phd', 'college', 'thesis', 'publish', 'journal', 'scholar'] },

  // ── HEALTHCARE ──
  { id: 'medical_practice', parentCategory: 'healthcare', label: 'Medical Practice', keywords: ['doctor', 'physician', 'surgeon', 'medicine', 'medical', 'diagnos', 'treatment', 'patient', 'hospital', 'clinic', 'nurse', 'nursing', 'emergency', 'primary care'] },
  { id: 'mental_health', parentCategory: 'healthcare', label: 'Mental Health', keywords: ['mental', 'therapy', 'therapist', 'counseling', 'counselor', 'psychotherapy', 'anxiety', 'depression', 'trauma', 'ptsd', 'cognitive', 'behavioral', 'emotional', 'stress'] },
  { id: 'wellness_fitness', parentCategory: 'healthcare', label: 'Wellness & Holistic Health', keywords: ['wellness', 'wellbeing', 'holistic', 'yoga', 'meditation', 'mindful', 'mindfulness', 'nutrition', 'diet', 'detox', 'ayurveda', 'naturopath', 'acupuncture', 'massage'] },
  { id: 'public_health', parentCategory: 'healthcare', label: 'Public Health', keywords: ['public health', 'epidemiology', 'prevention', 'vaccine', 'community health', 'global health', 'sanitation', 'disease', 'outbreak', 'who'] },

  // ── LEADERSHIP ──
  { id: 'executive_leadership', parentCategory: 'leadership', label: 'Executive Leadership', keywords: ['ceo', 'cto', 'cfo', 'executive', 'director', 'vp', 'board', 'c-suite', 'vision', 'strategic', 'decision'] },
  { id: 'team_management', parentCategory: 'leadership', label: 'Team Management', keywords: ['team', 'manage', 'management', 'lead', 'supervise', 'coordinate', 'delegate', 'hire', 'hiring', 'performance', 'meeting'] },
  { id: 'entrepreneurship', parentCategory: 'leadership', label: 'Entrepreneurship', keywords: ['entrepreneur', 'startup', 'founder', 'co-founder', 'bootstrap', 'venture', 'pitch', 'mvp', 'pivot', 'scale', 'disrupt', 'innovation'] },
  { id: 'project_management', parentCategory: 'leadership', label: 'Project Management', keywords: ['project', 'plan', 'planning', 'timeline', 'milestone', 'deadline', 'scope', 'budget', 'stakeholder', 'agile', 'scrum', 'kanban', 'jira'] },

  // ── NATURE ──
  { id: 'conservation', parentCategory: 'nature', label: 'Conservation & Wildlife', keywords: ['conservation', 'wildlife', 'endangered', 'species', 'biodiversity', 'habitat', 'ecosystem', 'protect', 'sanctuary', 'marine', 'coral', 'rainforest'] },
  { id: 'sustainability', parentCategory: 'nature', label: 'Sustainability & Climate', keywords: ['sustainability', 'sustainable', 'climate', 'carbon', 'renewable', 'solar', 'wind', 'green', 'eco', 'recycle', 'zero waste', 'emission'] },
  { id: 'farming_gardening', parentCategory: 'nature', label: 'Farming & Gardening', keywords: ['farm', 'farming', 'garden', 'gardening', 'plant', 'grow', 'harvest', 'organic', 'permaculture', 'soil', 'seed', 'crop', 'compost', 'urban farm'] },
  { id: 'outdoor_adventure', parentCategory: 'nature', label: 'Outdoor Adventure', keywords: ['outdoor', 'hike', 'hiking', 'camp', 'camping', 'trek', 'trekking', 'mountain', 'climb', 'climbing', 'kayak', 'river', 'trail', 'wilderness', 'backpacking'] },

  // ── COMMUNICATION ──
  { id: 'public_speaking', parentCategory: 'communication', label: 'Public Speaking', keywords: ['speak', 'speaking', 'present', 'presentation', 'keynote', 'ted', 'stage', 'audience', 'speech', 'rhetoric', 'toastmaster', 'oratory'] },
  { id: 'journalism_media', parentCategory: 'communication', label: 'Journalism & Media', keywords: ['journalism', 'journalist', 'news', 'report', 'reporting', 'media', 'press', 'broadcast', 'interview', 'investigate', 'newsroom', 'editorial'] },
  { id: 'podcasting_video', parentCategory: 'communication', label: 'Podcasting & Video Content', keywords: ['podcast', 'podcasting', 'youtube', 'vlog', 'video', 'stream', 'streaming', 'content creator', 'channel', 'subscriber', 'episode', 'host'] },
  { id: 'storytelling', parentCategory: 'communication', label: 'Storytelling & Narrative', keywords: ['storytell', 'story', 'stories', 'narrative', 'narrate', 'tale', 'folklore', 'myth', 'legend', 'oral', 'campfire', 'anecdote'] },
  { id: 'marketing_comms', parentCategory: 'communication', label: 'Marketing & Communications', keywords: ['marketing', 'brand', 'branding', 'pr', 'public relations', 'advertising', 'campaign', 'social media', 'copywriting', 'slogan', 'audience', 'engagement'] },

  // ── HELPING ──
  { id: 'social_work', parentCategory: 'helping', label: 'Social Work', keywords: ['social work', 'social worker', 'welfare', 'case worker', 'foster', 'adoption', 'abuse', 'domestic', 'shelter', 'homeless', 'poverty'] },
  { id: 'volunteering', parentCategory: 'helping', label: 'Volunteering & Nonprofits', keywords: ['volunteer', 'volunteering', 'nonprofit', 'ngo', 'charity', 'donate', 'donation', 'fundrais', 'philanthropi', 'humanitarian', 'aid', 'relief'] },
  { id: 'community_building', parentCategory: 'helping', label: 'Community Building', keywords: ['community', 'neighborhood', 'local', 'grassroots', 'organize', 'organizing', 'collective', 'cooperative', 'empower', 'outreach', 'inclusion'] },
  { id: 'caregiving', parentCategory: 'helping', label: 'Caregiving & Support', keywords: ['care', 'caregiver', 'support', 'assist', 'elder', 'elderly', 'senior', 'disability', 'special needs', 'companion', 'comfort', 'empathy', 'compassion', 'kind'] },

  // ── SCIENCE ──
  { id: 'life_sciences', parentCategory: 'science', label: 'Life Sciences & Biology', keywords: ['biology', 'biologist', 'genetic', 'dna', 'cell', 'molecular', 'organism', 'evolution', 'ecology', 'botany', 'zoology', 'microbiology'] },
  { id: 'physical_sciences', parentCategory: 'science', label: 'Physics & Chemistry', keywords: ['physics', 'physicist', 'chemistry', 'chemist', 'quantum', 'particle', 'atom', 'molecule', 'experiment', 'lab', 'laboratory', 'formula', 'equation'] },
  { id: 'space_astronomy', parentCategory: 'science', label: 'Space & Astronomy', keywords: ['space', 'astronomy', 'astronaut', 'nasa', 'planet', 'star', 'galaxy', 'telescope', 'rocket', 'satellite', 'mars', 'moon', 'cosmos', 'astrophysics'] },
  { id: 'research_methods', parentCategory: 'science', label: 'Research & Discovery', keywords: ['research', 'researcher', 'discover', 'discovery', 'hypothesis', 'experiment', 'peer review', 'publish', 'paper', 'grant', 'methodology', 'study'] },

  // ── BUSINESS ──
  { id: 'marketing_sales', parentCategory: 'business', label: 'Marketing & Sales', keywords: ['marketing', 'sales', 'sell', 'selling', 'customer', 'client', 'lead', 'conversion', 'funnel', 'revenue', 'growth', 'acquisition', 'retention'] },
  { id: 'consulting', parentCategory: 'business', label: 'Consulting & Strategy', keywords: ['consult', 'consulting', 'strategy', 'strategic', 'advisory', 'mckinsey', 'bcg', 'analysis', 'roadmap', 'transformation', 'optimization'] },
  { id: 'ecommerce', parentCategory: 'business', label: 'E-Commerce & Retail', keywords: ['ecommerce', 'online store', 'shopify', 'amazon', 'retail', 'shop', 'product', 'inventory', 'supply chain', 'logistics', 'dropshipping'] },
  { id: 'startup_culture', parentCategory: 'business', label: 'Startup Culture', keywords: ['startup', 'pitch', 'investor', 'seed', 'series a', 'accelerator', 'incubator', 'y combinator', 'mvp', 'product market fit', 'traction'] },

  // ── ARTS & PERFORMANCE ──
  { id: 'theater_acting', parentCategory: 'arts_performance', label: 'Theater & Acting', keywords: ['act', 'acting', 'actor', 'actress', 'theater', 'theatre', 'stage', 'drama', 'play', 'monologue', 'audition', 'character', 'role', 'broadway'] },
  { id: 'dance', parentCategory: 'arts_performance', label: 'Dance', keywords: ['dance', 'dancing', 'dancer', 'choreograph', 'ballet', 'contemporary', 'hip hop', 'salsa', 'tango', 'breakdance', 'movement', 'routine'] },
  { id: 'comedy', parentCategory: 'arts_performance', label: 'Comedy & Improv', keywords: ['comedy', 'comedian', 'standup', 'stand-up', 'improv', 'improvisation', 'sketch', 'funny', 'humor', 'humour', 'joke', 'satiric', 'parody'] },
  { id: 'music_performance', parentCategory: 'arts_performance', label: 'Music Performance', keywords: ['perform', 'concert', 'gig', 'live', 'band', 'orchestra', 'choir', 'recital', 'tour', 'festival', 'opera', 'musical'] },

  // ── SPORTS & FITNESS ──
  { id: 'team_sports', parentCategory: 'sports_fitness', label: 'Team Sports', keywords: ['basketball', 'football', 'soccer', 'baseball', 'volleyball', 'hockey', 'cricket', 'rugby', 'team sport', 'league', 'tournament', 'match'] },
  { id: 'individual_sports', parentCategory: 'sports_fitness', label: 'Individual Sports', keywords: ['tennis', 'golf', 'swimming', 'running', 'marathon', 'cycling', 'boxing', 'martial art', 'karate', 'judo', 'wrestling', 'triathlon', 'athletics'] },
  { id: 'fitness_training', parentCategory: 'sports_fitness', label: 'Fitness & Training', keywords: ['gym', 'workout', 'fitness', 'exercise', 'strength', 'cardio', 'crossfit', 'personal trainer', 'bodybuilding', 'weight', 'aerobic', 'pilates'] },
  { id: 'extreme_adventure', parentCategory: 'sports_fitness', label: 'Extreme & Adventure Sports', keywords: ['extreme', 'adventure', 'ski', 'skiing', 'snowboard', 'surf', 'surfing', 'skydiv', 'bungee', 'paraglid', 'rock climbing', 'scuba', 'diving'] },

  // ── FOOD & CULINARY ──
  { id: 'cooking_chef', parentCategory: 'food_culinary', label: 'Cooking & Culinary Arts', keywords: ['cook', 'cooking', 'chef', 'cuisine', 'culinary', 'kitchen', 'recipe', 'ingredient', 'meal', 'dish', 'gourmet', 'michelin', 'gastronomy'] },
  { id: 'baking_pastry', parentCategory: 'food_culinary', label: 'Baking & Pastry', keywords: ['bake', 'baking', 'pastry', 'cake', 'bread', 'dessert', 'confection', 'chocolate', 'sugar', 'flour', 'oven', 'dough'] },
  { id: 'food_entrepreneurship', parentCategory: 'food_culinary', label: 'Food Business', keywords: ['restaurant', 'cafe', 'food truck', 'catering', 'food business', 'menu', 'dine', 'dining', 'food industry', 'hospitality', 'sommelier', 'wine'] },
  { id: 'nutrition_health', parentCategory: 'food_culinary', label: 'Nutrition & Health Food', keywords: ['nutrition', 'nutritionist', 'diet', 'dietician', 'healthy eating', 'vegan', 'vegetarian', 'organic', 'superfood', 'supplement', 'calorie', 'macro'] },

  // ── PSYCHOLOGY ──
  { id: 'clinical_psychology', parentCategory: 'psychology', label: 'Clinical Psychology', keywords: ['clinical', 'diagnos', 'disorder', 'therapy', 'therapist', 'assessment', 'psychologist', 'dsm', 'intervention', 'psychiatric'] },
  { id: 'behavioral_science', parentCategory: 'psychology', label: 'Behavioral Science', keywords: ['behavior', 'behavioral', 'behavioural', 'cognitive', 'habit', 'decision', 'bias', 'nudge', 'heuristic', 'motivation', 'reward'] },
  { id: 'emotional_intelligence', parentCategory: 'psychology', label: 'Emotional Intelligence', keywords: ['emotion', 'emotional', 'empathy', 'eq', 'self-aware', 'self awareness', 'regulation', 'resilience', 'mindset', 'growth mindset'] },
  { id: 'relationships', parentCategory: 'psychology', label: 'Relationships & Family', keywords: ['relationship', 'marriage', 'couple', 'family', 'parenting', 'conflict', 'attachment', 'love', 'intimacy', 'communication', 'boundaries'] },

  // ── DESIGN ──
  { id: 'ux_design', parentCategory: 'design', label: 'UX Design', keywords: ['ux', 'user experience', 'usability', 'user research', 'wireframe', 'prototype', 'persona', 'journey map', 'user testing', 'information architecture'] },
  { id: 'ui_visual', parentCategory: 'design', label: 'UI & Visual Design', keywords: ['ui', 'interface', 'visual', 'layout', 'typography', 'color', 'figma', 'sketch', 'photoshop', 'illustrator', 'mockup', 'pixel', 'responsive'] },
  { id: 'product_design', parentCategory: 'design', label: 'Product Design', keywords: ['product design', 'industrial', 'physical product', 'cad', '3d printing', 'prototype', 'ergonomic', 'manufacturing', 'material'] },
  { id: 'graphic_design', parentCategory: 'design', label: 'Graphic Design', keywords: ['graphic', 'logo', 'branding', 'poster', 'print', 'packaging', 'identity', 'vector', 'adobe', 'indesign', 'canva'] },

  // ── WRITING & CONTENT ──
  { id: 'fiction_writing', parentCategory: 'writing_content', label: 'Fiction Writing', keywords: ['fiction', 'novel', 'novelist', 'short story', 'fantasy', 'sci-fi', 'mystery', 'thriller', 'romance', 'literary fiction', 'character', 'plot', 'worldbuilding', 'genre'] },
  { id: 'nonfiction_writing', parentCategory: 'writing_content', label: 'Non-Fiction & Journalism', keywords: ['nonfiction', 'non-fiction', 'journalism', 'article', 'essay', 'report', 'feature', 'investigate', 'editorial', 'column', 'magazine'] },
  { id: 'content_marketing', parentCategory: 'writing_content', label: 'Content Marketing & Blogging', keywords: ['blog', 'blogging', 'content', 'seo', 'copywriting', 'copy', 'email', 'newsletter', 'landing page', 'conversion', 'engagement'] },
  { id: 'technical_writing', parentCategory: 'writing_content', label: 'Technical Writing', keywords: ['technical writing', 'documentation', 'docs', 'api docs', 'manual', 'specification', 'readme', 'knowledge base', 'tutorial', 'how-to'] },
  { id: 'screenwriting', parentCategory: 'writing_content', label: 'Screenwriting & Scripts', keywords: ['screenplay', 'script', 'screenwriter', 'dialogue', 'scene', 'act', 'pilot', 'tv', 'series', 'adaptation'] },

  // ── TRAVEL ──
  { id: 'cultural_exploration', parentCategory: 'travel', label: 'Cultural Exploration', keywords: ['culture', 'cultural', 'tradition', 'heritage', 'museum', 'history', 'architecture', 'local', 'authentic', 'immersion', 'language', 'foreign'] },
  { id: 'adventure_travel', parentCategory: 'travel', label: 'Adventure Travel', keywords: ['adventure', 'backpack', 'backpacking', 'trek', 'expedition', 'explore', 'wild', 'remote', 'off the beaten path', 'solo travel'] },
  { id: 'travel_content', parentCategory: 'travel', label: 'Travel Writing & Content', keywords: ['travel blog', 'travel writing', 'travel photo', 'vlog', 'destination', 'guide', 'review', 'itinerary', 'nomad', 'digital nomad'] },

  // ── SOCIAL JUSTICE ──
  { id: 'human_rights', parentCategory: 'social_justice', label: 'Human Rights', keywords: ['human rights', 'rights', 'freedom', 'liberty', 'dignity', 'refugee', 'immigration', 'asylum', 'discrimination', 'persecution'] },
  { id: 'equality_dei', parentCategory: 'social_justice', label: 'Equality & DEI', keywords: ['equality', 'equity', 'diversity', 'inclusion', 'inclusive', 'gender', 'racial', 'lgbtq', 'accessibility', 'representation', 'bias'] },
  { id: 'activism', parentCategory: 'social_justice', label: 'Activism & Advocacy', keywords: ['activism', 'activist', 'protest', 'campaign', 'petition', 'rally', 'movement', 'advocacy', 'advocate', 'lobby', 'reform', 'change'] },
  { id: 'policy_law', parentCategory: 'social_justice', label: 'Policy & Law', keywords: ['policy', 'law', 'legal', 'legislation', 'regulation', 'court', 'justice', 'attorney', 'lawyer', 'constitution', 'democratic', 'governance'] },

  // ── FINANCE ──
  { id: 'personal_finance', parentCategory: 'finance', label: 'Personal Finance', keywords: ['personal finance', 'budget', 'save', 'saving', 'invest', 'investing', 'retirement', 'debt', 'credit', 'insurance', 'mortgage', 'wealth'] },
  { id: 'corporate_finance', parentCategory: 'finance', label: 'Corporate Finance', keywords: ['corporate finance', 'accounting', 'audit', 'tax', 'financial statement', 'balance sheet', 'revenue', 'profit', 'valuation', 'merger', 'acquisition'] },
  { id: 'fintech_crypto', parentCategory: 'finance', label: 'Fintech & Crypto', keywords: ['fintech', 'crypto', 'cryptocurrency', 'bitcoin', 'blockchain', 'defi', 'nft', 'trading', 'algorithm', 'quantitative', 'robo advisor'] },
  { id: 'real_estate', parentCategory: 'finance', label: 'Real Estate', keywords: ['real estate', 'property', 'housing', 'mortgage', 'rent', 'landlord', 'commercial', 'residential', 'investment property', 'flip', 'development'] },

  // ── EDUCATION ──
  { id: 'k12_education', parentCategory: 'education', label: 'K-12 Education', keywords: ['school', 'teacher', 'classroom', 'curriculum', 'lesson', 'student', 'elementary', 'middle school', 'high school', 'pedagogy', 'homework'] },
  { id: 'higher_education', parentCategory: 'education', label: 'Higher Education', keywords: ['university', 'college', 'degree', 'phd', 'masters', 'bachelor', 'campus', 'research', 'tenure', 'professor', 'faculty', 'dean'] },
  { id: 'edtech', parentCategory: 'education', label: 'EdTech & Online Learning', keywords: ['edtech', 'elearning', 'online learning', 'mooc', 'lms', 'coursera', 'udemy', 'khan academy', 'gamification', 'adaptive learning', 'platform'] },
  { id: 'special_education', parentCategory: 'education', label: 'Special Education', keywords: ['special education', 'special needs', 'learning disability', 'autism', 'adhd', 'dyslexia', 'iep', 'inclusive education', 'accommodation', 'differentiat'] },

  // ── CRAFTSMANSHIP ──
  { id: 'woodworking', parentCategory: 'craftsmanship', label: 'Woodworking & Carpentry', keywords: ['wood', 'woodwork', 'carpentry', 'carpenter', 'furniture', 'cabinet', 'carve', 'carving', 'lathe', 'joint', 'hardwood', 'table', 'chair'] },
  { id: 'textile_fiber', parentCategory: 'craftsmanship', label: 'Textile & Fiber Arts', keywords: ['sew', 'sewing', 'knit', 'knitting', 'crochet', 'weave', 'weaving', 'fabric', 'textile', 'quilt', 'embroider', 'fashion', 'clothing', 'pattern'] },
  { id: 'pottery_ceramics', parentCategory: 'craftsmanship', label: 'Pottery & Ceramics', keywords: ['pottery', 'ceramic', 'clay', 'wheel', 'kiln', 'glaze', 'porcelain', 'stoneware', 'earthenware', 'sculpt', 'mold'] },
  { id: 'jewelry_metalwork', parentCategory: 'craftsmanship', label: 'Jewelry & Metalwork', keywords: ['jewelry', 'jewellery', 'metal', 'metalwork', 'silver', 'gold', 'gemstone', 'ring', 'necklace', 'blacksmith', 'forge', 'solder', 'weld'] },

  // ── GAMING ──
  { id: 'game_development', parentCategory: 'gaming', label: 'Game Development', keywords: ['game dev', 'game development', 'unity', 'unreal', 'godot', 'game engine', 'game design', 'level design', 'game mechanic', 'indie game', 'sprite', 'shader'] },
  { id: 'esports_competitive', parentCategory: 'gaming', label: 'Esports & Competitive Gaming', keywords: ['esport', 'esports', 'competitive', 'tournament', 'league', 'rank', 'ladder', 'pro gamer', 'team', 'scrimmage'] },
  { id: 'game_content', parentCategory: 'gaming', label: 'Game Streaming & Content', keywords: ['stream', 'streaming', 'twitch', 'youtube gaming', 'content creator', 'let\'s play', 'walkthrough', 'review', 'commentary', 'subscriber'] },
  { id: 'tabletop_board', parentCategory: 'gaming', label: 'Tabletop & Board Games', keywords: ['board game', 'tabletop', 'rpg', 'dungeons', 'dice', 'card game', 'strategy game', 'puzzle', 'chess', 'game night', 'cooperative'] },

  // ── PARENTING ──
  { id: 'early_childhood', parentCategory: 'parenting', label: 'Early Childhood', keywords: ['baby', 'toddler', 'infant', 'newborn', 'preschool', 'daycare', 'childcare', 'developmental', 'milestone', 'play', 'nurture'] },
  { id: 'adolescent_parenting', parentCategory: 'parenting', label: 'Adolescent & Teen Parenting', keywords: ['teen', 'teenager', 'adolescent', 'puberty', 'middle school', 'high school', 'rebellious', 'boundaries', 'independence'] },
  { id: 'family_education', parentCategory: 'parenting', label: 'Family & Home Education', keywords: ['family', 'homeschool', 'homeschooling', 'unschool', 'family learning', 'parent', 'parenting', 'child development', 'upbringing'] },

  // ── SPIRITUALITY ──
  { id: 'meditation_mindfulness', parentCategory: 'spirituality', label: 'Meditation & Mindfulness', keywords: ['meditat', 'mindful', 'mindfulness', 'zen', 'breathing', 'calm', 'presence', 'awareness', 'contemplat', 'silence', 'retreat'] },
  { id: 'philosophy', parentCategory: 'spirituality', label: 'Philosophy & Ethics', keywords: ['philosophy', 'philosophical', 'ethics', 'ethical', 'moral', 'existential', 'meaning', 'purpose', 'stoic', 'socrat', 'aristotle', 'wisdom'] },
  { id: 'religious_spiritual', parentCategory: 'spirituality', label: 'Religious & Spiritual Practice', keywords: ['religion', 'religious', 'faith', 'pray', 'prayer', 'church', 'temple', 'mosque', 'spiritual', 'divine', 'sacred', 'soul', 'god', 'buddha', 'hindu', 'islam', 'christian'] },
  { id: 'energy_healing', parentCategory: 'spirituality', label: 'Energy & Healing Arts', keywords: ['energy', 'chakra', 'reiki', 'crystal', 'aura', 'holistic', 'healing', 'alternative', 'shamanic', 'qi', 'prana', 'tarot', 'astrology'] },

  // ── DATA & ANALYTICS ──
  { id: 'data_science', parentCategory: 'data_analytics', label: 'Data Science', keywords: ['data science', 'data scientist', 'pandas', 'jupyter', 'r', 'statistics', 'model', 'prediction', 'regression', 'classification', 'feature'] },
  { id: 'business_intelligence', parentCategory: 'data_analytics', label: 'Business Intelligence', keywords: ['bi', 'business intelligence', 'dashboard', 'tableau', 'power bi', 'report', 'kpi', 'metric', 'visualization', 'insight'] },
  { id: 'data_engineering', parentCategory: 'data_analytics', label: 'Data Engineering', keywords: ['data engineer', 'pipeline', 'etl', 'sql', 'database', 'warehouse', 'spark', 'hadoop', 'kafka', 'airflow', 'big data'] },
  { id: 'analytics_research', parentCategory: 'data_analytics', label: 'Analytics & Market Research', keywords: ['analytics', 'analysis', 'trend', 'pattern', 'forecast', 'survey', 'market research', 'consumer', 'segment', 'demographic'] },
];

/** Quick lookup: subcategory id → Subcategory object */
export const subcategoryMap = new Map<string, Subcategory>(
  subcategories.map(sc => [sc.id, sc])
);

/** Quick lookup: parent category → its subcategories */
export const categoryToSubcategories = new Map<string, Subcategory[]>();
for (const sc of subcategories) {
  const list = categoryToSubcategories.get(sc.parentCategory) || [];
  list.push(sc);
  categoryToSubcategories.set(sc.parentCategory, list);
}

/** Subcategory label lookup */
export const subcategoryLabels: Record<string, string> = Object.fromEntries(
  subcategories.map(sc => [sc.id, sc.label])
);
