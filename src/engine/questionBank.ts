import { Dimension, QuestionNode } from '../types/chat';

const loveQuestions: QuestionNode[] = [
  {
    id: 'love_opener_1',
    dimension: 'love',
    depth: 0,
    text: "Let's start with something wonderful. Imagine a perfect free day \u2014 no obligations, no limits, just you and time. What would you spend your hours doing?",
    keywords: [],
    acknowledgments: [
      "That sounds absolutely beautiful!",
      "I can feel the energy just hearing you describe that.",
      "What a wonderful way to spend your time!",
    ],
  },
  {
    id: 'love_followup_1',
    dimension: 'love',
    depth: 1,
    text: "I love that. Now, think about a moment in your life when you felt truly, deeply alive \u2014 like everything just clicked. What were you doing?",
    keywords: [],
    acknowledgments: [
      "That's such a powerful memory. Thank you for sharing it with me.",
      "I can tell that moment really meant something special to you.",
      "Moments like those are so precious \u2014 they show us who we really are.",
    ],
  },
  {
    id: 'love_followup_2',
    dimension: 'love',
    depth: 1,
    text: "When you were a child, what activities made you lose track of time completely? Sometimes our childhood joys hold the key to our deepest passions.",
    keywords: [],
    acknowledgments: [
      "There's something magical about childhood passions \u2014 they're so pure and honest.",
      "Isn't it beautiful how those early loves often stay with us?",
      "That's so telling! Our inner child often knows us best.",
    ],
  },
  {
    id: 'love_deep_1',
    dimension: 'love',
    depth: 2,
    text: "If money, time, and other people's opinions were completely irrelevant \u2014 what would your dream life look like on a daily basis?",
    keywords: [],
    acknowledgments: [
      "I absolutely love that vision. It says so much about who you are at your core.",
      "That's a life worth chasing. And the fact that you can articulate it means you're closer than you think.",
      "What a beautiful picture. Your values really shine through in that answer.",
    ],
  },
  {
    id: 'love_deep_2',
    dimension: 'love',
    depth: 2,
    text: "What topics or activities can you talk about for hours without getting bored? The things that light up your eyes when you mention them?",
    keywords: [],
    acknowledgments: [
      "I can practically see your eyes lighting up! That passion is unmistakable.",
      "The way you describe it \u2014 that's not just interest, that's love.",
      "People who are passionate like you are absolutely magnetic.",
    ],
  },
];

const goodAtQuestions: QuestionNode[] = [
  {
    id: 'goodat_opener_1',
    dimension: 'goodAt',
    depth: 0,
    text: "Now let's explore your gifts. What do people come to you for help with? What do friends, family, or colleagues recognize as your superpower?",
    keywords: [],
    acknowledgments: [
      "That's a real gift you have there. Not everyone can do that!",
      "Wow, that's impressive. And the fact that others see it too means it's genuinely powerful.",
      "Having others recognize that in you is really meaningful.",
    ],
  },
  {
    id: 'goodat_followup_1',
    dimension: 'goodAt',
    depth: 1,
    text: "Think about a time you accomplished something you're really proud of. It doesn't have to be grand \u2014 it could be quiet and personal. What skills did you use?",
    keywords: [],
    acknowledgments: [
      "You should be incredibly proud of that. Those skills are deeply valuable.",
      "That accomplishment says a lot about your character and abilities.",
      "The skills you described there are truly special \u2014 they're part of your unique blueprint.",
    ],
  },
  {
    id: 'goodat_followup_2',
    dimension: 'goodAt',
    depth: 1,
    text: "What tasks or activities feel almost effortless to you, but you notice others struggle with? Sometimes our biggest strengths feel so natural we overlook them.",
    keywords: [],
    acknowledgments: [
      "See? That's exactly the kind of blind spot I'm talking about. That IS a strength!",
      "The fact that it feels easy to you is exactly what makes it a superpower.",
      "You might take it for granted, but that ability is genuinely remarkable.",
    ],
  },
  {
    id: 'goodat_deep_1',
    dimension: 'goodAt',
    depth: 2,
    text: "If you had to teach someone something and you knew you'd be an amazing teacher at it, what would that subject or skill be?",
    keywords: [],
    acknowledgments: [
      "You'd be an incredible teacher for that. Your depth of knowledge really shows.",
      "I can tell you have a genuine mastery there. The world needs people like you sharing that knowledge.",
      "Teaching something reveals true understanding \u2014 and you clearly have it.",
    ],
  },
  {
    id: 'goodat_deep_2',
    dimension: 'goodAt',
    depth: 2,
    text: "What kinds of problems do you naturally enjoy solving? Whether it's fixing things, mediating conflicts, organizing chaos, or thinking through puzzles...",
    keywords: [],
    acknowledgments: [
      "That problem-solving style is really distinctive and valuable.",
      "The way you approach problems says so much about how your mind works \u2014 and it's fascinating.",
      "Being drawn to solving those kinds of problems is a real indicator of your natural talent.",
    ],
  },
];

