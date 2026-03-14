import './CentralIkigai.css';

interface Props {
  ikigai: {
    statement: string;
    themes: string[];
    confidence: number;
  };
  userName: string;
}

export default function CentralIkigai({ ikigai, userName }: Props) {
  return (
    <div className="central-ikigai">
      <div className="central-ikigai__glow" />
      <div className="central-ikigai__content">
        <div className="central-ikigai__badge">{userName ? `${userName}'s Core Ikigai` : 'Your Core Ikigai'}</div>
        <h2 className="central-ikigai__title">{userName ? `${userName}'s Reason for Being` : 'Your Reason for Being'}</h2>
        <blockquote className="central-ikigai__statement">
          "{ikigai.statement}"
        </blockquote>
        <div className="central-ikigai__themes">
          {ikigai.themes.map((theme, i) => (
            <span key={i} className="central-ikigai__theme">{theme}</span>
          ))}
        </div>
        <div className="central-ikigai__confidence">
          <span className="central-ikigai__confidence-label">Alignment Strength</span>
          <div className="central-ikigai__confidence-track">
            <div
              className="central-ikigai__confidence-fill"
              style={{ width: `${ikigai.confidence * 100}%` }}
            />
          </div>
          <span className="central-ikigai__confidence-value">{Math.round(ikigai.confidence * 100)}%</span>
        </div>
      </div>
    </div>
  );
}
