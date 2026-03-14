import './AnalyzingScreen.css';

export default function AnalyzingScreen() {
  return (
    <div className="analyzing">
      <div className="analyzing__container">
        <div className="analyzing__circles">
          <div className="analyzing__circle analyzing__circle--1" />
          <div className="analyzing__circle analyzing__circle--2" />
          <div className="analyzing__circle analyzing__circle--3" />
          <div className="analyzing__circle analyzing__circle--4" />
        </div>

        <h2 className="analyzing__title">Discovering Your Ikigai</h2>

        <div className="analyzing__steps">
          <div className="analyzing__step analyzing__step--1">
            Analyzing your passions...
          </div>
          <div className="analyzing__step analyzing__step--2">
            Mapping your strengths...
          </div>
          <div className="analyzing__step analyzing__step--3">
            Finding intersections...
          </div>
          <div className="analyzing__step analyzing__step--4">
            Generating your report...
          </div>
        </div>
      </div>
    </div>
  );
}
