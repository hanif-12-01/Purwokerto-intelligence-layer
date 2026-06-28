import React from "react";

interface MapMarkerProps {
  id: string;
  name: string;
  x: string; // e.g. "50%"
  y: string; // e.g. "25%"
  score: number;
  status: "Low" | "Medium" | "High" | "Critical";
  isActive: boolean;
  onClick: () => void;
}

const statusColors = {
  Low: "bg-emerald-500 hover:bg-emerald-600 border-emerald-200 ring-emerald-100",
  Medium: "bg-blue-500 hover:bg-blue-600 border-blue-200 ring-blue-100",
  High: "bg-amber-500 hover:bg-amber-600 border-amber-200 ring-amber-100",
  Critical: "bg-red-500 hover:bg-red-600 border-red-200 ring-red-100",
};

export const MapMarker: React.FC<MapMarkerProps> = ({
  name,
  x,
  y,
  score,
  status,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      style={{ left: x, top: y }}
      className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group transition-all duration-200`}
    >
      <span className="relative flex h-8 w-8 items-center justify-center">
        {/* Glow or pulse if active */}
        {isActive && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-400 opacity-60" />
        )}
        
        {/* Marker body */}
        <span
          className={`relative flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-black text-white shadow-md ring-4 transition-all ${
            statusColors[status]
          } ${isActive ? "scale-125 ring-slate-800/25 border-slate-900" : "ring-white/80"}`}
        >
          {Math.round(score)}
        </span>
      </span>

      {/* Tooltip on hover */}
      <span className="absolute left-1/2 top-9 -translate-x-1/2 scale-0 rounded-lg bg-slate-950 px-2 py-1 text-[10px] font-bold text-white shadow-lg transition-all duration-150 group-hover:scale-100 whitespace-nowrap z-30">
        {name}: {score}
      </span>
    </button>
  );
};
