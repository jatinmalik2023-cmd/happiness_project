import { Strength } from '../../types/analysis';
import './StrengthsProfile.css';

interface Props {
  strengths: Strength[];
}

export default function StrengthsProfile({ strengths }: Props) {
  const maxScore = Math.max(...strengths.map(s => s.score), 1);

  return (
    <div className="strengths">
      <div className="strengths__chart">
        {strengths.map((strength, i) => (
          <div key={i} className="strengths__bar-row">
            <div className="strengths__bar-label">{strength.name}</div>
            <div className="strengths__bar-track">
              <div
                className="strengths__bar-fill"
                style={{
                  width: `${(strength.score / maxScore) * 100}%`,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            </div>
            <div className="strengths__bar-value">{strength.score}%</div>
          </div>
        ))}
      </div>
      <div className="strengths__descriptions">
        {strengths.slice(0, 3).map((strength, i) => (
          <div key={i} className="strengths__desc-card">
            <div className="strengths__desc-rank">#{i + 1}</div>
            <div>
              <h4 className="strengths__desc-name">{strength.name}</h4>
              <p className="strengths__desc-text">{strength.description}</p>
              {strength.evidence && strength.evidence.length > 0 && (
                <div className="strengths__evidence">
                  {strength.evidence.map((phrase, j) => (
                    <span key={j} className="strengths__evidence-tag">{phrase}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
