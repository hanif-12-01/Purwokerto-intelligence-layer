import { MessageSquareText } from "lucide-react";
import { purwokertoDistricts } from "../../data/purwokertoDistricts";
import { mockFeedback } from "../../data/mockFeedback";
import { SectionHeader } from "../ui/SectionHeader";

const categoryStyles: Record<string, string> = {
  Complaint: "border-red-200 bg-red-50 text-red-800",
  Criticism: "border-orange-200 bg-orange-50 text-orange-800",
  Suggestion: "border-sky-200 bg-sky-50 text-sky-800",
  Appreciation: "border-emerald-200 bg-emerald-50 text-emerald-800",
};

export function FeedbackIntelligence() {
  const districtName = (districtId: string) =>
    purwokertoDistricts.find((district) => district.id === districtId)?.name ?? "Purwokerto region";

  return (
    <section className="space-y-5">
      <SectionHeader
        eyebrow="Citizen Feedback Intelligence"
        title="Mock feedback classification"
        description="Simulated reports are grouped into complaint, criticism, suggestion, and appreciation categories for transparent review practice."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {mockFeedback.map((item) => (
          <article key={item.id} className="rounded-3xl border border-stone-200 bg-white/85 p-5 shadow-sm shadow-amber-900/5 backdrop-blur">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700 ring-1 ring-emerald-100">
                  <MessageSquareText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-950">{districtName(item.districtId)}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{item.message}</p>
                </div>
              </div>
              <span className={`w-fit rounded-full border px-3 py-1 text-xs font-bold ${categoryStyles[item.category]}`}>{item.category}</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-3">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Urgency</p>
                <p className="mt-1 font-bold text-slate-800">{item.urgency}</p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-3">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Validation</p>
                <p className="mt-1 font-bold text-slate-800">Draft classification. Needs human validation.</p>
              </div>
            </div>
            <div className="mt-3 rounded-2xl border border-amber-100 bg-amber-50/70 p-3">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">Simulated Recommended Agency/Action</p>
              <p className="mt-1 text-sm leading-6 text-amber-950">{item.recommendedAction}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
