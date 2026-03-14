export type Dimension = 'love' | 'goodAt' | 'worldNeeds' | 'paidFor';

export type ChatPhase = 'greeting' | 'exploring' | 'deepening' | 'transitioning' | 'complete';

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: number;
  dimension?: Dimension;
}

export interface ChatState {
  currentDimension: Dimension;
  currentPhase: ChatPhase;
  questionDepth: number;
  dimensionsCompleted: Dimension[];
  responses: Record<Dimension, string[]>;
  messageHistory: ChatMessage[];
  currentQuestionIndex: number;
  isComplete: boolean;
  userName: string;
}

export interface QuestionNode {
  id: string;
  dimension: Dimension;
  depth: number;
  text: string;
  keywords: string[];
  followUpIndex?: number;
  acknowledgments: string[];
}

export const DIMENSION_ORDER: Dimension[] = ['love', 'goodAt', 'worldNeeds', 'paidFor'];

export const DIMENSION_LABELS: Record<Dimension, string> = {
  love: 'What You Love',
  goodAt: 'What You\'re Good At',
  worldNeeds: 'What The World Needs',
  paidFor: 'What You Can Be Paid For',
};

export const DIMENSION_ICONS: Record<Dimension, string> = {
  love: '\u2764\uFE0F',
  goodAt: '\u2B50',
  worldNeeds: '\uD83C\uDF0D',
  paidFor: '\uD83D\uDCB0',
};
