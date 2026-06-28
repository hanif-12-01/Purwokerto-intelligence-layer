interface ProgressBarProps {
  value: number;
  colorClass?: string;
}

export function ProgressBar({ value, colorClass = "bg-emerald-600" }: ProgressBarProps) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-stone-100">
      <div className={`h-2 rounded-full ${colorClass}`} style={{ width: `${safeValue}%` }} />
    </div>
  );
}
