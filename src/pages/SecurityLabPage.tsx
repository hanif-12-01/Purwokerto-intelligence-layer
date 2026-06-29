import React, { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  FileSearch,
  LockKeyhole,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import {
  SECURITY_PAYLOADS,
  checkClientRateLimit,
  runSecuritySimulation,
  safeJsonParse,
  validateCitizenFeedback,
} from "../utils/securityDefense";

const decisionLabel: Record<ReturnType<typeof validateCitizenFeedback>["decision"], string> = {
  allow: "Diizinkan",
  sanitize: "Disanitasi",
  "manual-review": "Manual Review",
  block: "Diblokir",
};

const decisionClass: Record<ReturnType<typeof validateCitizenFeedback>["decision"], string> = {
  allow: "bg-emerald-50 text-emerald-800 ring-emerald-100",
  sanitize: "bg-amber-50 text-amber-800 ring-amber-100",
  "manual-review": "bg-orange-50 text-orange-800 ring-orange-100",
  block: "bg-rose-50 text-rose-800 ring-rose-100",
};

export const SecurityLabPage: React.FC = () => {
  const [activePayloadId, setActivePayloadId] = useState(SECURITY_PAYLOADS[0]?.id ?? "");
  const [customInput, setCustomInput] = useState(SECURITY_PAYLOADS[0]?.sample ?? "");

  const simulationReports = useMemo(() => runSecuritySimulation(), []);
  const activePayload = SECURITY_PAYLOADS.find((payload) => payload.id === activePayloadId) ?? SECURITY_PAYLOADS[0];
  const customReport = useMemo(() => validateCitizenFeedback(customInput), [customInput]);
  const jsonSafety = useMemo(() => safeJsonParse<Record<string, unknown>>(customInput), [customInput]);
  const rateLimitPreview = useMemo(() => checkClientRateLimit("security-lab-preview", Date.now(), 3, 60_000), []);

  const handlePayloadClick = (payloadId: string): void => {
    const payload = SECURITY_PAYLOADS.find((item) => item.id === payloadId);
    if (!payload) return;

    setActivePayloadId(payload.id);
    setCustomInput(payload.sample);
  };

  const resetToCleanSample = (): void => {
    setCustomInput("Mohon pengecekan drainase di sekitar Jalan Jenderal Soedirman. Air meluap saat hujan deras.");
  };

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-emerald-100 bg-white/85 shadow-sm">
        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-bold text-emerald-900 ring-1 ring-emerald-100">
              <LockKeyhole className="h-4 w-4" /> Defensive Security Lab
            </span>
            <div className="space-y-3">
              <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Simulasi serangan aman untuk menguji sanitasi input warga
              </h1>
              <p className="max-w-3xl text-base leading-8 text-slate-650">
                Modul ini menjalankan payload simulasi secara lokal di browser untuk memeriksa XSS, injection string,
                path traversal, prototype pollution, kebocoran data pribadi, dan secret exposure. Tidak ada request
                serangan ke server eksternal.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-stone-100 bg-stone-50 p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Payload uji</p>
                <p className="mt-2 text-2xl font-black text-slate-950">{SECURITY_PAYLOADS.length}</p>
              </div>
              <div className="rounded-2xl border border-stone-100 bg-stone-50 p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Rate-limit demo</p>
                <p className="mt-2 text-2xl font-black text-slate-950">{rateLimitPreview.remainingAttempts} sisa</p>
              </div>
              <div className="rounded-2xl border border-stone-100 bg-stone-50 p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Mode</p>
                <p className="mt-2 text-2xl font-black text-slate-950">Local</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-amber-100 bg-amber-50/70 p-5 shadow-inner">
            <div className="flex items-start gap-3">
              <ShieldAlert className="mt-1 h-6 w-6 text-amber-700" />
              <div className="space-y-2">
                <h2 className="text-lg font-black text-slate-950">Batas keamanan simulasi</h2>
                <p className="text-sm leading-7 text-slate-700">
                  Gunakan hanya untuk aplikasi milik sendiri atau lingkungan yang memiliki izin audit. Payload di sini
                  adalah contoh defensif untuk menguji validator, bukan panduan menyerang aplikasi pihak lain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Attack simulation library</p>
              <h2 className="mt-1 text-xl font-black text-slate-950">Pilih payload uji</h2>
            </div>
            <Terminal className="h-6 w-6 text-slate-500" />
          </div>

          <div className="space-y-3">
            {SECURITY_PAYLOADS.map((payload) => {
              const isActive = payload.id === activePayloadId;
              return (
                <button
                  key={payload.id}
                  type="button"
                  onClick={() => handlePayloadClick(payload.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    isActive
                      ? "border-emerald-300 bg-emerald-50 text-emerald-950"
                      : "border-stone-100 bg-stone-50 hover:border-emerald-200 hover:bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-extrabold text-slate-950">{payload.label}</p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        {payload.category} · {payload.severity}
                      </p>
                    </div>
                    {isActive ? <CheckCircle2 className="h-5 w-5 text-emerald-700" /> : null}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-650">{payload.expectedDefense}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Live defensive check</p>
              <h2 className="mt-1 text-xl font-black text-slate-950">Validator input warga</h2>
            </div>
            <button
              type="button"
              onClick={resetToCleanSample}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-stone-50"
            >
              <RefreshCw className="h-4 w-4" /> Reset aman
            </button>
          </div>

          <label className="block text-sm font-bold text-slate-700" htmlFor="security-input">
            Input simulasi
          </label>
          <textarea
            id="security-input"
            value={customInput}
            onChange={(event) => setCustomInput(event.target.value)}
            className="mt-2 min-h-40 w-full rounded-2xl border border-stone-200 bg-stone-50 p-4 font-mono text-sm leading-6 text-slate-800 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-50"
          />

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-stone-100 bg-stone-50 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Risk score</p>
              <p className="mt-2 text-3xl font-black text-slate-950">{customReport.riskScore}</p>
            </div>
            <div className={`rounded-2xl p-4 ring-1 ${decisionClass[customReport.decision]}`}>
              <p className="text-xs font-bold uppercase tracking-widest">Decision</p>
              <p className="mt-2 text-xl font-black">{decisionLabel[customReport.decision]}</p>
            </div>
            <div className="rounded-2xl border border-stone-100 bg-stone-50 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">JSON safety</p>
              <p className="mt-2 text-sm font-black text-slate-950">{jsonSafety.ok ? "Valid / aman" : jsonSafety.error}</p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-stone-100 bg-slate-950 p-4 text-slate-100">
            <div className="mb-2 flex items-center gap-2 text-sm font-bold text-emerald-300">
              <FileSearch className="h-4 w-4" /> Sanitized output
            </div>
            <pre className="whitespace-pre-wrap break-words text-sm leading-6">{customReport.sanitizedOutput}</pre>
          </div>

          <div className="mt-5 space-y-3">
            {customReport.findings.map((finding) => (
              <div key={`${finding.category}-${finding.label}`} className="rounded-2xl border border-stone-100 bg-stone-50 p-4">
                <div className="flex items-start gap-3">
                  {finding.severity === "info" ? (
                    <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-700" />
                  ) : (
                    <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-700" />
                  )}
                  <div>
                    <p className="font-extrabold text-slate-950">{finding.label}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {finding.category} · {finding.severity}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-650">{finding.recommendation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <Activity className="h-6 w-6 text-emerald-700" />
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Batch result</p>
            <h2 className="text-xl font-black text-slate-950">Hasil simulasi seluruh payload</h2>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {simulationReports.map(({ payload, report }) => (
            <div key={payload.id} className="rounded-2xl border border-stone-100 bg-stone-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-extrabold text-slate-950">{payload.label}</p>
                  <p className="mt-1 text-sm text-slate-600">{payload.expectedDefense}</p>
                </div>
                <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-black ring-1 ${decisionClass[report.decision]}`}>
                  {decisionLabel[report.decision]}
                </span>
              </div>
              <p className="mt-3 text-xs font-bold uppercase tracking-widest text-slate-500">Risk score: {report.riskScore}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5 text-sm leading-7 text-emerald-950">
        <p className="font-black">Payload aktif: {activePayload?.label}</p>
        <p>
          Defensive programming di halaman ini adalah lapisan frontend. Untuk produksi, tetap wajib tambah validasi backend,
          rate limiting server-side, audit log, autentikasi kuat, dan proteksi deployment seperti WAF/security headers.
        </p>
      </section>
    </div>
  );
};
