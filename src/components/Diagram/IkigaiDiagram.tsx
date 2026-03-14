import { useState, useEffect } from 'react';
import { IkigaiResult } from '../../types/analysis';
import './IkigaiDiagram.css';

interface Props {
  result: IkigaiResult;
  compact?: boolean;
}

export default function IkigaiDiagram({ result, compact = false }: Props) {
  const [animate, setAnimate] = useState(false);
  const [showLabels, setShowLabels] = useState(false);
  const [showThemes, setShowThemes] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setAnimate(true), 100);
    const t2 = setTimeout(() => setShowLabels(true), 1200);
    const t3 = setTimeout(() => setShowThemes(true), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const size = compact ? 380 : 500;
  const cx = size / 2;
  const cy = size / 2;
  const r = compact ? 100 : 140;
  const offset = compact ? 50 : 70;

  const circles = [
    { id: 'love', label: 'What You\nLove', x: cx, y: cy - offset, color1: '#FF6B6B', color2: '#FFE66D', delay: 0 },
    { id: 'goodAt', label: 'What You\'re\nGood At', x: cx + offset, y: cy, color1: '#4ECDC4', color2: '#45B7D1', delay: 0.2 },
    { id: 'paidFor', label: 'What You Can\nBe Paid For', x: cx, y: cy + offset, color1: '#A18CD1', color2: '#FBC2EB', delay: 0.4 },
    { id: 'worldNeeds', label: 'What The\nWorld Needs', x: cx - offset, y: cy, color1: '#96E6A1', color2: '#88D8B0', delay: 0.6 },
  ];

  const intersections = [
    { label: 'Passion', x: cx + offset * 0.5, y: cy - offset * 0.5, type: 'passion' as const },
    { label: 'Mission', x: cx - offset * 0.5, y: cy - offset * 0.5, type: 'mission' as const },
    { label: 'Vocation', x: cx - offset * 0.5, y: cy + offset * 0.5, type: 'vocation' as const },
    { label: 'Profession', x: cx + offset * 0.5, y: cy + offset * 0.5, type: 'profession' as const },
  ];

  return (
    <div className={`ikigai-diagram ${compact ? 'ikigai-diagram--compact' : ''}`}>
      <svg viewBox={`0 0 ${size} ${size}`} className="ikigai-diagram__svg">
        <defs>
          {circles.map(c => (
            <radialGradient key={c.id} id={`grad-${c.id}`}>
              <stop offset="0%" stopColor={c.color1} stopOpacity="0.55" />
              <stop offset="100%" stopColor={c.color2} stopOpacity="0.30" />
            </radialGradient>
          ))}
          <radialGradient id="grad-center">
            <stop offset="0%" stopColor="#E17055" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FCB69F" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        {/* Main circles */}
        {circles.map(c => (
          <circle
            key={c.id}
            cx={c.x}
            cy={c.y}
            r={animate ? r : 0}
            fill={`url(#grad-${c.id})`}
            stroke={c.color1}
            strokeWidth="2"
            strokeOpacity="0.6"
            className="ikigai-diagram__circle"
            style={{
              transition: `r 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${c.delay}s`,
            }}
          />
        ))}

        {/* Center highlight */}
        <circle
          cx={cx}
          cy={cy}
          r={animate ? offset * 0.6 : 0}
          fill="url(#grad-center)"
          className="ikigai-diagram__center"
          style={{ transition: 'r 0.8s ease 1s' }}
        />

        {/* Circle labels */}
        {showLabels && circles.map(c => {
          const labelOffset = r * 0.75;
          const dx = c.x - cx;
          const dy = c.y - cy;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          const lx = c.x + (dx / len) * labelOffset;
          const ly = c.y + (dy / len) * labelOffset;

          return (
            <text
              key={`label-${c.id}`}
              x={lx}
              y={ly}
              textAnchor="middle"
              className="ikigai-diagram__label"
              fill={c.color1}
            >
              {c.label.split('\n').map((line, i) => (
                <tspan key={i} x={lx} dy={i === 0 ? 0 : 16}>{line}</tspan>
              ))}
            </text>
          );
        })}

        {/* Intersection labels */}
        {showLabels && intersections.map(inter => {
          const matchingIntersection = result.intersections.find(i => i.type === inter.type);
          const strength = matchingIntersection?.strength || 0.3;

          return (
            <g key={inter.type} className="ikigai-diagram__intersection">
              <text
                x={inter.x}
                y={inter.y}
                textAnchor="middle"
                className="ikigai-diagram__inter-label"
                opacity={0.5 + strength * 0.5}
              >
                {inter.label}
              </text>
            </g>
          );
        })}

        {/* Center Ikigai label */}
        {showLabels && (
          <text
            x={cx}
            y={cy}
            textAnchor="middle"
            className="ikigai-diagram__ikigai-label"
          >
            <tspan x={cx} dy="-6" fontSize={compact ? "12" : "16"} fontWeight="700">IKIGAI</tspan>
            <tspan x={cx} dy={compact ? "14" : "18"} fontSize={compact ? "8" : "10"} opacity="0.7">Your Reason for Being</tspan>
          </text>
        )}

        {/* Theme tags in diagram zones */}
        {showThemes && Object.entries(result.dimensions).map(([dim, themes]) => {
          const circle = circles.find(c => c.id === dim);
          if (!circle || themes.length === 0) return null;
          const theme = themes[0];
          const dx = circle.x - cx;
          const dy = circle.y - cy;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          const tx = cx + (dx / len) * (offset * 0.35);
          const ty = cy + (dy / len) * (offset * 0.35);

          return (
            <g key={dim} className="ikigai-diagram__theme bounce-in">
              <rect
                x={tx - 40}
                y={ty - 8}
                width="80"
                height="16"
                rx="8"
                fill={circle.color1}
                fillOpacity="0.3"
              />
              <text
                x={tx}
                y={ty + 4}
                textAnchor="middle"
                fontSize="7"
                fill={circle.color1}
                fontWeight="600"
              >
                {theme.label.length > 14 ? theme.label.slice(0, 14) + '...' : theme.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
