export function RiskMeter({ value, risk }: { value: number; risk: string }) {
  // value 0-100
  const angle = (value / 100) * 180 - 90;
  const color =
    risk === "Normal" ? "var(--success)" :
    risk === "Low Risk" ? "#a3c853" :
    risk === "Medium Risk" ? "var(--warning)" :
    risk === "High Risk" ? "#ea7c4a" :
    "var(--destructive)";

  return (
    <div className="relative w-64 h-36 mx-auto">
      <svg viewBox="0 0 200 110" className="w-full h-full">
        <defs>
          <linearGradient id="rm" x1="0" x2="1">
            <stop offset="0%" stopColor="var(--success)" />
            <stop offset="50%" stopColor="var(--warning)" />
            <stop offset="100%" stopColor="var(--destructive)" />
          </linearGradient>
        </defs>
        <path d="M 15 100 A 85 85 0 0 1 185 100" stroke="url(#rm)" strokeWidth="14" fill="none" strokeLinecap="round" />
        <g transform={`translate(100 100) rotate(${angle})`}>
          <line x1="0" y1="0" x2="0" y2="-72" stroke={color} strokeWidth="3" strokeLinecap="round" />
          <circle r="6" fill={color} />
        </g>
      </svg>
      <div className="absolute inset-x-0 bottom-0 text-center">
        <div className="text-3xl font-bold gradient-text">{value}%</div>
        <div className="text-xs text-muted-foreground font-medium">AI Confidence</div>
      </div>
    </div>
  );
}
