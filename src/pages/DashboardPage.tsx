import React, { useState } from "react";
import { Link } from "react-router-dom";
import { purwokertoDistricts } from "../data/purwokertoDistricts";
import { getStoredData } from "../utils/storage";
import type { DistrictIndicatorProfile } from "../types";
import { MapLayerControls, type MapLayerType } from "../components/map/MapLayerControls";
import { MapLegend } from "../components/map/MapLegend";
import { PriorityMapCanvas } from "../components/map/PriorityMapCanvas";
import { DistrictMapDetail } from "../components/map/DistrictMapDetail";
import {
  calculatePriorityScore,

  getPriorityStatus,
  getConfidenceLevel,
  getStatusClasses,
} from "../utils/scoring";
import {
  BarChart3,
  MapPinned,
  Sliders,
  MessagesSquare,
  FileText,
  ClipboardCheck,
  ChevronRight,
  TrendingUp,
  Activity,
  Layers,
  ShieldCheck,

  AlertCircle,
  HelpCircle,
  FileSpreadsheet,
} from "lucide-react";

export const DashboardPage: React.FC = () => {
  const [districtProfiles] = useState<DistrictIndicatorProfile[]>(() =>
    getStoredData<DistrictIndicatorProfile[]>("pwt_district_profiles", purwokertoDistricts)
  );
  const [selectedId, setSelectedId] = useState<string>("pwt-utara");
  const [selectedLayer, setSelectedLayer] = useState<MapLayerType>("Priority");

  const processedDistricts = districtProfiles.map((district) => {

    const score = calculatePriorityScore(district);
    const status = getPriorityStatus(score);
    const confidence = getConfidenceLevel(district.dataConfidenceScore);
    return { district, score, status, confidence };
  });

  const totalFocusAreas = processedDistricts.length;
  const avgScore = processedDistricts.reduce((acc, curr) => acc + curr.score, 0) / totalFocusAreas;
  const highPriorityCount = processedDistricts.filter((d) => d.status === "High" || d.status === "Critical").length;
  const avgConfidence =
    processedDistricts.reduce((acc, curr) => acc + curr.district.dataConfidenceScore, 0) / totalFocusAreas;

  // Let's count districts whose data is "Needs Verification" or "Complaint-Derived" as needing review
  const signalsNeedingReview = processedDistricts.filter(
    (d) => d.district.sourceStatus === "Needs Verification" || d.district.sourceStatus === "Complaint-Derived"
  ).length;

  const metrics = [
    {
      label: "Total Wilayah Fokus",
      value: totalFocusAreas,
      icon: MapPinned,
      tone: "bg-emerald-50 text-emerald-800 border-emerald-100",
    },
    {
      label: "Rerata Skor Prioritas",
      value: Math.round(avgScore * 10) / 10,
      icon: TrendingUp,
      tone: "bg-emerald-50 text-emerald-800 border-emerald-100",
    },
    {
      label: "Area Tinggi/Kritis",
      value: highPriorityCount,
      icon: AlertCircle,
      tone: "bg-amber-50 text-amber-800 border-amber-100",
    },
    {
      label: "Rerata Keyakinan Data",
      value: `${Math.round(avgConfidence)}%`,
      icon: ShieldCheck,
      tone: "bg-sky-50 text-sky-800 border-sky-100",
    },
    {
      label: "Sinyal Perlu Verifikasi",
      value: signalsNeedingReview,
      icon: Activity,
      tone: "bg-stone-50 text-slate-800 border-stone-200",
    },
  ];

  const modules = [
    {
      title: "Peta Prioritas",
      description: "Peta GIS interaktif kecamatan inti Purwokerto yang menunjukkan prioritas berdasarkan batas wilayah.",
      path: "/priority-map",
      icon: MapPinned,
    },
    {
      title: "Sinyal Umpan Balik Warga",
      description: "Laporan umpan balik simulasi terklasifikasi yang menunjukkan sinyal warga lokal.",
      path: "/feedback",
      icon: MessagesSquare,
    },
    {
      title: "Simulator Kebijakan",
      description: "Sesuaikan prioritas metrik secara dinamis dan evaluasi hasil peringkat wilayah alternatif.",
      path: "/simulator",
      icon: Sliders,
    },
    {
      title: "Draf Ringkasan Kebijakan",
      description: "Akses laporan terstruktur hasil simulasi AI dengan indikator utama dan saran tindakan.",
      path: "/policy-brief",
      icon: FileText,
    },
    {
      title: "Akuntabilitas Resolusi",
      description: "Jelajahi status penyelesaian, rincian laporan, dan batasan validasi lapangan.",
      path: "/accountability",
      icon: ClipboardCheck,
    },
    {
      title: "Transparansi Sumber Data",
      description: "Lihat statistik agregat dan ringkasan kepatuhan administratif.",
      path: "/transparency",
      icon: FileSpreadsheet,
    },
  ];

  const confidenceClasses = {
    Strong: "bg-emerald-100 text-emerald-900 border-emerald-250",
    Moderate: "bg-sky-100 text-sky-900 border-sky-250",
    Weak: "bg-amber-100 text-amber-900 border-amber-250",
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Card */}
      <section className="rounded-3xl border border-stone-200 bg-white/70 p-6 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-800 shadow-sm">
              <BarChart3 className="h-3.5 w-3.5" /> Ikhtisar Intelijen Publik
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              Ikhtisar Prioritas Purwokerto
            </h1>
            <p className="text-sm leading-relaxed text-slate-600">
              Ikhtisar intelijen publik untuk membaca sinyal prioritas layanan di seluruh pusat perkotaan Purwokerto.
            </p>
          </div>
          <div className="self-start md:self-auto rounded-xl border border-amber-200 bg-amber-50/85 px-4 py-2.5 text-xs font-bold text-amber-900 shadow-sm">
            Data Simulasi • Bukan sistem resmi pemerintah
          </div>
        </div>
      </section>

      {/* 2. Statistical Metric Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
            >
              <div className={`rounded-xl p-2.5 border shrink-0 ${metric.tone}`}>
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 truncate">
                  {metric.label}
                </span>
                <span className="text-lg font-black text-slate-900">
                  {metric.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2.5. Interactive GIS Priority Map */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-8">
          <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm space-y-4">
            <div className="space-y-1">
              <h2 className="text-lg font-extrabold text-slate-950 flex items-center gap-1.5">
                <MapPinned className="h-4.5 w-4.5 text-emerald-800" />
                Peta Prioritas Perkotaan GIS
              </h2>
              <p className="text-xs text-slate-500">
                Visualisasi spasial prioritas penanganan perkotaan di seluruh kecamatan Purwokerto. Klik penanda di peta untuk memilih wilayah.
              </p>
            </div>
            
            <PriorityMapCanvas
              districts={districtProfiles}
              selectedId={selectedId}
              selectedLayer={selectedLayer}
              onSelectDistrict={setSelectedId}
            />
            
            <div className="mt-4 pt-2 border-t border-stone-100">
              <MapLayerControls selectedLayer={selectedLayer} onSelectLayer={setSelectedLayer} />
            </div>
          </div>
        </div>
        <div className="space-y-4 lg:col-span-4">
          <section className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm h-full flex flex-col justify-between">
            <DistrictMapDetail district={processedDistricts.find(d => d.district.id === selectedId)?.district || districtProfiles[0]} />
            <div className="mt-4 pt-4 border-t border-stone-150">
              <MapLegend />
            </div>
          </section>
        </div>
      </div>

      {/* 3. Priority Ranking and Indicator Breakdown */}

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Priority Ranking Panel */}

        <section className="lg:col-span-5 rounded-3xl border border-stone-200 bg-white p-5 shadow-sm space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-extrabold text-slate-950 flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-emerald-800" />
              Peringkat Prioritas
            </h2>
            <p className="text-xs text-slate-500">
              Peringkat kecamatan berdasarkan bobot prioritas indikator berbasis penelitian.
            </p>
          </div>

          <div className="divide-y divide-stone-150">
            {[...processedDistricts]
              .sort((a, b) => b.score - a.score)
              .map((item, index) => {
                const translateStatus = (st: string) => {
                  if (st === "Critical") return "Kritis";
                  if (st === "High") return "Tinggi";
                  if (st === "Medium") return "Sedang";
                  return "Rendah";
                };

                const translateConfidence = (cf: string) => {
                  if (cf === "Strong") return "Kuat";
                  if (cf === "Moderate") return "Sedang";
                  return "Lemah";
                };

                return (
                  <div key={item.district.id} className="py-4 flex flex-col gap-2 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-400">#{index + 1}</span>
                          <h3 className="font-extrabold text-slate-900 text-sm truncate">Kecamatan {item.district.name}</h3>
                        </div>

                        <p className="mt-1 text-xs text-slate-600 font-medium">
                          <strong className="text-slate-800">Peran:</strong> {item.district.urbanRole}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-black text-slate-900">Skor: {Math.round(item.score)}</p>
                        <div className="mt-1 flex items-center gap-1.5 justify-end">
                          <span
                            className={`inline-block border rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${getStatusClasses(
                              item.status
                            )}`}
                          >
                            {translateStatus(item.status)}
                          </span>
                          <span
                            className={`inline-block border rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                              confidenceClasses[item.confidence]
                            }`}
                          >
                            {translateConfidence(item.confidence)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-[11px] leading-relaxed text-slate-600 bg-stone-50 border border-stone-100 rounded-xl p-2.5">
                      <p>
                        <strong className="text-slate-800 block mb-0.5">Masalah Dominan:</strong>
                        {item.district.dominantIssue}
                      </p>
                      <p className="mt-1.5 pt-1.5 border-t border-stone-200/60">
                        <strong className="text-emerald-800 block mb-0.5">Tindakan Disarankan:</strong>
                        {item.district.recommendedAction}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>


        {/* Indicator Breakdown */}
        <section className="lg:col-span-7 rounded-3xl border border-stone-200 bg-white p-5 shadow-sm space-y-5">
          <div className="space-y-1">
            <h2 className="text-lg font-extrabold text-slate-950 flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4 text-emerald-800" />
              Rincian Indikator Kecamatan
            </h2>
            <p className="text-xs text-slate-500">
              Profil granular yang menunjukkan skor penggerak, tingkat keyakinan data, dan status verifikasi sumber.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {processedDistricts.map((item) => (
              <div key={item.district.id} className="rounded-2xl border border-stone-200 bg-stone-50/50 p-4 space-y-3.5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm">Kecamatan {item.district.name}</h3>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">
                      Sumber: {item.district.sourceStatus === "Open Data Ready" ? "Data Terbuka Tersedia" : item.district.sourceStatus === "Needs Verification" ? "Perlu Verifikasi" : item.district.sourceStatus === "Complaint-Derived" ? "Dari Keluhan Warga" : "Simulasi"}
                    </span>
                  </div>
                  <span
                    className={`inline-block border rounded-full px-2.5 py-0.5 text-[10px] font-bold ${getStatusClasses(
                      item.status
                    )}`}
                  >
                    {Math.round(item.score)} pt
                  </span>
                </div>

                <div className="space-y-2 text-[11px]">
                  {[
                    { label: "Indeks Lalu Lintas", val: item.district.trafficIndex, color: "bg-blue-600" },
                    { label: "Indeks Sampah", val: item.district.wasteIndex, color: "bg-amber-500" },
                    { label: "Drainase & Banjir", val: item.district.drainageFloodIndex, color: "bg-sky-600" },
                    { label: "Infrastruktur Jalan", val: item.district.roadInfraIndex, color: "bg-stone-600" },
                    {
                      label: "Beban Layanan Publik",
                      val: item.district.publicServicePressureIndex,
                      color: "bg-indigo-600",
                    },
                    { label: "Mobilitas Siswa", val: item.district.studentMobilityIndex, color: "bg-teal-600" },
                    { label: "Urgensi Keluhan", val: item.district.complaintUrgencyIndex, color: "bg-red-500" },
                    {
                      label: "Akuntabilitas Resolusi",
                      val: item.district.resolutionAccountabilityIndex,
                      color: "bg-emerald-600",
                    },
                  ].map((ind) => (
                    <div key={ind.label}>
                      <div className="flex justify-between font-semibold text-slate-700 mb-0.5">
                        <span>{ind.label}</span>
                        <span>{ind.val}</span>
                      </div>
                      <div className="h-1.5 w-full bg-stone-200/70 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${ind.color}`} style={{ width: `${ind.val}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-stone-200 pt-2 text-[10px] text-slate-550 leading-relaxed">
                  <strong className="text-slate-700 font-bold block mb-0.5">Wawasan Singkat:</strong>
                  {item.district.shortInsight}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 4. Civic Intelligence Notes & Guidelines */}
      <section className="rounded-3xl border border-stone-200 bg-amber-50/40 p-5 shadow-sm space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
          <HelpCircle className="h-4.5 w-4.5 text-amber-600" />
          Catatan Intelijen Publik
        </h2>
        <div className="grid gap-4 text-xs text-slate-650 sm:grid-cols-2 lg:grid-cols-4 leading-relaxed">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800">Berbasis Sinyal Saja</h3>
            <p>
              Sinyal keluhan diperlakukan sebagai indikasi lokal, bukan kebenaran mutlak. Urgensi memerlukan verifikasi.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800">Bobot Akuntabilitas</h3>
            <p>
              Tingkat penyelesaian ditampilkan sebagai konteks warga tetapi dikecualikan dari algoritma prioritas untuk mencegah kurangnya hukuman bagi sektor yang tidak terselesaikan dengan baik.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800 font-sans">Pelabelan Tingkat Keyakinan</h3>
            <p>
              Skor keyakinan data (Kuat, Sedang, Lemah) mencegah klaim berlebihan dan memberi sinyal di mana audit lapangan diperlukan.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800">Verifikasi Manusia Diperlukan</h3>
            <p>
              Semua wawasan prioritas memerlukan validasi manusia dan audit fisik sebelum alokasi anggaran publik.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Module Shortcut Cards */}
      <section className="space-y-3">
        <div className="space-y-0.5">
          <h2 className="text-lg font-extrabold text-slate-950">Modul Intelijen Publik</h2>
          <p className="text-xs text-slate-500">
            Akses rute prototipe spesifik untuk mengevaluasi indikator, penyesuaian bobot simulator, atau akuntabilitas resolusi.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <Link
                key={m.title}
                to={m.path}
                className="group block rounded-2xl border border-stone-200 bg-white p-4 shadow-sm hover:border-emerald-700/30 hover:shadow-md transition duration-200"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="rounded-xl p-2 bg-emerald-50 text-emerald-800 border border-emerald-100 group-hover:bg-emerald-900 group-hover:text-white transition duration-200">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-800 transition" />
                </div>
                <h3 className="mt-3.5 font-extrabold text-slate-900 text-sm group-hover:text-emerald-900 transition">
                  {m.title}
                </h3>
                <p className="mt-1 text-xs leading-normal text-slate-500">{m.description}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};
