import './TypingIndicator.css';

export default function TypingIndicator() {
  return (
    <div className="typing">
      <div className="typing__avatar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="9" cy="10" r="1" fill="currentColor"/>
          <circle cx="15" cy="10" r="1" fill="currentColor"/>
        </svg>
      </div>
      <div className="typing__bubble">
        <div className="typing__dot" />
        <div className="typing__dot" />
        <div className="typing__dot" />
      </div>
    </div>
  );
}
