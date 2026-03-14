import { IntersectionResult } from '../../types/analysis';
import { intersectionDescriptions } from '../../data/ikigaiDescriptions';
import './IntersectionAnalysis.css';

interface Props {
  intersections: IntersectionResult[];
}

const typeColors: Record<string, string> = {
  passion: 'var(--accent-love)',
  mission: 'var(--accent-world)',
  vocation: 'var(--accent-goodat)',
  profession: 'var(--accent-paid)',
};

export default function IntersectionAnalysis({ intersections }: Props) {
  return (
    <div className="intersections">
      {intersections.map(inter => {
        const desc = intersectionDescriptions[inter.type];
        const color = typeColors[inter.type];

        return (
          <div key={inter.type} className="intersection" style={{ '--inter-color': color } as React.CSSProperties}>
            <div className="intersection__header">
              <h3 className="intersection__title">{desc.title}</h3>
              <div className="intersection__strength">
                <div className="intersection__strength-bar">
                  <div
                    className="intersection__strength-fill"
                    style={{ width: `${inter.strength * 100}%` }}
                  />
                </div>
                <span className="intersection__strength-label">
                  {inter.strength >= 0.7 ? 'Strong' : inter.strength >= 0.4 ? 'Moderate' : 'Emerging'}
                </span>
              </div>
            </div>
            <p className="intersection__subtitle">{desc.subtitle}</p>
            <p className="intersection__desc">{inter.description}</p>
            {inter.userEvidence && inter.userEvidence.length > 0 && (
              <div className="intersection__evidence">
                {inter.userEvidence.map((quote, i) => (
                  <span key={i} className="intersection__quote">"{quote}"</span>
                ))}
              </div>
            )}
            {inter.themes.length > 0 && (
              <div className="intersection__themes">
                {inter.themes.map((theme, i) => (
                  <span key={i} className="intersection__theme">{theme}</span>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
