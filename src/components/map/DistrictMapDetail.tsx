import React from "react";
import type { DistrictIndicatorProfile } from "../../types";
import { calculatePriorityScore, getPriorityStatus, getConfidenceLevel, getStatusClasses } from "../../utils/scoring";
import { ProgressBar } from "../ui/ProgressBar";

interface DistrictMapDetailProps {
  district: DistrictIndicatorProfile;
}

const statusProgressColors = {
  Critical: "bg-red-600",
  High: "bg-orange-500",
  Medium: "bg-sky-500",
  Low: "bg-emerald-500",
};

export const DistrictMapDetail: React.FC<DistrictMapDetailProps> = ({ district }) => {
  const score = calculatePriorityScore(district);
  const status = getPriorityStatus(score);
  const confidence = getConfidenceLevel(district.dataConfidenceScore);

  const getDistrictIntelligenceNote = (id: string) => {
    switch (id) {
      case "pwt-utara":
        return "Area aktivitas pendidikan dan kampus. Mobilitas mahasiswa dan tekanan area kampus memerlukan validasi lebih lanjut.";
      case "pwt-timur":
        return "Pusat aktivitas pelayanan publik dan administratif. Tindak lanjut pengaduan dan tekanan pelayanan harus dipantau.";
      case "pwt-barat":
        return "Area pemukiman-komersial perkotaan yang padat. Ruang jalan, mobilitas, dan sinyal infrastruktur memerlukan perhatian.";
      case "pwt-selatan":
        return "Koridor mobilitas dan populasi besar. Sinyal infrastruktur jalan, drainase, dan persampahan memerlukan peninjauan.";
      default:
        return "Zona prioritas warga. Pantau indikator dan tinjau jadwal respons.";
    }
  };

  const indonesianStatus: Record<string, string> = {
    Critical: "Kritis",
    High: "Tinggi",
    Medium: "Sedang",
    Low: "Rendah",
  };

  const indonesianConfidence: Record<string, string> = {
    Strong: "Kuat",
    Moderate: "Sedang",
    Weak: "Lemah",
  };

  const indonesianSourceStatus: Record<string, string> = {
    Mock: "Data Simulasi",
    "Open Data Ready": "Data Terbuka Siap",
    "Complaint-Derived": "Berasal dari Pengaduan",
    "Needs Verification": "Memerlukan Verifikasi",
  };

  return (
    <div className="space-y-4">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Fokus Wilayah</span>
        <h3 className="mt-0.5 text-lg font-extrabold text-slate-950">{district.name}</h3>
        <p className="mt-1 text-xs text-slate-500">{district.urbanRole}</p>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Skor Prioritas Warga</span>
            <p className="mt-1 text-3xl font-black text-slate-950">{score}</p>
          </div>
          <div className="text-right">
            <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-bold ${getStatusClasses(status)}`}>
              {indonesianStatus[status] || status}
            </span>
            <p className="mt-1.5 text-[9px] font-medium text-slate-500">Keyakinan Data: {indonesianConfidence[confidence] || confidence}</p>
          </div>
        </div>
        <div className="mt-3">
          <ProgressBar value={score} colorClass={statusProgressColors[status]} />
        </div>
      </div>

      <div className="space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Indeks Indikator</h4>
        {[
          { label: "Indeks Lalu Lintas", val: district.trafficIndex, color: "bg-blue-600" },
          { label: "Indeks Sampah", val: district.wasteIndex, color: "bg-amber-500" },
          { label: "Indeks Drainase & Banjir", val: district.drainageFloodIndex, color: "bg-sky-600" },
          { label: "Infrastruktur Jalan", val: district.roadInfraIndex, color: "bg-stone-600" },
          { label: "Tekanan Pelayanan Publik", val: district.publicServicePressureIndex, color: "bg-indigo-600" },
          { label: "Indeks Mobilitas Pelajar", val: district.studentMobilityIndex, color: "bg-teal-600" },
          { label: "Indeks Urgensi Laporan", val: district.complaintUrgencyIndex, color: "bg-red-500" },
          { label: "Akuntabilitas Resolusi", val: district.resolutionAccountabilityIndex, color: "bg-emerald-600" },
          { label: "Skor Keyakinan Data", val: district.dataConfidenceScore, color: "bg-indigo-500" },
        ].map((indicator) => (
          <div key={indicator.label} className="text-xs">
            <div className="mb-1 flex justify-between font-bold text-slate-700">
              <span>{indicator.label}</span>
              <span>{indicator.val}/100</span>
            </div>
            <ProgressBar value={indicator.val} colorClass={indicator.color} />
          </div>
        ))}
      </div>

      <div className="divide-y divide-stone-150 border-t border-stone-150 pt-2 text-xs">
        <div className="py-2.5">
          <span className="block font-bold uppercase tracking-wide text-slate-500">Masalah Perkotaan Dominan</span>
          <p className="mt-1 leading-normal text-slate-700">{district.dominantIssue}</p>
        </div>
        <div className="py-2.5">
          <span className="block font-bold uppercase tracking-wide text-slate-500">Rekomendasi Tindakan</span>
          <p className="mt-1 leading-normal text-slate-700">{district.recommendedAction}</p>
        </div>
        <div className="py-2.5">
          <span className="block font-bold uppercase tracking-wide text-slate-500">Status Sumber</span>
          <p className="mt-1 leading-normal text-slate-700">{indonesianSourceStatus[district.sourceStatus] || district.sourceStatus}</p>
        </div>
        <div className="py-2.5">
          <span className="block font-bold uppercase tracking-wide text-slate-500">Catatan Intelijen Publik</span>
          <p className="mt-1 leading-normal text-slate-700 italic">
            {getDistrictIntelligenceNote(district.id)}
          </p>
        </div>
      </div>
    </div>
  );
};