const worldNeedsQuestions: QuestionNode[] = [
  {
    id: 'world_opener_1',
    dimension: 'worldNeeds',
    depth: 0,
    text: "Let's talk about something deeper. When you look at the world around you, what breaks your heart? What problem or injustice makes you think 'someone needs to fix this'?",
    keywords: [],
    acknowledgments: [
      "The fact that this moves you so deeply shows incredible empathy and awareness.",
      "Your compassion is palpable. The world needs more people who feel this way.",
      "That's a cause worth caring about, and your passion for it is clear.",
    ],
  },
  {
    id: 'world_followup_1',
    dimension: 'worldNeeds',
    depth: 1,
    text: "If you could wave a magic wand and fix one thing in the world, what would it be and why does that particular issue call to you?",
    keywords: [],
    acknowledgments: [
      "That's a beautiful choice. Your 'why' behind it is what makes you the right person to care about it.",
      "I'm moved by how deeply you've thought about this. That kind of conviction changes the world.",
      "The personal connection you have to this cause is what gives it power.",
    ],
  },
  {
    id: 'world_followup_2',
    dimension: 'worldNeeds',
    depth: 1,
    text: "Who do you most want to help? Is there a specific group of people, community, or cause that you feel drawn to serve?",
    keywords: [],
    acknowledgments: [
      "Your dedication to those people is truly inspiring.",
      "Having a clear sense of who you want to serve is powerful \u2014 it focuses your impact.",
      "The connection you feel to this group shows real empathy and purpose.",
    ],
  },
  {
    id: 'world_deep_1',
    dimension: 'worldNeeds',
    depth: 2,
    text: "Think about the legacy you want to leave behind. When people remember you, what do you want them to say about the impact you made?",
    keywords: [],
    acknowledgments: [
      "That's a legacy worth building. It tells me exactly what kind of human you are.",
      "Your vision for your impact is both ambitious and deeply compassionate.",
      "People who think about legacy are the ones who actually create lasting change.",
    ],
  },
  {
    id: 'world_deep_2',
    dimension: 'worldNeeds',
    depth: 2,
    text: "What changes in society, technology, or the environment do you believe are most urgently needed? What role could someone like you play?",
    keywords: [],
    acknowledgments: [
      "You see the big picture so clearly. And the fact that you see a role for yourself in it is empowering.",
      "Your awareness of these urgent needs combined with your desire to contribute is exactly what creates change-makers.",
      "That's a really thoughtful perspective. You'd be a powerful force for that kind of change.",
    ],
  },
];

const paidForQuestions: QuestionNode[] = [
  {
    id: 'paid_opener_1',
    dimension: 'paidFor',
    depth: 0,
    text: "Now let's get practical \u2014 but in a good way! What skills or services do you currently provide (or could provide) that people would happily pay for?",
    keywords: [],
    acknowledgments: [
      "That's absolutely marketable! There's real demand for what you described.",
      "You've got something valuable there. People definitely need that.",
      "That's a solid foundation to build on financially.",
    ],
  },
  {
    id: 'paid_followup_1',
    dimension: 'paidFor',
    depth: 1,
    text: "Think about the work you've done that felt most rewarding AND was valued by others (clients, employers, audiences). What was that work?",
    keywords: [],
    acknowledgments: [
      "When meaningful work meets external validation \u2014 that's the sweet spot you just described.",
      "That alignment between personal fulfillment and market value is incredibly powerful.",
      "That's exactly the kind of work that sustains a purposeful career.",
    ],
  },
  {
    id: 'paid_followup_2',
    dimension: 'paidFor',
    depth: 1,
    text: "What industries or fields interest you from a career perspective? Where do you see yourself creating the most value?",
    keywords: [],
    acknowledgments: [
      "Great choices. Those fields would be lucky to have your unique combination of skills.",
      "You've clearly got a good read on where your value would be appreciated.",
      "There's so much opportunity in those areas for someone with your qualities.",
    ],
  },
  {
    id: 'paid_deep_1',
    dimension: 'paidFor',
    depth: 2,
    text: "If you could create your ideal job description \u2014 the perfect role that combines earning well with doing meaningful work \u2014 what would it look like?",
    keywords: [],
    acknowledgments: [
      "That job description is incredibly telling. It perfectly bridges your purpose and pragmatism.",
      "I love how specific that is. A clear vision like that is halfway to making it real.",
      "That role absolutely exists or could be created. Your clarity about it is a strength.",
    ],
  },
  {
    id: 'paid_deep_2',
    dimension: 'paidFor',
    depth: 2,
    text: "What unique combination of skills, experiences, and perspectives do you bring that would be hard for someone else to replicate?",
    keywords: [],
    acknowledgments: [
      "That combination IS your competitive advantage. Nobody else has exactly that mix.",
      "You just described what makes you irreplaceable. That's incredibly powerful.",
      "The intersection of those qualities is genuinely rare and valuable.",
    ],
  },
];

export const questionBank: Record<Dimension, QuestionNode[]> = {
  love: loveQuestions,
  goodAt: goodAtQuestions,
  worldNeeds: worldNeedsQuestions,
  paidFor: paidForQuestions,
};

export const shortResponsePrompts = [
  "I'd love to hear more about that. Could you paint me a fuller picture?",
  "That's interesting! Can you tell me a bit more? I want to really understand what you mean.",
  "I appreciate that. Could you elaborate a little? Even small details help me understand you better.",
  "Don't hold back \u2014 I'm genuinely curious! What else comes to mind?",
  "I sense there's more to that story. Would you share a little more with me?",
];

export const greetingMessages = [
  "Welcome! I'm here to help you discover your Ikigai \u2014 the beautiful Japanese concept for finding your reason for being, at the intersection of what you love, what you're good at, what the world needs, and what you can be paid for.",
  "I'll ask you a few thoughtful questions and together we'll uncover your unique purpose. There are no right or wrong answers \u2014 just honest ones. What's your name?",
];

export const nameAcknowledgments = [
  "What a lovely name, {name}! Let's begin this journey together.",
  "Great to meet you, {name}! I'm excited to explore your Ikigai with you.",
  "Welcome, {name}! I can already tell this is going to be a meaningful conversation.",
];
