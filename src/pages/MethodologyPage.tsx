import React from "react";
import { BarChart2, Bot, Cpu, Globe, HelpCircle, Layers, Map, ShieldAlert, Timer, Users } from "lucide-react";

const weights = [
  { label: "Traffic Index", value: 15, color: "bg-blue-500" },
  { label: "Waste Index", value: 15, color: "bg-amber-500" },
  { label: "Drainage & Flood Index", value: 15, color: "bg-sky-500" },
  { label: "Road Infrastructure", value: 15, color: "bg-stone-500" },
  { label: "Public Service Pressure", value: 15, color: "bg-indigo-500" },
  { label: "Student Mobility Index", value: 15, color: "bg-teal-500" },
  { label: "Complaint Urgency Index", value: 10, color: "bg-red-500" },
];

const thresholds = [
  {
    threshold: "Score >= 75",
    status: "Critical",
    className: "bg-red-100 text-red-800 border-red-200",
    action: "Immediate intervention and budget allocation.",
  },
  {
    threshold: "Score >= 60",
    status: "High",
    className: "bg-amber-100 text-amber-800 border-amber-200",
    action: "Secondary planning and active monitoring.",
  },
  {
    threshold: "Score >= 45",
    status: "Medium",
    className: "bg-sky-100 text-sky-800 border-sky-200",
    action: "Routine maintenance and periodic updates.",
  },
  {
    threshold: "Score < 45",
    status: "Low",
    className: "bg-emerald-100 text-emerald-800 border-emerald-200",
    action: "Stable status. No immediate action required.",
  },
];

const systemTransparency = [
  {
    icon: Layers,
    title: "All data is mock/simulated",
    description:
      "Every district index, feedback item, and completion report in this prototype is manually authored simulation data designed for learning purposes.",
  },
  {
    icon: ShieldAlert,
    title: "Not an official government platform",
    description:
      "This system is not affiliated with any government body. It does not represent official policy, budget allocation, or planning decisions of Banyumas Regency or Purwokerto city.",
  },
  {
    icon: Globe,
    title: "No external API is used",
    description:
      "The prototype does not connect to any external service, REST API, third-party data provider, or cloud infrastructure. All logic runs locally in the browser.",
  },
  {
    icon: Map,
    title: "Prototype GIS boundary is used",
    description:
      "The Priority Map section uses prototype GeoJSON polygons for area-based decision support. These are not official government boundaries and should be replaced with verified GeoJSON/Shapefile data before operational use.",
  },
  {
    icon: Timer,
    title: "No real-time data is used",
    description:
      "All values shown are static and do not update from live sensors, IoT feeds, or streaming data sources. The dashboard reflects predefined simulation values only.",
  },
  {
    icon: Cpu,
    title: "Scoring is rule-based",
    description:
      "Priority scores are calculated using a simple linear weighted sum formula. No machine learning, neural networks, or statistical prediction models are involved.",
  },
  {
    icon: Bot,
    title: "CivicSense AI is only a mock/rule-based assistant preview",
    description:
      "The CivicSense AI Draft component generates a summary from existing scoring data using simple logic. It does not call OpenAI, Google AI, or any external AI service.",
  },
  {
    icon: Users,
    title: "Human-in-the-loop validation required",
    description:
      "All classifications, priority labels, and recommended actions are draft outputs only. Final decisions must follow human-in-the-loop validation by qualified personnel or relevant agencies (OPD).",
  },
];

export const MethodologyPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section className="rounded-3xl border border-amber-100/90 bg-white/80 p-6 shadow-sm shadow-amber-900/5 backdrop-blur sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800 ring-1 ring-emerald-100">
          <HelpCircle className="h-4 w-4" /> Model Transparency
        </div>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
          Methodology & Scoring System
        </h1>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">
          Detailed explanation of the simulated indices, static weights, decision thresholds, and
          system transparency commitments used in the Purwokerto Intelligence Layer prototype.
        </p>
      </section>

      {/* Disclaimer */}
      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-amber-200 bg-amber-50/90 p-6 text-amber-950 shadow-sm">
          <ShieldAlert className="h-7 w-7" />
          <h2 className="mt-4 text-xl font-extrabold">Disclaimer & Educational Notice</h2>
          <p className="mt-3 text-sm leading-6 text-amber-900">
            The data shown in this prototype is fully simulated and mocked. The scoring system is a
            simplified rule-based model for academic learning and is not an official system of the
            Banyumas Regency or Purwokerto city government.
          </p>
        </div>

        <div className="rounded-3xl border border-stone-200 bg-white/85 p-6 shadow-sm shadow-amber-900/5">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-4">
            <Cpu className="h-5 w-5 text-emerald-700" />
            <h2 className="text-lg font-extrabold text-slate-950">Formula & Weights</h2>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            The priority score uses Multi-Criteria Decision Making logic with a static linear weighted
            sum.
          </p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-emerald-200 bg-emerald-50 p-4 font-mono text-xs font-semibold text-emerald-955 sm:text-sm">
            Score = (Traffic × 0.15) + (Waste × 0.15) + (Drainage × 0.15) + (Road × 0.15) + (Public Service × 0.15) + (Student Mobility × 0.15) + (Complaint × 0.10)
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-500">
            Higher values represent greater urgency or higher demand. Public Service is interpreted as
            service need/friction in this prototype.
          </p>
        </div>
      </section>

      {/* Weight Distribution */}
      <section className="rounded-3xl border border-stone-200 bg-white/85 p-6 shadow-sm shadow-amber-900/5">
        <div className="flex items-center gap-2 border-b border-stone-100 pb-4">
          <BarChart2 className="h-5 w-5 text-emerald-700" />
          <h2 className="text-lg font-extrabold text-slate-950">Indicator Weight Distribution</h2>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {weights.map((weight) => (
            <div key={weight.label} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-bold text-slate-700">{weight.label}</span>
                <span className="text-lg font-black text-slate-950">{weight.value}%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                <div
                  className={`h-2 rounded-full ${weight.color}`}
                  style={{ width: `${weight.value * 5}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Priority Thresholds */}
      <section className="rounded-3xl border border-stone-200 bg-white/85 p-6 shadow-sm shadow-amber-900/5">
        <div className="flex items-center gap-2 border-b border-stone-100 pb-4">
          <BarChart2 className="h-5 w-5 text-emerald-700" />
          <h2 className="text-lg font-extrabold text-slate-950">Priority Thresholds</h2>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-stone-100 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                <th className="px-4 py-3">Threshold</th>
                <th className="px-4 py-3">Priority Status</th>
                <th className="px-4 py-3">Action Urgency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-slate-700">
              {thresholds.map((item) => (
                <tr key={item.status}>
                  <td className="px-4 py-4 font-mono font-semibold">{item.threshold}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-bold ${item.className}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">{item.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* System Transparency */}
      <section className="space-y-5">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">
            System Transparency
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            What this prototype does and does not do
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            To ensure full transparency, every limitation and design boundary of the Purwokerto
            Intelligence Layer is documented here.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {systemTransparency.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-stone-200 bg-white/85 p-5 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-emerald-50 p-2 text-emerald-700 ring-1 ring-emerald-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
