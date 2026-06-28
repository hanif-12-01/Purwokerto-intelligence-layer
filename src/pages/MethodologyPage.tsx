import React from "react";
import { HelpCircle, ShieldAlert, Cpu, BarChart2 } from "lucide-react";

export const MethodologyPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
          <HelpCircle className="h-8 w-8 text-brand-600" />
          <span>Methodology & Scoring System</span>
        </h1>
        <p className="text-slate-500 mt-1">
          Detailed explanation of indices, weights, and decision rules.
        </p>
      </div>

      {/* Warning/Notice Card */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start space-x-4">
        <ShieldAlert className="h-6 w-6 text-amber-700 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-amber-900">Disclaimer & Educational Notice</h4>
          <p className="text-sm text-amber-800 mt-1 leading-relaxed">
            <strong>The data shown in this prototype is fully simulated and mocked.</strong> The scoring system is a simplified rule-based model. 
            This is an academic/learning project and is <strong>not an official system</strong> of the government of Banyumas Regency or the city of Purwokerto.
          </p>
        </div>
      </div>

      {/* Decision Rules */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-lg text-slate-800 flex items-center space-x-2 border-b border-slate-100 pb-3">
          <Cpu className="h-5 w-5 text-brand-600" />
          <span>Formula & Weights</span>
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          The priority score is calculated using Multi-Criteria Decision Making (MCDM) logic with static linear weights:
        </p>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 font-mono text-xs sm:text-sm text-brand-800 overflow-x-auto">
          Score = (Traffic * 0.3) + (Waste * 0.25) + (Public Service * 0.2) + (Student Mobility * 0.25)
        </div>
        <p className="text-xs text-slate-400">
          *Note: Higher values for indices represent greater urgency or higher demands, except for Public Service where higher scores represent higher service needs/friction.
        </p>
      </div>

      {/* Priority Status Rules */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-lg text-slate-800 flex items-center space-x-2 border-b border-slate-100 pb-3">
          <BarChart2 className="h-5 w-5 text-brand-600" />
          <span>Priority Thresholds</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                <th className="py-3 px-4">Threshold</th>
                <th className="py-3 px-4">Priority Status</th>
                <th className="py-3 px-4">Action Urgency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-3 px-4 font-mono font-semibold">Score &ge; 85</td>
                <td className="py-3 px-4">
                  <span className="bg-red-100 text-red-800 border border-red-200 px-2 py-0.5 rounded text-xs font-bold">
                    Critical
                  </span>
                </td>
                <td className="py-3 px-4">Immediate intervention & budget allocation.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono font-semibold">Score &ge; 70</td>
                <td className="py-3 px-4">
                  <span className="bg-amber-100 text-amber-800 border border-amber-200 px-2 py-0.5 rounded text-xs font-bold">
                    High
                  </span>
                </td>
                <td className="py-3 px-4">Secondary planning & active monitoring.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono font-semibold">Score &ge; 50</td>
                <td className="py-3 px-4">
                  <span className="bg-blue-100 text-blue-800 border border-blue-200 px-2 py-0.5 rounded text-xs font-bold">
                    Medium
                  </span>
                </td>
                <td className="py-3 px-4">Routine maintenance & updates.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono font-semibold">{"Score < 50"}</td>
                <td className="py-3 px-4">
                  <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded text-xs font-bold">
                    Low
                  </span>
                </td>
                <td className="py-3 px-4">Stable status. No action required.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
