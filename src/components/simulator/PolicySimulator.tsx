import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { purwokertoDistricts } from "../../data/purwokertoDistricts";
import { policyModes } from "../../data/policyModes";
import type { ScenarioWeights } from "../../types";
import { calculateWeightedScore, getPriorityStatus, getStatusClasses } from "../../utils/scoring";
import { ProgressBar } from "../ui/ProgressBar";

const weightLabels: Array<[keyof ScenarioWeights, string, string]> = [
  ["trafficIndex", "Traffic", "bg-blue-600"],
  ["wasteIndex", "Waste", "bg-amber-500"],
  ["drainageFloodIndex", "Drainage & Flood", "bg-sky-600"],
  ["roadInfraIndex", "Road Infrastructure", "bg-stone-600"],
  ["publicServicePressureIndex", "Public Service Pressure", "bg-indigo-650"],
  ["studentMobilityIndex", "Student Mobility", "bg-teal-600"],
  ["complaintUrgencyIndex", "Complaint Urgency", "bg-red-500"],
];

export function PolicySimulator() {
  const [activeId, setActiveId] = useState(policyModes[0].id);
  const activeScenario = policyModes.find((scenario) => scenario.id === activeId) ?? policyModes[0];
  const ranking = useMemo(
    () =>
      [...purwokertoDistricts]
        .map((district) => ({ district, score: calculateWeightedScore(district, activeScenario.weights) }))
        .sort((a, b) => b.score - a.score),
    [activeScenario],
  );

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-amber-100/90 bg-white/80 p-6 shadow-sm shadow-amber-900/5 backdrop-blur sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800 ring-1 ring-emerald-100">
          <SlidersHorizontal className="h-4 w-4" /> Policy Simulator
        </div>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Scenario-based weight review</h1>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">
          Select a simulation mode to see mock indicator weight changes and district ranking. This is a rule-based scenario exercise, not a prediction model or final government decision.
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-3">
          {policyModes.map((scenario) => (
            <button key={scenario.id} type="button" onClick={() => setActiveId(scenario.id)} className={`w-full rounded-2xl border p-4 text-left transition ${scenario.id === activeId ? "border-amber-300 bg-amber-50 text-amber-950 shadow-sm shadow-amber-900/10" : "border-stone-200 bg-white/85 text-slate-700 hover:border-emerald-200 hover:bg-emerald-50/60"}`}>
              <span className="font-extrabold">{scenario.name}</span>
              <span className="mt-1 block text-sm leading-6 text-slate-500">{scenario.description}</span>
            </button>
          ))}
        </div>
        <div className="space-y-5 rounded-3xl border border-stone-200 bg-white/85 p-5 shadow-sm shadow-amber-900/5">
          <div>
            <h2 className="text-xl font-extrabold text-slate-950">{activeScenario.name}</h2>
            <p className="mt-1 text-sm text-slate-500">Mock changes in indicator weights</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {weightLabels.map(([key, label, color]) => {
              const value = Math.round(activeScenario.weights[key] * 100);
              return (
                <div key={key} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                  <div className="mb-2 flex justify-between text-sm font-bold text-slate-700"><span>{label}</span><span>{value}%</span></div>
                  <ProgressBar value={value} colorClass={color} />
                </div>
              );
            })}
          </div>
          <div className="space-y-3">
            <h3 className="font-extrabold text-slate-950">District ranking</h3>
            {ranking.map((item, index) => {
              const status = getPriorityStatus(item.score);
              return (
                <div key={item.district.id} className="flex items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-white p-4">
                  <div><p className="text-sm font-bold text-slate-400">#{index + 1}</p><p className="font-extrabold text-slate-950">{item.district.name}</p></div>
                  <div className="text-right"><p className="text-lg font-black text-slate-950">{item.score}</p><span className={`rounded-full border px-3 py-1 text-xs font-bold ${getStatusClasses(status)}`}>{status}</span></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
