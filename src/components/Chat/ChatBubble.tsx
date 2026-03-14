import { ChatMessage } from '../../types/chat';
import './ChatBubble.css';

interface Props {
  message: ChatMessage;
  index: number;
}

export default function ChatBubble({ message, index }: Props) {
  const isBot = message.sender === 'bot';
  const delay = Math.min(index * 0.05, 0.3);

  return (
    <div
      className={`bubble ${isBot ? 'bubble--bot' : 'bubble--user'}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {isBot && (
        <div className="bubble__avatar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="9" cy="10" r="1" fill="currentColor"/>
            <circle cx="15" cy="10" r="1" fill="currentColor"/>
          </svg>
        </div>
      )}
      <div className={`bubble__content ${isBot ? 'bubble__content--bot' : 'bubble__content--user'}`}>
        <p>{message.text}</p>
      </div>
    </div>
  );
}
