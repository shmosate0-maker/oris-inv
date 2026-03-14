"use client";

interface StarSymbolProps {
  className?: string;
  size?: number;
}

export default function StarSymbol({ className = "", size = 32 }: StarSymbolProps) {
  const points: [number, number][] = [];
  for (let i = 0; i < 5; i++) {
    const outer = 50;
    const inner = 22;
    const a1 = (i * 72 - 90) * (Math.PI / 180);
    const a2 = (i * 72 - 90 + 36) * (Math.PI / 180);
    points.push([50 + outer * Math.cos(a1), 50 + outer * Math.sin(a1)]);
    points.push([50 + inner * Math.cos(a2), 50 + inner * Math.sin(a2)]);
  }
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ") + " Z";
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      width={size}
      height={size}
      aria-hidden
    >
      <path
        d={d}
        fill="none"
        stroke="#caab8f"
        strokeOpacity="0.5"
        strokeWidth="2"
      />
    </svg>
  );
}
