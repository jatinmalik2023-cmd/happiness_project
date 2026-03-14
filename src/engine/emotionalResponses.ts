import { Dimension } from '../types/chat';

export const dimensionTransitions: Record<string, string[]> = {
  'love_to_goodAt': [
    "I love hearing about what makes your heart sing. Now I'm curious about another side of you \u2014 your talents and strengths...",
    "Those passions paint such a vivid picture of who you are. Let's shift gears a bit and explore what you're naturally brilliant at...",
    "Thank you for sharing that with such openness. Now, let's discover the superpowers you bring to the table...",
  ],
  'goodAt_to_worldNeeds': [
    "You clearly have some incredible gifts. Now let's look outward \u2014 I want to understand what pulls at your heartstrings when you look at the world...",
    "Your skills are truly impressive. Now, let's explore something deeper \u2014 your sense of purpose and the impact you want to make...",
    "What amazing talents you have! Now let's turn our gaze to the bigger picture \u2014 the change you want to see in the world...",
  ],
  'worldNeeds_to_paidFor': [
    "Your compassion and vision are truly inspiring. Now let's bring it together with the practical side \u2014 how you can sustain this purposeful life...",
    "That sense of purpose is powerful. For our final dimension, let's explore how your unique gifts can also create financial abundance...",
    "You clearly care deeply about making a difference. Let's now look at how you can do that while also building the life you deserve...",
  ],
};

export const completionMessages = [
  "Thank you so much for sharing all of this with me, {name}. I feel like I've gotten a real glimpse into who you are.",
  "You've given me such rich material to work with. Let me now put together your Ikigai portrait...",
  "I'm going to analyze everything you've shared and create a comprehensive picture of your unique Ikigai. This is going to be beautiful!",
];

export function getTransition(from: Dimension, to: Dimension): string {
  const key = `${from}_to_${to}`;
  const messages = dimensionTransitions[key];
  if (!messages) return "Let's move on to the next dimension of your Ikigai...";
  return messages[Math.floor(Math.random() * messages.length)];
}

export function getRandomAcknowledgment(acknowledgments: string[]): string {
  return acknowledgments[Math.floor(Math.random() * acknowledgments.length)];
}
