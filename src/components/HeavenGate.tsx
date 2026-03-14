"use client";

interface HeavenGateProps {
  className?: string;
  size?: number;
}

export default function HeavenGate({ className = "", size = 80 }: HeavenGateProps) {
  const rays = 12;
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      width={size}
      height={size}
      aria-hidden
    >
      <g stroke="#caab8f" strokeOpacity="0.4" strokeWidth="1.5" fill="none">
        {Array.from({ length: rays }).map((_, i) => {
          const angle = (i / rays) * 360;
          const rad = (angle * Math.PI) / 180;
          const x1 = 50 + 15 * Math.cos(rad);
          const y1 = 50 + 15 * Math.sin(rad);
          const x2 = 50 + 45 * Math.cos(rad);
          const y2 = 50 + 45 * Math.sin(rad);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
          );
        })}
      </g>
      <circle cx="50" cy="50" r="12" fill="#caab8f" fillOpacity="0.2" />
    </svg>
  );
}
