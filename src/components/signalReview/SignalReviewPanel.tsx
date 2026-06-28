import React, { useState, useEffect } from "react";
import { X, Save, AlertCircle, Trash2 } from "lucide-react";
import type { CivicFeedbackSignal } from "../../types";

interface SignalReviewPanelProps {
  signal: CivicFeedbackSignal;
  onSave: (updated: CivicFeedbackSignal) => void;
  onDelete?: (id: string) => void;
  onClose: () => void;
}

export const SignalReviewPanel: React.FC<SignalReviewPanelProps> = ({
  signal,
  onSave,
  onDelete,
  onClose,
}) => {
  const [formData, setFormData] = useState<CivicFeedbackSignal>({ ...signal });

  useEffect(() => {
    setFormData({ ...signal });
  }, [signal]);

  const handleChange = (
    key: keyof CivicFeedbackSignal,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      reviewedAt: new Date().toISOString().split("T")[0],
    });
  };

  const districts = ["Purwokerto Utara", "Purwokerto Timur", "Purwokerto Selatan", "Purwokerto Barat", "Unknown"];
  const categories = [
    "Drainage",
    "Waste",
    "Traffic",
    "Road Damage",
    "Street Lighting",
    "Public Facility",
    "Public Service",
    "UMKM/Public Space",
    "Student Mobility",
    "Other",
  ];
  const urgencies = ["Low", "Medium", "High", "Critical"];
  const statuses = ["Needs Review", "Reviewed", "Validated", "Rejected"];
  const feedbackTypes = ["Complaint", "Criticism", "Suggestion", "Appreciation"];
  const sourceTypes = [
    "Mock",
    "Manual Import",
    "Open Data",
    "Complaint-Derived",
    "Social Media Import",
    "Needs Verification",
  ];

  const indicators = [
    { value: "trafficIndex", label: "Indeks Kemacetan Lalu Lintas" },
    { value: "wasteIndex", label: "Indeks Penumpukan Sampah" },
    { value: "drainageFloodIndex", label: "Indeks Kerawanan Banjir/Drainase" },
    { value: "roadInfraIndex", label: "Indeks Kerusakan Jalan" },
    { value: "publicServicePressureIndex", label: "Indeks Tekanan Layanan Publik" },
    { value: "studentMobilityIndex", label: "Indeks Mobilitas Pelajar/Mahasiswa" },
    { value: "complaintUrgencyIndex", label: "Indeks Urgensi Keluhan Warga" },
    { value: "resolutionAccountabilityIndex", label: "Indeks Akuntabilitas Penyelesaian" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="flex h-full w-full max-w-lg flex-col rounded-2xl bg-white shadow-2xl border border-stone-250 animate-in slide-in-from-right duration-250">
        {/* Panel Header */}
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
          <div>
            <h3 className="text-sm font-extrabold text-slate-950">
              Tinjau & Validasi Sinyal
            </h3>
            <p className="text-[11px] font-semibold text-slate-500">
              ID: {formData.id}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-stone-100 hover:text-slate-800 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Panel Form */}
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-y-auto p-5 space-y-4">
          <div className="rounded-xl bg-amber-50/70 border border-amber-100 p-3 flex gap-2">
            <AlertCircle className="h-4.5 w-4.5 text-amber-700 shrink-0 mt-0.5" />
            <p className="text-[11px] font-semibold text-amber-900 leading-relaxed">
              <strong>Panduan Tinjauan:</strong> Pastikan kategori, kecamatan, dan indikator terkait telah disesuaikan agar perhitungan indeks kerawanan wilayah tetap akurat dan relevan bagi perencanaan daerah.
            </p>
          </div>

          {/* Title */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-650 uppercase tracking-wider">
              Judul Masalah
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:border-emerald-500 focus:outline-none"
              placeholder="Contoh: Penumpukan Sampah Liar dekat Pasar"
            />
          </div>

          {/* Summary */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-650 uppercase tracking-wider">
              Ringkasan Kasus / Deskripsi Sinyal
            </label>
            <textarea
              required
              rows={3}
              value={formData.summary}
              onChange={(e) => handleChange("summary", e.target.value)}
              className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:border-emerald-500 focus:outline-none resize-none"
              placeholder="Jelaskan secara singkat mengenai isu, lokasi umum, dan dampaknya."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* District */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-650 uppercase tracking-wider">
                Kecamatan (Wilayah)
              </label>
              <select
                value={formData.district}
                onChange={(e) => handleChange("district", e.target.value)}
                className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:border-emerald-500 focus:outline-none"
              >
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d === "Unknown" ? "Unknown (Unmapped)" : d}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-650 uppercase tracking-wider">
                Kategori Isu
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:border-emerald-500 focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Urgency */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-650 uppercase tracking-wider">
                Tingkat Urgensi
              </label>
              <select
                value={formData.urgency}
                onChange={(e) => handleChange("urgency", e.target.value)}
                className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:border-emerald-500 focus:outline-none"
              >
                {urgencies.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>

            {/* Feedback Type */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-650 uppercase tracking-wider">
                Tipe Sinyal Umpan Balik
              </label>
              <select
                value={formData.feedbackType}
                onChange={(e) => handleChange("feedbackType", e.target.value)}
                className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:border-emerald-500 focus:outline-none"
              >
                {feedbackTypes.map((t) => (
                  <option key={t} value={t}>
                    {t === "Complaint" ? "Complaint (Keluhan)" : t === "Criticism" ? "Criticism (Kritik)" : t === "Suggestion" ? "Suggestion (Saran)" : "Appreciation (Apresiasi)"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Related Indicator */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-650 uppercase tracking-wider">
              Indikator Terkait (Sistem)
            </label>
            <select
              value={formData.relatedIndicator}
              onChange={(e) => handleChange("relatedIndicator", e.target.value)}
              className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:border-emerald-500 focus:outline-none"
            >
              {indicators.map((ind) => (
                <option key={ind.value} value={ind.value}>
                  {ind.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Source Type */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-650 uppercase tracking-wider">
                Tipe Sumber Data
              </label>
              <select
                value={formData.sourceType}
                onChange={(e) => handleChange("sourceType", e.target.value)}
                className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:border-emerald-500 focus:outline-none"
              >
                {sourceTypes.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Source Label */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-650 uppercase tracking-wider">
                Label Sumber
              </label>
              <input
                type="text"
                required
                value={formData.sourceLabel}
                onChange={(e) => handleChange("sourceLabel", e.target.value)}
                className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:border-emerald-500 focus:outline-none"
                placeholder="Contoh: Media Sosial, Petugas Lapangan"
              />
            </div>
          </div>

          {/* Validation Status & Confidence Score */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-650 uppercase tracking-wider">
                Status Validasi
              </label>
              <select
                value={formData.validationStatus}
                onChange={(e) => handleChange("validationStatus", e.target.value)}
                className="rounded-xl border border-amber-300 bg-amber-50/20 px-3 py-2 text-xs font-bold text-amber-900 focus:border-amber-500 focus:outline-none"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s === "Needs Review" ? "Needs Review (Perlu Tinjauan)" : s === "Reviewed" ? "Reviewed (Tinjauan Selesai)" : s === "Validated" ? "Validated (Sah & Terverifikasi)" : "Rejected (Ditolak)"}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-slate-650 uppercase tracking-wider">
                  Skor Keyakinan AI
                </label>
                <span className="text-xs font-extrabold text-slate-800">
                  {formData.confidenceScore}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.confidenceScore}
                onChange={(e) => handleChange("confidenceScore", parseInt(e.target.value, 10))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-stone-200 accent-emerald-800 my-3"
              />
            </div>
          </div>

          {/* Footer Actions inside form */}
          <div className="mt-auto pt-5 border-t border-stone-100 flex items-center justify-between gap-3">
            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(formData.id)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2.5 text-xs font-bold transition shadow-sm"
              >
                <Trash2 className="h-4 w-4" />
                Hapus
              </button>
            )}
            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-slate-600 px-4 py-2.5 text-xs font-bold transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-850 hover:bg-emerald-950 text-white px-5 py-2.5 text-xs font-black transition shadow-sm"
              >
                <Save className="h-4 w-4" />
                Simpan Perubahan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
