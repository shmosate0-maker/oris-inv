"use client";

interface PyramidSymbolProps {
  className?: string;
  size?: number;
}

export default function PyramidSymbol({ className = "", size = 48 }: PyramidSymbolProps) {
  return (
    <svg
      viewBox="0 0 60 50"
      className={className}
      width={size}
      height={size * (50 / 60)}
      aria-hidden
    >
      <path
        d="M30 5 L55 45 L5 45 Z"
        fill="none"
        stroke="#6f874b"
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
      <path
        d="M30 5 L30 45"
        fill="none"
        stroke="#caab8f"
        strokeOpacity="0.4"
        strokeWidth="1"
      />
    </svg>
  );
}
