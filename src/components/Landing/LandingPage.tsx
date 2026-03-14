import { useState } from 'react';
import './LandingPage.css';

interface Props {
  onStart: () => void;
}

export default function LandingPage({ onStart }: Props) {
  const [isExiting, setIsExiting] = useState(false);

  const handleStart = () => {
    setIsExiting(true);
    setTimeout(onStart, 600);
  };

  return (
    <div className={`landing ${isExiting ? 'landing--exiting' : ''}`}>
      <div className="landing__bg">
        <div className="landing__circle landing__circle--1" />
        <div className="landing__circle landing__circle--2" />
        <div className="landing__circle landing__circle--3" />
        <div className="landing__circle landing__circle--4" />
      </div>

      <div className="landing__content">
        <div className="landing__badge">Discover Your Purpose</div>
        <h1 className="landing__title">
          Find Your <span className="landing__highlight">Ikigai</span>
        </h1>
        <p className="landing__subtitle">
          Ikigai is a beautiful Japanese concept meaning <em>"a reason for being"</em>.
          It sits at the intersection of what you love, what you're good at,
          what the world needs, and what you can be paid for.
        </p>

        <div className="landing__dimensions">
          <div className="landing__dim landing__dim--love">
            <span className="landing__dim-icon">{'\u2764\uFE0F'}</span>
            <span>What You Love</span>
          </div>
          <div className="landing__dim landing__dim--good">
            <span className="landing__dim-icon">{'\u2B50'}</span>
            <span>What You're Good At</span>
          </div>
          <div className="landing__dim landing__dim--world">
            <span className="landing__dim-icon">{'\uD83C\uDF0D'}</span>
            <span>What The World Needs</span>
          </div>
          <div className="landing__dim landing__dim--paid">
            <span className="landing__dim-icon">{'\uD83D\uDCB0'}</span>
            <span>What You Can Be Paid For</span>
          </div>
        </div>

        <p className="landing__cta-text">
          Through a thoughtful conversation, I'll help you uncover your unique Ikigai
          and generate a comprehensive personal report.
        </p>

        <button className="landing__btn" onClick={handleStart}>
          <span>Begin Your Journey</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <p className="landing__note">
          Takes about 5-10 minutes. No data is stored or sent anywhere.
        </p>
      </div>
    </div>
  );
}
