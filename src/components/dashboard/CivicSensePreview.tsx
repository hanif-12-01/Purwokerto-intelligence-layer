import { Bot, Sparkles } from "lucide-react";
import { purwokertoDistricts } from "../../data/purwokertoDistricts";
import { calculatePriorityScore, getPriorityStatus } from "../../utils/scoring";

export function CivicSensePreview() {
  const ranked = [...purwokertoDistricts]
    .map((district) => ({ district, score: calculatePriorityScore(district) }))
    .sort((a, b) => b.score - a.score);
  const top = ranked[0];
  const status = getPriorityStatus(top.score);

  return (
    <section className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-white/90 via-emerald-50/80 to-amber-50/80 p-6 shadow-sm shadow-amber-900/5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
            <Bot className="h-4 w-4" /> CivicSense AI Draft
          </div>
          <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950">Rule-based assistant preview</h2>
          <p className="mt-3 leading-7 text-slate-700">
            Based on simulated scoring, {top.district.name} appears as the strongest review candidate with a priority score of {top.score} and {status} status. The draft note suggests checking mobility pressure, waste handling, service access, and emergency review indicators before any planning recommendation is made.
          </p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-6 text-amber-900">
          <Sparkles className="mb-2 h-5 w-5" />
          Draft analysis only. Requires OPD or human validation.
        </div>
      </div>
    </section>
  );
}
