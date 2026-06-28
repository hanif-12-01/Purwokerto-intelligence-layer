import React from "react";

interface FilterState {
  district: string;
  category: string;
  urgency: string;
  validationStatus: string;
  feedbackType: string;
}

interface SignalFilterBarProps {
  filters: FilterState;
  onChangeFilters: (filters: FilterState) => void;
  onReset: () => void;
}

export const SignalFilterBar: React.FC<SignalFilterBarProps> = ({
  filters,
  onChangeFilters,
  onReset,
}) => {
  const handleChange = (key: keyof FilterState, value: string) => {
    onChangeFilters({
      ...filters,
      [key]: value,
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

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
          Filter Sinyal Umpan Balik
        </h3>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-bold text-emerald-850 hover:text-emerald-950 underline self-start sm:self-auto"
        >
          Reset Filter
        </button>
      </div>

      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {/* District */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Wilayah/Kecamatan
          </label>
          <select
            value={filters.district}
            onChange={(e) => handleChange("district", e.target.value)}
            className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs font-semibold text-slate-700 focus:border-emerald-500 focus:outline-none"
          >
            <option value="">Semua Wilayah</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d === "Unknown" ? "Unmapped / Unknown" : d}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Kategori Indikator
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs font-semibold text-slate-700 focus:border-emerald-500 focus:outline-none"
          >
            <option value="">Semua Kategori</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Urgency */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Tingkat Urgensi
          </label>
          <select
            value={filters.urgency}
            onChange={(e) => handleChange("urgency", e.target.value)}
            className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs font-semibold text-slate-700 focus:border-emerald-500 focus:outline-none"
          >
            <option value="">Semua Urgensi</option>
            {urgencies.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Status Validasi
          </label>
          <select
            value={filters.validationStatus}
            onChange={(e) => handleChange("validationStatus", e.target.value)}
            className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs font-semibold text-slate-700 focus:border-emerald-500 focus:outline-none"
          >
            <option value="">Semua Status</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s === "Needs Review" ? "Perlu Tinjauan" : s === "Reviewed" ? "Telah Ditinjau" : s === "Validated" ? "Tervalidasi" : "Ditolak"}
              </option>
            ))}
          </select>
        </div>

        {/* Feedback Type */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Tipe Sinyal
          </label>
          <select
            value={filters.feedbackType}
            onChange={(e) => handleChange("feedbackType", e.target.value)}
            className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs font-semibold text-slate-700 focus:border-emerald-500 focus:outline-none text-left"
          >
            <option value="">Semua Tipe</option>
            {feedbackTypes.map((t) => (
              <option key={t} value={t}>
                {t === "Complaint" ? "Keluhan" : t === "Criticism" ? "Kritik" : t === "Suggestion" ? "Saran" : "Apresiasi"}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
