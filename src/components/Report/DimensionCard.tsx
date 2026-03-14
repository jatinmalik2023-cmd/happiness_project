import { Theme } from '../../types/analysis';
import { Dimension, DIMENSION_LABELS, DIMENSION_ICONS } from '../../types/chat';
import { dimensionDescriptions } from '../../data/ikigaiDescriptions';
import './DimensionCard.css';

interface Props {
  dimension: Dimension;
  themes: Theme[];
  color: string;
  gradient: string;
}

export default function DimensionCard({ dimension, themes, color, gradient }: Props) {
  return (
    <div className="dim-card" style={{ '--dim-color': color, '--dim-gradient': gradient } as React.CSSProperties}>
      <div className="dim-card__header">
        <span className="dim-card__icon">{DIMENSION_ICONS[dimension]}</span>
        <h3 className="dim-card__title">{DIMENSION_LABELS[dimension]}</h3>
      </div>
      <p className="dim-card__desc">{dimensionDescriptions[dimension]}</p>
      <div className="dim-card__themes">
        <h4 className="dim-card__themes-title">Key Themes</h4>
        <div className="dim-card__tags">
          {themes.map((theme, i) => (
            <span key={i} className="dim-card__tag">
              {theme.label}
              <span className="dim-card__tag-bar" style={{ width: `${theme.confidence * 100}%` }} />
            </span>
          ))}
          {themes.length === 0 && (
            <span className="dim-card__no-themes">Explore this dimension further</span>
          )}
        </div>
      </div>
    </div>
  );
}
