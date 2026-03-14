import { IntersectionType } from '../types/analysis';

export const intersectionDescriptions: Record<IntersectionType, { title: string; subtitle: string; description: string }> = {
  passion: {
    title: 'Passion',
    subtitle: 'What You Love + What You\'re Good At',
    description: 'Your passion lives where your deepest joy meets your natural talents. This is where you find flow \u2014 those moments when time disappears because you\'re doing what you were born to do. People who live in their passion radiate energy and inspiration.',
  },
  mission: {
    title: 'Mission',
    subtitle: 'What You Love + What The World Needs',
    description: 'Your mission is the beautiful convergence of what lights your heart on fire and what the world is calling for. This is your chance to make a difference while doing what you love. Purpose-driven people find deep fulfillment here.',
  },
  vocation: {
    title: 'Vocation',
    subtitle: 'What The World Needs + What You Can Be Paid For',
    description: 'Your vocation emerges where society\'s needs align with earning potential. This is practical purpose \u2014 doing meaningful work that also provides stability. It represents the sustainable path of contribution.',
  },
  profession: {
    title: 'Profession',
    subtitle: 'What You\'re Good At + What You Can Be Paid For',
    description: 'Your profession is where your skills meet the marketplace. This is where your expertise creates tangible value. While skill alone doesn\'t guarantee fulfillment, it provides confidence and a strong foundation for growth.',
  },
};

/**
 * Dynamic intersection description templates with slots for user phrases.
 * {dim1Phrase} = top user phrase from first dimension
 * {dim2Phrase} = top user phrase from second dimension
 */
export const intersectionTemplates: Record<IntersectionType, string[]> = {
  passion: [
    'Your passion emerges where {dim1Phrase} meets {dim2Phrase}. This is where you find flow \u2014 those moments when time disappears because you\'re doing what energizes you most.',
    'You come alive when {dim1Phrase} intersects with {dim2Phrase}. This is your zone of creative energy and natural talent.',
  ],
  mission: [
    'Your mission connects {dim1Phrase} with {dim2Phrase}. This is where your heart\'s desire meets the world\'s calling \u2014 a powerful force for meaningful impact.',
    'When {dim1Phrase} meets the need for {dim2Phrase}, your mission takes shape. This is your opportunity to make a difference through what you love.',
  ],
  vocation: [
    'Your vocation bridges {dim1Phrase} with {dim2Phrase}. This is practical purpose \u2014 meaningful work that also provides stability and sustains your contribution.',
    'Where {dim1Phrase} meets {dim2Phrase}, your vocation emerges. This represents the sustainable path of doing work that matters.',
  ],
  profession: [
    'Your profession connects {dim1Phrase} with {dim2Phrase}. This is where your expertise creates tangible value in the marketplace.',
    'When {dim1Phrase} meets {dim2Phrase}, your professional strength shows. This gives you confidence and a strong foundation for growth.',
  ],
};

export const dimensionDescriptions: Record<string, string> = {
  love: 'These are the activities, subjects, and experiences that make your heart sing. They energize you, excite you, and make you feel most alive. Even without any reward, you\'d gravitate toward these naturally.',
  goodAt: 'These are your natural strengths, developed skills, and innate talents. Others recognize these abilities in you, and you perform them with relative ease. Your competencies are the tools with which you can build your future.',
  worldNeeds: 'These are the problems you see in the world that you feel called to address. They represent your sense of duty and purpose beyond yourself \u2014 the contribution you want to make to society, your community, or humanity.',
  paidFor: 'These represent the skills, services, and value you can offer that others are willing to pay for. This dimension grounds your purpose in practical reality and ensures sustainability.',
};

export const ikigaiStatementTemplates = [
  'Your Ikigai lies in {theme1}, where your passion for {love} meets your talent in {goodAt}, serves the world\'s need for {worldNeeds}, and creates value through {paidFor}.',
  'At the heart of your purpose is {theme1}. You\'re someone who loves {love}, excels at {goodAt}, sees the world\'s need for {worldNeeds}, and can build a career around {paidFor}.',
  'Your unique Ikigai is centered on {theme1}. This is where your love of {love}, your skill in {goodAt}, your calling to address {worldNeeds}, and your ability to earn through {paidFor} all converge.',
  'You\'ve discovered that {theme1} is at the core of who you are. Your passion for {love} fuels your talent in {goodAt}, while the world\'s need for {worldNeeds} gives you purpose and {paidFor} makes it sustainable.',
  'Your Ikigai crystallizes around {theme1}. When you combine {love} with {goodAt}, and align it with {worldNeeds} and {paidFor}, you find your deepest sense of purpose.',
  '{theme1} is the golden thread running through your life. It connects your love of {love}, your natural ability in {goodAt}, the world\'s need for {worldNeeds}, and your opportunity to thrive through {paidFor}.',
];
