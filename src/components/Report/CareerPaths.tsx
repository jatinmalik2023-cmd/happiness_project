import { CareerPath } from '../../types/analysis';
import './CareerPaths.css';

interface Props {
  careers: CareerPath[];
}

export default function CareerPaths({ careers }: Props) {
  return (
    <div className="careers">
      <p className="careers__intro">
        Based on the themes that emerged from our conversation, here are career directions that align with your Ikigai:
      </p>
      <div className="careers__grid">
        {careers.map((career, i) => (
          <div key={i} className="career-card">
            <div className="career-card__match">
              <div className="career-card__match-fill" style={{ width: `${career.matchScore * 100}%` }} />
              <span className="career-card__match-label">{Math.round(career.matchScore * 100)}% match</span>
            </div>
            <h4 className="career-card__title">{career.title}</h4>
            <p className="career-card__desc">{career.description}</p>
            {career.personalizedReason && (
              <p className="career-card__reason">{career.personalizedReason}</p>
            )}
            <div className="career-card__themes">
              {career.relatedThemes.map((theme, j) => (
                <span key={j} className="career-card__theme">{theme}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
