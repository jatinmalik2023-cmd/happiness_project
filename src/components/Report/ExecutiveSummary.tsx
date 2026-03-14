import './ExecutiveSummary.css';

interface Props {
  summary: string;
  userName: string;
}

export default function ExecutiveSummary({ summary, userName }: Props) {
  return (
    <div className="exec-summary">
      <h2 className="exec-summary__title">Executive Summary</h2>
      <div className="exec-summary__content">
        {userName && <p><strong>{userName}</strong>, based on your responses, here is a snapshot of your Ikigai profile:</p>}
        {summary.split('\n\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
