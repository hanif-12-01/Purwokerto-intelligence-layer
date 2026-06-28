import React, { useState } from "react";
import { Bot, Sparkles, AlertCircle, FileText, Download } from "lucide-react";
import { purwokertoDistricts } from "../data/purwokertoDistricts";
import { calculatePriorityScore, getPriorityStatus, getStatusClasses } from "../utils/scoring";

export const PolicyBriefPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>("pwt-utara");

  const district = purwokertoDistricts.find((d) => d.id === selectedId) || purwokertoDistricts[0];
  const score = calculatePriorityScore(district);
  const status = getPriorityStatus(score);

  // Dynamic analysis helper
  const getDynamicAnalysis = () => {
    const indices = [
      { name: "Traffic Index", val: district.trafficIndex, desc: "traffic flow management and public transit connectivity" },
      { name: "Waste Index", val: district.wasteIndex, desc: "solid waste collection scheduling and neighborhood cleaning frequency" },
      { name: "Drainage & Flood Index", val: district.drainageFloodIndex, desc: "drainage capacity and local inundation reviews" },
      { name: "Road Infrastructure", val: district.roadInfraIndex, desc: "street lights, pavement condition, and sidewalk status" },
      { name: "Public Service Pressure", val: district.publicServicePressureIndex, desc: "administrative office waiting times and digitizing service requests" },
      { name: "Student Mobility Index", val: district.studentMobilityIndex, desc: "student boarding corridors, campus activity nodes, and safe walking lanes" },
      { name: "Complaint Urgency Index", val: district.complaintUrgencyIndex, desc: "citizens complaints priority and feedback urgency levels" },
    ];
    
    // Sort to find highest
    const highest = [...indices].sort((a, b) => b.val - a.val)[0];
    
    return {
      highestLabel: highest.name,
      highestVal: highest.val,
      highestDesc: highest.desc,
    };
  };

  const { highestLabel, highestVal, highestDesc } = getDynamicAnalysis();

  return (
    <div className="space-y-6">
      {/* Header section */}
      <section className="rounded-3xl border border-stone-200 bg-white/70 p-6 shadow-sm backdrop-blur">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-800 shadow-sm">
            <Bot className="h-3.5 w-3.5" /> CivicSense Assistant
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Policy Brief: CivicSense AI Draft
          </h1>
          <p className="text-sm text-slate-600">
            Rule-based assistant overview. Select an area below to generate a live, simulated briefing.
          </p>
        </div>
      </section>

      {/* District Selector & Brief Layout */}
      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        {/* Selector Panel */}
        <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-4 h-fit">
          <h2 className="text-sm font-extrabold text-slate-950 uppercase tracking-wider">Select District</h2>
          <div className="flex flex-col gap-2">
            {purwokertoDistricts.map((d) => {
              const dScore = calculatePriorityScore(d);
              const isActive = d.id === selectedId;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedId(d.id)}
                  className={`w-full text-left rounded-xl p-3.5 border transition ${
                     isActive
                      ? "border-emerald-300 bg-emerald-50 text-emerald-950 font-extrabold shadow-sm"
                      : "border-stone-150 bg-white hover:bg-stone-50 text-slate-700"
                  }`}
                >
                  <div className="flex justify-between items-center text-xs">
                    <span>{d.name}</span>
                    <span className="font-black text-slate-950">{dScore} pts</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-stone-150">
            <span className="text-[11px] font-bold text-slate-400 block uppercase">Draft Warning:</span>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-500 font-medium">
              Summaries are generated client-side from mock indexes. No external server queries are executed.
            </p>
          </div>
        </section>

        {/* Live Policy Brief Draft */}
        <section className="space-y-6">
          <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-white/95 via-emerald-50/20 to-amber-50/20 p-6 shadow-sm shadow-amber-900/5 space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-2.5">
                <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-800 ring-1 ring-emerald-100">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-950 text-base">Civic Intelligence Briefing</h3>
                  <p className="text-xs text-slate-500">Draft Ref: CS-PWT-{district.id.toUpperCase()}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start">
                <span className={`inline-block border rounded px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${getStatusClasses(status)}`}>
                  {status} Priority
                </span>
              </div>
            </div>

            {/* Validation Notice Box */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50/90 p-4 text-xs font-bold leading-relaxed text-amber-900 flex items-start gap-2.5">
              <Sparkles className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="uppercase text-[10px] tracking-wider">OPD Validation Alert</p>
                <p className="mt-0.5 font-semibold text-amber-950">
                  Draft analysis only. Requires OPD or human validation. Do not authorize administrative routing based solely on this automated preview.
                </p>
              </div>
            </div>

            {/* Structured Report Text */}
            <div className="space-y-4 text-xs leading-relaxed text-slate-700">
              <div>
                <h4 className="font-extrabold text-slate-900 mb-1">1. Summary Overview</h4>
                <p>
                  According to the rule-based calculation, <strong>{district.name}</strong> registered a final Priority Score of <strong>{score}</strong> out of 100, placing it under the <strong>{status}</strong> priority tier. This score integrates simulated traffic delays, sanitation logistics, civic facility accessibility, and student pedestrian traffic indices.
                </p>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 mb-1">2. Primary Concern Breakdown</h4>
                <p>
                  The highest pressure point in this district is the <strong>{highestLabel}</strong> which stands at <strong>{highestVal}/100</strong>. This indicates immediate attention is requested regarding <em>{highestDesc}</em>, which acts as the major driver behind the area's current ranking.
                </p>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 mb-1">3. Regional Context & Source Status</h4>
                <p>
                  Additionally, the district has an administrative status of <strong>{district.sourceStatus}</strong>. This classification is assigned based on BPS Kabupaten Banyumas database reports and signals where field audits or mock follow-up reviews are recommended to verify priority parameters.
                </p>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 mb-1">4. Draft Actions Recommendations</h4>
                <div className="rounded-xl border border-stone-200 bg-stone-50/80 p-3.5 space-y-1.5">
                  <p className="font-bold text-slate-850">Suggested Workflow:</p>
                  <ul className="list-disc pl-4 space-y-1 text-slate-650">
                    <li>Initiate a targeted physical inspection regarding {highestLabel} issues.</li>
                    <li>Coordinate with the relevant local government agency to cross-check resident reports.</li>
                    <li>Conduct a campus-area or commercial node mobility audit to verify simulated bottlenecks.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="pt-4 border-t border-stone-150 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400">
                Data Context: BPS Kabupaten Banyumas (Simulated)
              </span>
              <button
                type="button"
                onClick={() => alert("Simulation: Report download requested. Files are only available in validated workflows.")}
                className="inline-flex items-center gap-1 rounded-lg border border-stone-200 hover:bg-stone-50 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm transition"
              >
                <Download className="h-3 w-3" /> Export Draft (PDF)
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-4 text-xs text-slate-650 flex items-center gap-2 font-medium">
            <AlertCircle className="h-4.5 w-4.5 text-emerald-800 shrink-0" />
            <span>
              This policy brief uses a fixed rule-based algorithm. If you want to modify weights and observe different ranking outcomes, please visit the <a href="/simulator" className="text-emerald-800 font-bold underline hover:text-emerald-950">Policy Simulator</a> page.
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};
