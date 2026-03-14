import { Recommendation } from '../../types/analysis';
import './Recommendations.css';

interface Props {
  recommendations: Recommendation[];
}

const priorityColors = {
  high: 'var(--accent-love)',
  medium: 'var(--accent-warm)',
  low: 'var(--accent-goodat)',
};

export default function Recommendations({ recommendations }: Props) {
  return (
    <div className="recs">
      {recommendations.map((rec, i) => (
        <div key={i} className="rec" style={{ '--rec-color': priorityColors[rec.priority] } as React.CSSProperties}>
          <div className="rec__number">{i + 1}</div>
          <div className="rec__content">
            <div className="rec__header">
              <h4 className="rec__title">{rec.title}</h4>
              <span className={`rec__priority rec__priority--${rec.priority}`}>
                {rec.priority}
              </span>
            </div>
            <p className="rec__desc">{rec.description}</p>
            {rec.specificActions && rec.specificActions.length > 0 && (
              <ul className="rec__actions">
                {rec.specificActions.map((action, j) => (
                  <li key={j} className="rec__action">{action}</li>
                ))}
              </ul>
            )}
            <span className="rec__category">{rec.category}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
