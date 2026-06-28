import React from "react";

export const MapLegend: React.FC = () => {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm space-y-3">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Legenda Peta</h4>
      
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-red-500 ring-2 ring-red-100" />
          <span className="text-xs font-semibold text-slate-700">{"Prioritas Kritis (Skor >= 85)"}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-amber-500 ring-2 ring-amber-100" />
          <span className="text-xs font-semibold text-slate-700">{"Prioritas Tinggi (Skor >= 70)"}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-blue-500 ring-2 ring-blue-100" />
          <span className="text-xs font-semibold text-slate-700">{"Prioritas Sedang (Skor >= 50)"}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-emerald-100" />
          <span className="text-xs font-semibold text-slate-700">{"Prioritas Rendah (Skor < 50)"}</span>
        </div>
      </div>

      <div className="border-t border-stone-100 pt-2.5">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Status tingkat keyakinan:</span>
          <span className="font-bold text-slate-700">Lemah / Sedang / Kuat</span>
        </div>
      </div>
    </div>
  );
};
