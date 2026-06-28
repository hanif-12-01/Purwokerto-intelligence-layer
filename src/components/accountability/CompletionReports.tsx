import { ClipboardCheck } from "lucide-react";
import { purwokertoDistricts } from "../../data/purwokertoDistricts";
import { mockCompletionReports } from "../../data/mockCompletionReports";
import { SectionHeader } from "../ui/SectionHeader";

const statusStyles: Record<string, string> = {
  Submitted: "border-sky-200 bg-sky-50 text-sky-800",
  "Under Review": "border-amber-200 bg-amber-50 text-amber-800",
  "Needs Revision": "border-orange-200 bg-orange-50 text-orange-800",
  Validated: "border-emerald-200 bg-emerald-50 text-emerald-800",
};

export function CompletionReports() {
  const districtName = (districtId: string) =>
    purwokertoDistricts.find((district) => district.id === districtId)?.name ?? "Purwokerto region";

  return (
    <section className="space-y-5">
      <SectionHeader
        eyebrow="Resolution Accountability Center"
        title="Completion Report cards"
        description="Prototype follow-up records help explain what was drafted, reviewed, revised, or validated in the simulated workflow."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {mockCompletionReports.map((report) => (
          <article key={report.id} className="rounded-3xl border border-stone-200 bg-white/85 p-5 shadow-sm shadow-amber-900/5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-amber-50 p-3 text-amber-700 ring-1 ring-amber-100">
                  <ClipboardCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-950">{districtName(report.districtId)}</h3>
                  <p className="text-sm text-slate-500">Report ID {report.id}</p>
                </div>
              </div>
              <span className={`w-fit rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[report.status]}`}>{report.status}</span>
            </div>
            <div className="mt-5 grid gap-3">
              {[
                ["Action Taken", report.actionTaken],
                ["Completion Time", report.completionTime],
                ["Field Constraints", report.fieldConstraints],
                ["Public Summary", report.publicSummary],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-stone-200 bg-stone-50/80 p-3">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{label}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">{value}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
      <p className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-900">
        Completion Report is a prototype record and not a legal document.
      </p>
    </section>
  );
}
