import React, { useState, useMemo } from "react";
import { MessageSquareText, Filter, CheckCircle2, Bot } from "lucide-react";
import { purwokertoDistricts } from "../data/purwokertoDistricts";
import { mockFeedback } from "../data/mockFeedback";

const categoryStyles: Record<string, string> = {
  Complaint: "border-red-200 bg-red-55 text-red-800",
  Criticism: "border-orange-200 bg-orange-55 text-orange-850",
  Suggestion: "border-sky-200 bg-sky-55 text-sky-850",
  Appreciation: "border-emerald-200 bg-emerald-55 text-emerald-800",
};

const urgencyStyles: Record<string, string> = {
  Critical: "text-red-750 font-black bg-red-50 ring-1 ring-red-200",
  High: "text-orange-750 font-extrabold bg-orange-50 ring-1 ring-orange-200",
  Medium: "text-sky-750 font-bold bg-sky-50 ring-1 ring-sky-200",
  Low: "text-slate-650 font-semibold bg-stone-50 ring-1 ring-stone-150",
};

export const FeedbackPage: React.FC = () => {
  const [districtFilter, setDistrictFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const districtName = (districtId: string) =>
    purwokertoDistricts.find((district) => district.id === districtId)?.name ?? "Purwokerto region";

  // Filter feedback
  const filteredFeedback = useMemo(() => {
    return mockFeedback.filter((item) => {
      const matchDistrict = districtFilter === "all" || item.districtId === districtFilter;
      const matchCategory = categoryFilter === "all" || item.category === categoryFilter;
      return matchDistrict && matchCategory;
    });
  }, [districtFilter, categoryFilter]);

  return (
    <div className="space-y-6">
      {/* Header section */}
      <section className="rounded-3xl border border-stone-200 bg-white/70 p-6 shadow-sm backdrop-blur">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-800 shadow-sm">
            <MessageSquareText className="h-3.5 w-3.5" /> Feedback Analytics
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Citizen Feedback Intelligence
          </h1>
          <p className="text-sm text-slate-600">
            Simulated public feedback categorized and routed using rule-based classification models.
          </p>
        </div>
      </section>

      {/* Interactive Filters */}
      <section className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm font-extrabold text-slate-800">
          <Filter className="h-4 w-4 text-emerald-800" />
          <span>Filter Records</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* District select */}
          <div className="space-y-1">
            <label htmlFor="district-select" className="sr-only">Filter by District</label>
            <select
              id="district-select"
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-bold text-slate-700 focus:border-emerald-300 focus:outline-none"
            >
              <option value="all">All Districts</option>
              {purwokertoDistricts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category select */}
          <div className="space-y-1">
            <label htmlFor="category-select" className="sr-only">Filter by Category</label>
            <select
              id="category-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-bold text-slate-700 focus:border-emerald-300 focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="Complaint">Complaint</option>
              <option value="Criticism">Criticism</option>
              <option value="Suggestion">Suggestion</option>
              <option value="Appreciation">Appreciation</option>
            </select>
          </div>
        </div>
      </section>

      {/* Feedback List Grid */}
      {filteredFeedback.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredFeedback.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-4 hover:border-amber-100 transition duration-155"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                    {districtName(item.districtId)}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-sm mt-0.5">Feedback ID: {item.id}</h3>
                </div>
                <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold tracking-wide uppercase ${categoryStyles[item.category]}`}>
                  {item.category}
                </span>
              </div>

              <p className="text-xs leading-relaxed text-slate-650 bg-stone-50/50 p-3 rounded-xl border border-stone-100">
                "{item.message}"
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-stone-150 bg-stone-50 p-2.5">
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">Urgency</span>
                  <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] mt-1 ${urgencyStyles[item.urgency] || "text-slate-600 bg-stone-100"}`}>
                    {item.urgency}
                  </span>
                </div>
                <div className="rounded-xl border border-stone-150 bg-stone-50 p-2.5">
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">Classification</span>
                  <span className="font-bold text-slate-700 block mt-1 leading-none">Draft Rule</span>
                </div>
              </div>

              <div className="rounded-xl border border-amber-100 bg-amber-50/65 p-3 text-xs">
                <span className="font-bold text-amber-800 block uppercase tracking-wider text-[9px]">
                  Simulated Action Route
                </span>
                <p className="mt-1 text-amber-950 font-medium leading-relaxed">{item.recommendedAction}</p>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                <Bot className="h-3.5 w-3.5 text-emerald-800" />
                <span>Draft classification. Needs human validation.</span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center text-slate-500">
          <p className="font-bold">No simulated reports match your filter selections.</p>
          <button
            type="button"
            onClick={() => {
              setDistrictFilter("all");
              setCategoryFilter("all");
            }}
            className="mt-3 text-xs font-bold text-emerald-800 underline hover:text-emerald-950"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Bottom disclaimer */}
      <section className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-start gap-2.5 text-xs text-amber-900 leading-relaxed font-semibold">
        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-800 shrink-0" />
        <p>
          Important: Feedback logs displayed are generated strictly for prototyping purposes. Personal identifying details are omitted to comply with mock requirements.
        </p>
      </section>
    </div>
  );
};
