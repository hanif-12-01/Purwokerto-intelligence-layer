import React from "react";
import { ListTodo, CheckCircle, XCircle, BarChart3, AlertCircle } from "lucide-react";
import type { CivicFeedbackSignal } from "../../types";

interface SignalReviewStatsProps {
  signals: CivicFeedbackSignal[];
}

export const SignalReviewStats: React.FC<SignalReviewStatsProps> = ({ signals }) => {
  const total = signals.length;
  const needsReview = signals.filter((s) => s.validationStatus === "Needs Review").length;
  const validated = signals.filter((s) => s.validationStatus === "Validated").length;
  const rejected = signals.filter((s) => s.validationStatus === "Rejected").length;
  
  const avgConfidence = total > 0 
    ? Math.round(signals.reduce((acc, s) => acc + s.confidenceScore, 0) / total) 
    : 0;

  const stats = [
    {
      label: "Total Sinyal",
      value: total,
      icon: ListTodo,
      tone: "bg-slate-50 text-slate-800 border-slate-100",
    },
    {
      label: "Perlu Tinjauan",
      value: needsReview,
      icon: AlertCircle,
      tone: "bg-amber-50 text-amber-800 border-amber-100",
    },
    {
      label: "Tervalidasi",
      value: validated,
      icon: CheckCircle,
      tone: "bg-emerald-50 text-emerald-800 border-emerald-100",
    },
    {
      label: "Ditolak",
      value: rejected,
      icon: XCircle,
      tone: "bg-red-50 text-red-800 border-red-105",
    },
    {
      label: "Rerata Keyakinan",
      value: `${avgConfidence}%`,
      icon: BarChart3,
      tone: "bg-sky-50 text-sky-800 border-sky-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
          >
            <div className={`rounded-xl p-2 border shrink-0 ${stat.tone}`}>
              <Icon className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 truncate">
                {stat.label}
              </span>
              <span className="text-lg font-black text-slate-900">
                {stat.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
