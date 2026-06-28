import { AlertCircle, ArrowUpRight, CheckCircle2, Flame, MapPinned, ShieldAlert } from "lucide-react";
import type { DistrictIndicatorProfile, PriorityResult } from "../../types";
import { ProgressBar } from "../ui/ProgressBar";

interface DistrictCardProps {
  district: DistrictIndicatorProfile;
  score: number;
  status: PriorityResult["status"];
}

export function DistrictCard({ district, score, status }: DistrictCardProps) {
  const getStatusConfig = (priorityStatus: PriorityResult["status"]) => {
    switch (priorityStatus) {
      case "Critical":
        return {
          panel: "bg-red-50 border-red-200",
          text: "text-red-800",
          badgeBg: "bg-red-100 text-red-800 border-red-200",
          bar: "bg-red-500",
          icon: ShieldAlert,
        };
      case "High":
        return {
          panel: "bg-orange-50 border-orange-200",
          text: "text-orange-800",
          badgeBg: "bg-orange-100 text-orange-800 border-orange-200",
          bar: "bg-orange-500",
          icon: Flame,
        };
      case "Medium":
        return {
          panel: "bg-sky-50 border-sky-200",
          text: "text-sky-800",
          badgeBg: "bg-sky-100 text-sky-800 border-sky-200",
          bar: "bg-sky-500",
          icon: AlertCircle,
        };
      case "Low":
        return {
          panel: "bg-emerald-50 border-emerald-200",
          text: "text-emerald-800",
          badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-200",
          bar: "bg-emerald-500",
          icon: CheckCircle2,
        };
    }
  };

  const statusConfig = getStatusConfig(status);
  const StatusIcon = statusConfig.icon;
  const indicators = [
    { label: "Traffic Index", value: district.trafficIndex, color: "bg-blue-600" },
    { label: "Waste Index", value: district.wasteIndex, color: "bg-amber-500" },
    { label: "Drainage & Flood Index", value: district.drainageFloodIndex, color: "bg-sky-600" },
    { label: "Road Infrastructure", value: district.roadInfraIndex, color: "bg-stone-600" },
    { label: "Public Service Pressure", value: district.publicServicePressureIndex, color: "bg-indigo-650" },
    { label: "Student Mobility Index", value: district.studentMobilityIndex, color: "bg-teal-600" },
    { label: "Complaint Urgency Index", value: district.complaintUrgencyIndex, color: "bg-red-500" },
  ];

  return (
    <article className="overflow-hidden rounded-3xl border border-stone-200 bg-white/90 shadow-sm shadow-amber-900/5 backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-900/10">
      <div className="flex flex-col gap-4 border-b border-stone-100 px-5 py-5 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-emerald-50 p-3 text-brand-700 ring-1 ring-emerald-100">
            <MapPinned className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold leading-tight text-slate-950">{district.name}</h3>
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
              Source: {district.sourceStatus}
            </span>
          </div>
        </div>
        <span className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${statusConfig.badgeBg}`}>
          <StatusIcon className="h-3.5 w-3.5" />
          <span>{status}</span>
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="space-y-4">
          {indicators.map((indicator) => (
            <div key={indicator.label}>
              <div className="mb-1.5 flex justify-between text-sm">
                <span className="font-semibold text-slate-500">{indicator.label}</span>
                <span className="font-bold text-slate-800">{indicator.value}/100</span>
              </div>
              <ProgressBar value={indicator.value} colorClass={indicator.color} />
            </div>
          ))}
        </div>

        <div className={`mt-6 rounded-2xl border p-4 ${statusConfig.panel}`}>
          <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-white/80">
            <div className={`h-1.5 rounded-full ${statusConfig.bar}`} style={{ width: `${score}%` }} />
          </div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Priority Score</span>
              <span className="text-3xl font-black tracking-tight text-slate-950">{score}</span>
            </div>
            <div className="text-right">
              <span className={`flex items-center justify-end text-sm font-bold ${statusConfig.text}`}>
                <span>Needs Review</span>
                <ArrowUpRight className="ml-0.5 h-4 w-4" />
              </span>
              <span className="text-xs font-medium text-slate-500">Rule-based decision support</span>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-stone-200 bg-stone-50/80 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Recommended Action</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{district.recommendedAction}</p>
        </div>
      </div>
    </article>
  );
}
