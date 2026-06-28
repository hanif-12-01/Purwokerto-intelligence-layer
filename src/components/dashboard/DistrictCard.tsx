import React from "react";
import { Landmark, ArrowUpRight, Flame, ShieldAlert, AlertCircle, CheckCircle2 } from "lucide-react";
import type { District, PriorityResult } from "../../types";

interface DistrictCardProps {
  district: District;
  score: number;
  status: PriorityResult["status"];
}

export const DistrictCard: React.FC<DistrictCardProps> = ({ district, score, status }) => {
  // Map priority status to colors and icons
  const getStatusConfig = (priorityStatus: PriorityResult["status"]) => {
    switch (priorityStatus) {
      case "Critical":
        return {
          bg: "bg-red-50 border-red-200",
          text: "text-red-800",
          badgeBg: "bg-red-100 text-red-800 border-red-200",
          icon: ShieldAlert,
        };
      case "High":
        return {
          bg: "bg-amber-50 border-amber-200",
          text: "text-amber-800",
          badgeBg: "bg-amber-100 text-amber-800 border-amber-200",
          icon: Flame,
        };
      case "Medium":
        return {
          bg: "bg-blue-50 border-blue-200",
          text: "text-blue-800",
          badgeBg: "bg-blue-100 text-blue-800 border-blue-200",
          icon: AlertCircle,
        };
      default:
        return {
          bg: "bg-slate-50 border-slate-200",
          text: "text-slate-700",
          badgeBg: "bg-slate-100 text-slate-700 border-slate-200",
          icon: CheckCircle2,
        };
    }
  };

  const statusConfig = getStatusConfig(status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow transition-shadow duration-200">
      {/* Card Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <Landmark className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-lg leading-tight">{district.name}</h3>
            <span className="text-xs text-slate-400">ID: {district.id}</span>
          </div>
        </div>
        <span
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusConfig.badgeBg}`}
        >
          <StatusIcon className="h-3.5 w-3.5" />
          <span>{status}</span>
        </span>
      </div>

      {/* Card Body */}
      <div className="p-6">
        {/* Indicators List */}
        <div className="space-y-3">
          {/* Traffic Index */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-500 font-medium">Traffic Index</span>
              <span className="text-slate-800 font-semibold">{district.trafficIndex}/100</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div
                className="bg-indigo-500 h-1.5 rounded-full"
                style={{ width: `${district.trafficIndex}%` }}
              ></div>
            </div>
          </div>

          {/* Waste Index */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-500 font-medium">Waste Index</span>
              <span className="text-slate-800 font-semibold">{district.wasteIndex}/100</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div
                className="bg-amber-500 h-1.5 rounded-full"
                style={{ width: `${district.wasteIndex}%` }}
              ></div>
            </div>
          </div>

          {/* Public Service Index */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-500 font-medium">Public Service Index</span>
              <span className="text-slate-800 font-semibold">{district.publicServiceIndex}/100</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div
                className="bg-emerald-500 h-1.5 rounded-full"
                style={{ width: `${district.publicServiceIndex}%` }}
              ></div>
            </div>
          </div>

          {/* Student Mobility Index */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-500 font-medium">Student Mobility Index</span>
              <span className="text-slate-800 font-semibold">{district.studentMobilityIndex}/100</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div
                className="bg-violet-500 h-1.5 rounded-full"
                style={{ width: `${district.studentMobilityIndex}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Priority Score Summary */}
        <div className={`mt-6 p-4 rounded-lg border ${statusConfig.bg} flex items-center justify-between`}>
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">
              Priority Score
            </span>
            <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
              {score}
            </span>
          </div>
          <div className="text-right">
            <span className={`text-sm font-semibold flex items-center justify-end ${statusConfig.text}`}>
              <span>Needs Review</span>
              <ArrowUpRight className="h-4 w-4 ml-0.5" />
            </span>
            <span className="text-xs text-slate-400">Rule-based decision</span>
          </div>
        </div>
      </div>
    </div>
  );
};
