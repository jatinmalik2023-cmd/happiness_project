import { GrowthArea } from '../../types/analysis';
import './GrowthAreas.css';

interface Props {
  areas: GrowthArea[];
}

export default function GrowthAreas({ areas }: Props) {
  return (
    <div className="growth-areas">
      {areas.map((area, i) => (
        <div key={i} className="growth-area">
          <div className="growth-area__icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L12 22M12 2L18 8M12 2L6 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="rotate(180 12 12)"/>
            </svg>
          </div>
          <div>
            <h4 className="growth-area__title">{area.area}</h4>
            <p className="growth-area__suggestion">{area.suggestion}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
