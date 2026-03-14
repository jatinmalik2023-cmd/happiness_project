import { useState, useCallback, useRef } from 'react';
import { ChatState, ChatMessage, DIMENSION_ORDER } from '../types/chat';
import { createInitialState, getGreetingMessages, processUserInput } from '../engine/chatStateMachine';

interface ChatEngine {
  messages: ChatMessage[];
  isTyping: boolean;
  isComplete: boolean;
  state: ChatState;
  progress: number;
  sendMessage: (text: string) => void;
  startChat: () => void;
}

export function useChatEngine(): ChatEngine {
  const [state, setState] = useState<ChatState>(createInitialState());
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messageQueueRef = useRef<ChatMessage[]>([]);
  const processingRef = useRef(false);

  const displayMessagesSequentially = useCallback((botMessages: ChatMessage[]) => {
    messageQueueRef.current = [...messageQueueRef.current, ...botMessages];

    if (processingRef.current) return;
    processingRef.current = true;

    const processNext = () => {
      if (messageQueueRef.current.length === 0) {
        processingRef.current = false;
        setIsTyping(false);
        return;
      }

      setIsTyping(true);
      const msg = messageQueueRef.current.shift()!;
      const delay = Math.min(600 + msg.text.length * 12, 2500);

      setTimeout(() => {
        setMessages(prev => [...prev, msg]);
        setIsTyping(false);

        if (messageQueueRef.current.length > 0) {
          setTimeout(processNext, 300);
        } else {
          processingRef.current = false;
        }
      }, delay);
    };

    processNext();
  }, []);

  const startChat = useCallback(() => {
    const greetings = getGreetingMessages();
    displayMessagesSequentially(greetings);
  }, [displayMessagesSequentially]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim() || isTyping) return;

    const { newState, botMessages } = processUserInput(state, text);
    setState(newState);

    // Add user message immediately
    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: Date.now(),
      dimension: state.currentPhase !== 'greeting' ? state.currentDimension : undefined,
    };
    setMessages(prev => [...prev, userMsg]);

    // Queue bot responses
    displayMessagesSequentially(botMessages);
  }, [state, isTyping, displayMessagesSequentially]);

  // Calculate progress
  const completedDims = state.dimensionsCompleted.length;
  const currentDimProgress = state.questionDepth / 3;
  const totalDims = DIMENSION_ORDER.length;
  const progress = state.isComplete
    ? 100
    : Math.round(((completedDims + currentDimProgress) / totalDims) * 100);

  return {
    messages,
    isTyping,
    isComplete: state.isComplete,
    state,
    progress,
    sendMessage,
    startChat,
  };
}
