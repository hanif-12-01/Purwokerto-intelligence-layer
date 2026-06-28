import { Eye, FileCheck2, ShieldCheck, TimerReset } from "lucide-react";
import { mockCompletionReports } from "../data/mockCompletionReports";
import { purwokertoDistricts } from "../data/purwokertoDistricts";
import { SectionHeader } from "../components/ui/SectionHeader";

export function TransparencyPage() {
  const validated = mockCompletionReports.filter((report) => report.status === "Validated").length;
  const pending = mockCompletionReports.length - validated;
  const avgCompletion = Math.round(
    purwokertoDistricts.reduce((total, district) => total + district.resolutionAccountabilityIndex, 0) / purwokertoDistricts.length,
  );
  const statusSummary = ["Submitted", "Under Review", "Needs Revision", "Validated"].map((status) => ({
    status,
    count: mockCompletionReports.filter((report) => report.status === status).length,
  }));

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-amber-100/90 bg-white/80 p-6 shadow-sm shadow-amber-900/5 backdrop-blur sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800 ring-1 ring-emerald-100">
          <Eye className="h-4 w-4" /> Public Transparency Page
        </div>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Aggregated simulated follow-up overview</h1>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">
          This page shows safe public summaries only: aggregated simulated data, no personal data, and no raw citizen reports.
        </p>
      </section>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Simulated Validated Reports", value: validated, icon: ShieldCheck, tone: "text-emerald-700 bg-emerald-50 border-emerald-100" },
          { label: "Pending Reviews", value: pending, icon: TimerReset, tone: "text-amber-700 bg-amber-50 border-amber-100" },
          { label: "Average Completion Rate", value: `${avgCompletion}%`, icon: FileCheck2, tone: "text-sky-700 bg-sky-50 border-sky-100" },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-3xl border border-stone-200 bg-white/85 p-5 shadow-sm">
              <div className={`mb-4 inline-flex rounded-2xl border p-3 ${card.tone}`}><Icon className="h-5 w-5" /></div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{card.label}</p>
              <p className="mt-1 text-3xl font-black text-slate-950">{card.value}</p>
            </div>
          );
        })}
      </div>
      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-stone-200 bg-white/85 p-5 shadow-sm">
          <SectionHeader title="Follow-up status summary" description="Counts are aggregated from prototype completion records." />
          <div className="mt-5 space-y-3">
            {statusSummary.map((item) => (
              <div key={item.status} className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 p-4">
                <span className="font-bold text-slate-700">{item.status}</span>
                <span className="text-xl font-black text-slate-950">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-5 shadow-sm">
          <SectionHeader title="Safe public summary" description="Purwokerto Intelligence Layer publishes only aggregate prototype insights for portfolio learning." />
          <p className="mt-5 leading-7 text-slate-700">
            Simulated follow-up data suggests that several issues still need review before validation, especially records connected to mobility, waste management, public service access, and local drainage/flood review. No personal data or raw citizen reports are displayed.
          </p>
          <p className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-900">
            Clear simulated-data disclaimer: this page uses mock data only and is not an official government transparency system.
          </p>
        </div>
      </section>
    </div>
  );
}
