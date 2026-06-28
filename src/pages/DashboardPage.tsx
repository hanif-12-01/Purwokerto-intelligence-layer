import React from "react";
import { purwokertoDistricts } from "../data/purwokertoDistricts";
import { calculatePriorityScore, getPriorityStatus } from "../utils/scoring";
import { DistrictCard } from "../components/dashboard/DistrictCard";
import { BarChart3, AlertCircle, TrendingUp, Users } from "lucide-react";

export const DashboardPage: React.FC = () => {
  // Process districts and add scores + status
  const processedDistricts = purwokertoDistricts.map((district) => {
    const score = calculatePriorityScore(district);
    const status = getPriorityStatus(score);
    return {
      district,
      score,
      status,
    };
  });

  // Calculate high-level metrics
  const avgScore =
    processedDistricts.reduce((acc, curr) => acc + curr.score, 0) / processedDistricts.length;
  const criticalCount = processedDistricts.filter((d) => d.status === "Critical").length;
  const highCount = processedDistricts.filter((d) => d.status === "High" || d.status === "Critical").length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Purwokerto Districts Priority Dashboard</h1>
        <p className="text-slate-500 mt-1">
          Analytic mapping of urban challenges based on multi-indicator prioritization rules.
        </p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-brand-50 text-brand-600 rounded-lg">
            <BarChart3 className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Total Districts
            </span>
            <span className="text-2xl font-extrabold text-slate-800">{processedDistricts.length}</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-lg">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Critical Districts
            </span>
            <span className="text-2xl font-extrabold text-slate-800">{criticalCount}</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Average Score
            </span>
            <span className="text-2xl font-extrabold text-slate-800">
              {Math.round(avgScore * 10) / 10}
            </span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Action Required
            </span>
            <span className="text-2xl font-extrabold text-slate-800">{highCount} Districts</span>
          </div>
        </div>
      </div>

      {/* Grid of District Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {processedDistricts.map(({ district, score, status }) => (
          <DistrictCard
            key={district.id}
            district={district}
            score={score}
            status={status}
          />
        ))}
      </div>
    </div>
  );
};
