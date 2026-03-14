import { useEffect, useRef } from 'react';
import { ChatMessage } from '../../types/chat';
import ChatBubble from './ChatBubble';
import TypingIndicator from './TypingIndicator';
import UserInput from './UserInput';
import ProgressBar from './ProgressBar';
import './ChatInterface.css';

interface Props {
  messages: ChatMessage[];
  isTyping: boolean;
  isComplete: boolean;
  progress: number;
  onSend: (text: string) => void;
  onComplete: () => void;
}

export default function ChatInterface({ messages, isTyping, isComplete, progress, onSend, onComplete }: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isComplete && !isTyping) {
      const timer = setTimeout(onComplete, 2500);
      return () => clearTimeout(timer);
    }
  }, [isComplete, isTyping, onComplete]);

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__header-info">
          <div className="chat__avatar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="9" cy="10" r="1" fill="currentColor"/>
              <circle cx="15" cy="10" r="1" fill="currentColor"/>
            </svg>
          </div>
          <div>
            <h3 className="chat__title">Ikigai Guide</h3>
            <span className="chat__status">{isTyping ? 'Typing...' : 'Online'}</span>
          </div>
        </div>
        <ProgressBar progress={progress} />
      </div>

      <div className="chat__messages" ref={containerRef}>
        {messages.map((msg, i) => (
          <ChatBubble key={msg.id} message={msg} index={i} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {!isComplete && (
        <UserInput onSend={onSend} disabled={isTyping} />
      )}

      {isComplete && !isTyping && (
        <div className="chat__complete">
          <div className="chat__complete-text">Preparing your Ikigai analysis...</div>
          <div className="chat__complete-loader">
            <div className="chat__complete-dot" />
            <div className="chat__complete-dot" />
            <div className="chat__complete-dot" />
          </div>
        </div>
      )}
    </div>
  );
}
