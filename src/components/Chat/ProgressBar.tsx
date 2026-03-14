import './ProgressBar.css';

interface Props {
  progress: number;
}

export default function ProgressBar({ progress }: Props) {
  return (
    <div className="progress" title={`${progress}% complete`}>
      <div className="progress__track">
        <div className="progress__fill" style={{ width: `${progress}%` }} />
      </div>
      <span className="progress__label">{progress}%</span>
    </div>
  );
}
