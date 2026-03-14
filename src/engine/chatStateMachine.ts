import { ChatState, ChatMessage, Dimension, DIMENSION_ORDER } from '../types/chat';
import { questionBank, shortResponsePrompts, greetingMessages, nameAcknowledgments } from './questionBank';
import { getTransition, getRandomAcknowledgment } from './emotionalResponses';
import { isShortResponse } from '../utils/textProcessing';

function createMessage(text: string, sender: 'bot' | 'user', dimension?: Dimension): ChatMessage {
  return {
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    sender,
    text,
    timestamp: Date.now(),
    dimension,
  };
}

export function createInitialState(): ChatState {
  return {
    currentDimension: 'love',
    currentPhase: 'greeting',
    questionDepth: 0,
    dimensionsCompleted: [],
    responses: { love: [], goodAt: [], worldNeeds: [], paidFor: [] },
    messageHistory: [],
    currentQuestionIndex: 0,
    isComplete: false,
    userName: '',
  };
}

export function getGreetingMessages(): ChatMessage[] {
  return greetingMessages.map(text => createMessage(text, 'bot'));
}

export function processUserInput(state: ChatState, userText: string): { newState: ChatState; botMessages: ChatMessage[] } {
  const newState = { ...state };
  const botMessages: ChatMessage[] = [];

  // Add user message
  const userMsg = createMessage(userText, 'user', state.currentPhase !== 'greeting' ? state.currentDimension : undefined);
  newState.messageHistory = [...state.messageHistory, userMsg];

  // Handle greeting phase (collecting name)
  if (state.currentPhase === 'greeting') {
    const name = userText.trim().split(/\s+/)[0].replace(/[^a-zA-Z]/g, '') || 'Friend';
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    newState.userName = capitalizedName;
    newState.currentPhase = 'exploring';

    const ackTemplate = nameAcknowledgments[Math.floor(Math.random() * nameAcknowledgments.length)];
    const ack = ackTemplate.replace('{name}', capitalizedName);
    botMessages.push(createMessage(ack, 'bot'));

    // First question of first dimension
    const firstQ = questionBank.love[0];
    botMessages.push(createMessage(firstQ.text, 'bot', 'love'));
    newState.currentQuestionIndex = 0;
    newState.questionDepth = 0;

    return { newState, botMessages };
  }

  // Store response
  newState.responses = {
    ...state.responses,
    [state.currentDimension]: [...state.responses[state.currentDimension], userText],
  };

  // Check for short responses
  if (isShortResponse(userText) && state.questionDepth < 1) {
    const prompt = shortResponsePrompts[Math.floor(Math.random() * shortResponsePrompts.length)];
    botMessages.push(createMessage(prompt, 'bot', state.currentDimension));
    return { newState, botMessages };
  }

  const currentDimensionQuestions = questionBank[state.currentDimension];
  const currentQuestion = currentDimensionQuestions[state.currentQuestionIndex];

  // Acknowledge the response
  if (currentQuestion) {
    const ack = getRandomAcknowledgment(currentQuestion.acknowledgments);
    botMessages.push(createMessage(ack, 'bot', state.currentDimension));
  }

  // Determine next step
  const nextDepth = state.questionDepth + 1;
  const nextQuestionIndex = state.currentQuestionIndex + 1;

  // Check if we have more questions for this dimension (ask 3 questions per dimension)
  if (nextQuestionIndex < currentDimensionQuestions.length && nextDepth <= 1) {
    newState.currentQuestionIndex = nextQuestionIndex;
    newState.questionDepth = nextDepth;
    const nextQ = currentDimensionQuestions[nextQuestionIndex];
    botMessages.push(createMessage(nextQ.text, 'bot', state.currentDimension));
    return { newState, botMessages };
  }

  // Dimension complete - move to next
  const currentDimIndex = DIMENSION_ORDER.indexOf(state.currentDimension);
  newState.dimensionsCompleted = [...state.dimensionsCompleted, state.currentDimension];

  if (currentDimIndex < DIMENSION_ORDER.length - 1) {
    const nextDimension = DIMENSION_ORDER[currentDimIndex + 1];
    const transition = getTransition(state.currentDimension, nextDimension);
    botMessages.push(createMessage(transition, 'bot'));

    newState.currentDimension = nextDimension;
    newState.currentPhase = 'exploring';
    newState.questionDepth = 0;
    newState.currentQuestionIndex = 0;

    const firstQ = questionBank[nextDimension][0];
    botMessages.push(createMessage(firstQ.text, 'bot', nextDimension));
  } else {
    // All dimensions complete
    newState.isComplete = true;
    newState.currentPhase = 'complete';
    newState.dimensionsCompleted = [...newState.dimensionsCompleted];

    const name = state.userName || 'Friend';
    const completionMsgs = [
      `Thank you so much for sharing all of this with me, ${name}. I feel like I've gotten a real glimpse into who you are.`,
      "You've given me such rich and beautiful material to work with. Let me now weave together your Ikigai portrait...",
    ];
    completionMsgs.forEach(text => botMessages.push(createMessage(text, 'bot')));
  }

  return { newState, botMessages };
}
