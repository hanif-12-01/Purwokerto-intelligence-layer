import React, { useState, useMemo } from "react";
import { ClipboardCheck, FileText, CheckCircle2, ShieldAlert, Clock, AlertTriangle } from "lucide-react";
import { purwokertoDistricts } from "../data/purwokertoDistricts";
import { mockCompletionReports } from "../data/mockCompletionReports";

export const AccountabilityPage: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const getCompletionStatusClasses = (status: string) => {
    switch (status) {
      case "Validated":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Under Review":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "Needs Revision":
        return "bg-orange-50 text-orange-855 border-orange-200";
      default:
        return "bg-stone-50 text-stone-700 border-stone-200";
    }
  };

  const districtName = (districtId: string) =>
    purwokertoDistricts.find((d) => d.id === districtId)?.name ?? "Purwokerto region";

  // Filter reports
  const filteredReports = useMemo(() => {
    if (selectedStatus === "all") return mockCompletionReports;
    return mockCompletionReports.filter((report) => report.status === selectedStatus);
  }, [selectedStatus]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Validated":
        return <CheckCircle2 className="h-4 w-4 text-emerald-600" />;
      case "Needs Revision":
        return <ShieldAlert className="h-4 w-4 text-orange-600" />;
      case "Under Review":
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <FileText className="h-4 w-4 text-slate-500" />;
    }
  };

  const tabs = [
    { label: "All Reports", value: "all" },
    { label: "Submitted", value: "Submitted" },
    { label: "Under Review", value: "Under Review" },
    { label: "Needs Revision", value: "Needs Revision" },
    { label: "Validated", value: "Validated" },
  ];

  return (
    <div className="space-y-6">
      {/* Header section */}
      <section className="rounded-3xl border border-stone-200 bg-white/70 p-6 shadow-sm backdrop-blur">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-800 shadow-sm">
            <ClipboardCheck className="h-3.5 w-3.5" /> Resolution tracking
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Resolution Accountability Center
          </h1>
          <p className="text-sm text-slate-600">
            Completion reports and simulated follow-up records from district responses.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-stone-200 pb-px">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setSelectedStatus(tab.value)}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition -mb-px ${
              selectedStatus === tab.value
                ? "border-emerald-800 text-emerald-950"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Reports Grid */}
      {filteredReports.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredReports.map((report) => (
            <article
              key={report.id}
              className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-4 hover:border-amber-100 transition duration-155"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                    {districtName(report.districtId)}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-sm mt-0.5">Report Ref: {report.id.toUpperCase()}</h3>
                </div>
                <span className={`inline-flex items-center gap-1.5 rounded px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide border ${getCompletionStatusClasses(report.status)}`}>
                  {getStatusIcon(report.status)}
                  <span>{report.status}</span>
                </span>
              </div>

              {/* Action Taken */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Action Taken</span>
                <p className="mt-1 text-xs text-slate-700 font-semibold leading-relaxed">{report.actionTaken}</p>
              </div>

              {/* Meta details */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-stone-150 bg-stone-50 p-2.5">
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">Completion Time</span>
                  <span className="font-bold text-slate-800 block mt-1">{report.completionTime}</span>
                </div>
                <div className="rounded-xl border border-stone-150 bg-stone-50 p-2.5">
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">Data Type</span>
                  <span className="font-bold text-slate-850 block mt-1">Prototype Record</span>
                </div>
              </div>

              {/* Field constraints */}
              <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-3 text-xs leading-relaxed text-slate-655">
                <span className="font-bold text-slate-600 block uppercase tracking-wider text-[9px]">Field Constraints</span>
                <p className="mt-1 text-slate-700">{report.fieldConstraints}</p>
              </div>

              {/* Public Summary */}
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-3 text-xs leading-relaxed">
                <span className="font-bold text-emerald-800 block uppercase tracking-wider text-[9px]">Public Summary</span>
                <p className="mt-1 text-emerald-950 font-medium">{report.publicSummary}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center text-slate-500">
          <p className="font-bold">No simulated completion reports match your status filter.</p>
        </div>
      )}

      {/* Bottom disclaimer */}
      <section className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-start gap-2.5 text-xs text-amber-900 leading-relaxed font-semibold">
        <AlertTriangle className="h-4.5 w-4.5 text-amber-600 shrink-0" />
        <p>
          <strong>Disclaimer:</strong> Completion Report is a prototype record and not a legal document. It showcases mock resolutions under the education-oriented civic priority layer.
        </p>
      </section>
    </div>
  );
};
