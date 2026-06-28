import React from "react";
import { AlertTriangle, ShieldCheck, HelpCircle, Calendar, Tag, HardDriveDownload, Eye } from "lucide-react";
import type { CivicFeedbackSignal } from "../../types";

interface SignalReviewCardProps {
  signal: CivicFeedbackSignal;
  onSelect: (signal: CivicFeedbackSignal) => void;
}

export const SignalReviewCard: React.FC<SignalReviewCardProps> = ({ signal, onSelect }) => {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Critical":
        return "bg-red-50 text-red-700 border-red-200";
      case "High":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "Medium":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Low":
        return "bg-slate-50 text-slate-700 border-slate-200";
      default:
        return "bg-stone-50 text-stone-700 border-stone-200";
    }
  };

  const getValidationStatusBadge = (status: string) => {
    switch (status) {
      case "Validated":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
            <ShieldCheck className="h-3 w-3" /> Tervalidasi
          </span>
        );
      case "Reviewed":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
            <ShieldCheck className="h-3 w-3" /> Telah Ditinjau
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-700">
            <AlertTriangle className="h-3 w-3" /> Ditolak
          </span>
        );
      case "Needs Review":
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
            <HelpCircle className="h-3 w-3" /> Perlu Tinjauan
          </span>
        );
    }
  };

  const getFeedbackTypeBadge = (type: string) => {
    switch (type) {
      case "Complaint":
        return "Keluhan";
      case "Criticism":
        return "Kritik";
      case "Suggestion":
        return "Saran";
      case "Appreciation":
        return "Apresiasi";
      default:
        return type;
    }
  };

  return (
    <div className="flex flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-sm hover:shadow-md transition duration-200">
      {/* Header Info */}
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-stone-100 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Urgency Badge */}
          <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${getUrgencyColor(signal.urgency)}`}>
            {signal.urgency}
          </span>
          {/* Validation Status */}
          {getValidationStatusBadge(signal.validationStatus)}
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
          <Calendar className="h-3.5 w-3.5" />
          <span>{signal.createdAt}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow pt-3 space-y-2">
        <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
          {signal.title}
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
          {signal.summary}
        </p>
      </div>

      {/* Meta tags and indicators */}
      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-stone-100 pt-3 text-[11px] font-semibold text-slate-600">
        <div className="flex items-center gap-1.5">
          <Tag className="h-3.5 w-3.5 text-stone-400 shrink-0" />
          <span className="truncate">
            <span className="text-[10px] uppercase font-bold text-stone-400 mr-1">Kec:</span>
            {signal.district === "Unknown" ? "Unknown (Unmapped)" : signal.district}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <HardDriveDownload className="h-3.5 w-3.5 text-stone-400 shrink-0" />
          <span className="truncate">
            <span className="text-[10px] uppercase font-bold text-stone-400 mr-1">Sumber:</span>
            {signal.sourceLabel}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] uppercase font-bold text-stone-400 mr-1">Tipe:</span>
          <span className="rounded bg-stone-100 px-1.5 py-0.5 text-[10px] font-bold text-stone-700">
            {getFeedbackTypeBadge(signal.feedbackType)}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] uppercase font-bold text-stone-400 mr-1">Akurasi AI:</span>
          <span className={`font-bold ${signal.confidenceScore >= 85 ? "text-emerald-700" : signal.confidenceScore >= 70 ? "text-amber-700" : "text-rose-700"}`}>
            {signal.confidenceScore}%
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-4 pt-1">
        <button
          type="button"
          onClick={() => onSelect(signal)}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-emerald-800 bg-white hover:bg-emerald-50 text-emerald-850 hover:text-emerald-950 px-3 py-2 text-xs font-bold transition shadow-sm"
        >
          <Eye className="h-3.5 w-3.5" />
          Tinjau Sinyal
        </button>
      </div>
    </div>
  );
};
