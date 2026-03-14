import { useRef } from 'react';
import { IkigaiResult } from '../../types/analysis';
import IkigaiDiagram from '../Diagram/IkigaiDiagram';
import ExecutiveSummary from './ExecutiveSummary';
import DimensionCard from './DimensionCard';
import IntersectionAnalysis from './IntersectionAnalysis';
import CentralIkigai from './CentralIkigai';
import StrengthsProfile from './StrengthsProfile';
import CareerPaths from './CareerPaths';
import GrowthAreas from './GrowthAreas';
import Recommendations from './Recommendations';
import PdfExportButton from './PdfExportButton';
import './ReportPage.css';

interface Props {
  result: IkigaiResult;
  userName: string;
}

export default function ReportPage({ result, userName }: Props) {
  const reportRef = useRef<HTMLDivElement>(null);

  return (
    <div className="report-page">
      <div className="report-page__actions">
        <PdfExportButton targetRef={reportRef} userName={userName} />
      </div>

      <div className="report" ref={reportRef} id="ikigai-report">
        <header className="report__header">
          <div className="report__header-badge">Ikigai Report</div>
          <h1 className="report__title">
            {userName ? `${userName}'s` : 'Your'} Ikigai Discovery
          </h1>
          <p className="report__date">
            Generated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </header>

        <section className="report__section report__section--diagram">
          <IkigaiDiagram result={result} />
        </section>

        <section className="report__section">
          <ExecutiveSummary summary={result.summary} userName={userName} />
        </section>

        <section className="report__section">
          <h2 className="report__section-title">Your Four Dimensions</h2>
          <div className="report__dimensions-grid">
            <DimensionCard
              dimension="love"
              themes={result.dimensions.love}
              color="var(--accent-love)"
              gradient="var(--gradient-love)"
            />
            <DimensionCard
              dimension="goodAt"
              themes={result.dimensions.goodAt}
              color="var(--accent-goodat)"
              gradient="var(--gradient-goodat)"
            />
            <DimensionCard
              dimension="worldNeeds"
              themes={result.dimensions.worldNeeds}
              color="var(--accent-world)"
              gradient="var(--gradient-world)"
            />
            <DimensionCard
              dimension="paidFor"
              themes={result.dimensions.paidFor}
              color="var(--accent-paid)"
              gradient="var(--gradient-paid)"
            />
          </div>
        </section>

        <section className="report__section">
          <h2 className="report__section-title">Where Your Dimensions Intersect</h2>
          <IntersectionAnalysis intersections={result.intersections} />
        </section>

        <section className="report__section">
          <CentralIkigai ikigai={result.centralIkigai} userName={userName} />
        </section>

        <section className="report__section">
          <h2 className="report__section-title">Your Strengths Profile</h2>
          <StrengthsProfile strengths={result.strengths} />
        </section>

        {result.careerPaths.length > 0 && (
          <section className="report__section">
            <h2 className="report__section-title">Suggested Career Directions</h2>
            <CareerPaths careers={result.careerPaths} />
          </section>
        )}

        {result.growthAreas.length > 0 && (
          <section className="report__section">
            <h2 className="report__section-title">Growth Opportunities</h2>
            <GrowthAreas areas={result.growthAreas} />
          </section>
        )}

        <section className="report__section">
          <h2 className="report__section-title">{userName ? `${userName}'s Action Plan` : 'Your Action Plan'}</h2>
          <Recommendations recommendations={result.recommendations} />
        </section>

        <footer className="report__footer">
          {userName && <p className="report__footer-personal">This report was crafted specifically for {userName}.</p>}
          <p>Your Ikigai is a journey, not a destination. Revisit this report as you grow and evolve.</p>
          <p className="report__footer-brand">Generated with Ikigai Discovery</p>
        </footer>
      </div>
    </div>
  );
}
