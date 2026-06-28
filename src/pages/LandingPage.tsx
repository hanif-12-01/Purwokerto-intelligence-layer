import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  MapPinned,
  Sliders,
  CheckCircle2,
  Shield,
  MessagesSquare,
  ClipboardCheck,
  ChevronRight,
} from "lucide-react";
import { purwokertoDistricts } from "../data/purwokertoDistricts";
import { calculatePriorityScore, getPriorityStatus } from "../utils/scoring";
import menaraTerataiImg from "../assets/Menara Teratai.jpg";

export const LandingPage: React.FC = () => {
  // Let's get the highest priority district or first district for preview
  const previewDistrict = purwokertoDistricts.reduce((prev, current) => {
    return calculatePriorityScore(current) > calculatePriorityScore(prev) ? current : prev;
  }, purwokertoDistricts[0]);

  const previewScore = calculatePriorityScore(previewDistrict);
  const previewStatus = getPriorityStatus(previewScore);

  return (
    <div className="space-y-20 pb-12">
      {/* 2. Hero Section */}
      <section className="grid items-center gap-12 lg:grid-cols-12 lg:py-4">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/90 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-emerald-900 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            Prototipe Intelijen Publik • Purwokerto
          </div>

          <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl leading-[1.08]">
            Purwokerto <br className="hidden sm:inline" />
            <span className="text-emerald-900">Intelligence Layer</span>
          </h1>

          <p className="text-lg font-bold leading-relaxed text-slate-900 sm:text-xl">
            Prototipe intelijen publik untuk pemetaan prioritas perkotaan dan dukungan pengambilan keputusan publik.
          </p>

          <p className="max-w-xl text-base leading-relaxed text-slate-605">
            Dirancang untuk membantu memvisualisasikan indikator perkotaan simulasi, mengklasifikasikan prioritas warga, dan mendukung pengambilan keputusan yang transparan untuk wilayah perkotaan Purwokerto.
          </p>

          <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white px-6 py-3.5 text-sm font-bold shadow-md shadow-emerald-900/10 transition"
            >
              Buka Dasbor
              <ArrowRight className="h-4.5 w-4.5" />
            </Link>
            <Link
              to="/methodology"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-250 bg-white hover:bg-stone-50 px-6 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition"
            >
              Lihat Metodologi
            </Link>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 max-w-lg">
            <Shield className="h-4 w-4 text-emerald-800 flex-shrink-0" />
            <span>Prototipe edukasi menggunakan data simulasi. Bukan platform resmi pemerintah.</span>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 relative">
          <div className="absolute -left-6 -top-6 h-36 w-36 rounded-full bg-amber-300/20 blur-3xl" />
          <div className="absolute -right-6 -bottom-6 h-36 w-36 rounded-full bg-emerald-350/20 blur-3xl" />

          {/* Premium Visual Card */}
          <div className="relative overflow-hidden rounded-[2.5rem] border border-stone-200/80 bg-white p-4 shadow-xl shadow-slate-900/5">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-stone-100 relative group">
              <img
                src={menaraTerataiImg}
                alt="Menara Teratai Purwokerto"
                className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <span className="text-xs font-bold uppercase tracking-wider bg-slate-900/70 backdrop-blur px-3 py-1 rounded-full border border-white/10">
                  Landmark Menara Teratai
                </span>
                <span className="text-xs font-semibold text-slate-100">
                  Banyumas, Jawa Tengah
                </span>
              </div>
            </div>

            {/* Small Elegant Overlay Card */}
            <div className="mt-4 rounded-2xl border border-amber-100 bg-amber-50/90 p-4 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-850">
                      Pratinjau Sinyal Wilayah
                    </p>
                  </div>
                  <h3 className="font-extrabold text-slate-950 text-base">
                    Kecamatan {previewDistrict.name}
                  </h3>
                </div>
                <span className="rounded-lg bg-emerald-800 text-white px-2.5 py-1 text-xs font-bold shadow-sm">
                  Skor Prioritas: {Math.round(previewScore)}
                </span>
              </div>

              <div className="mt-3.5 grid grid-cols-3 gap-2 border-t border-amber-200/60 pt-3 text-center">
                <div className="space-y-0.5">
                  <p className="text-[10px] font-bold text-amber-900/75 uppercase tracking-wide">
                    Urgensi
                  </p>
                  <p className="text-xs font-extrabold text-slate-900">
                    {previewStatus === "Critical" ? "Kritis" : previewStatus === "High" ? "Tinggi" : previewStatus === "Medium" ? "Sedang" : "Rendah"}
                  </p>
                </div>
                <div className="space-y-0.5 border-x border-amber-200/60">
                  <p className="text-[10px] font-bold text-amber-900/75 uppercase tracking-wide">
                    Cakupan
                  </p>
                  <p className="text-xs font-extrabold text-slate-900">
                    100% Simulasi
                  </p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] font-bold text-amber-900/75 uppercase tracking-wide">
                    Validasi
                  </p>
                  <p className="text-xs font-extrabold text-emerald-950 flex items-center justify-center gap-0.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-800 inline" /> Dengan Manusia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Key Metrics Strip */}
      <section className="rounded-3xl border border-stone-200/80 bg-white/70 shadow-sm backdrop-blur p-6">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-stone-200/85">
          <div className="flex flex-col items-center justify-center text-center p-2 sm:p-0">
            <span className="text-3xl font-black text-slate-950">4</span>
            <span className="mt-1 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Kecamatan Fokus
            </span>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-2 sm:p-0 pt-6 sm:pt-0">
            <span className="text-3xl font-black text-emerald-900">100%</span>
            <span className="mt-1 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Penilaian Berbasis Aturan
            </span>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-2 sm:p-0 pt-6 sm:pt-0">
            <span className="text-3xl font-black text-slate-950">Simulasi</span>
            <span className="mt-1 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Model Data Publik
            </span>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-2 sm:p-0 pt-6 sm:pt-0">
            <span className="text-3xl font-black text-emerald-900">Tervalidasi</span>
            <span className="mt-1 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Pendampingan Manusia
            </span>
          </div>
        </div>
      </section>

      {/* 4. Feature Section */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-900">
            Kemampuan Sistem
          </p>
          <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Dibangun untuk Dukungan Keputusan Publik
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Mengeksplorasi metodologi peringkat prioritas, klasifikasi sinyal warga, dan alat visual untuk pembangunan daerah.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Pemetaan Prioritas Perkotaan",
              description: "Mengagregasi indeks (lalu lintas, sampah, akses layanan, mobilitas siswa) ke dalam peta prioritas wilayah.",
              icon: MapPinned,
            },
            {
              title: "Intelijen Umpan Balik Warga",
              description: "Mengklasifikasikan aspirasi warga simulasi (keluhan, saran, apresiasi) berdasarkan tingkat urgensi.",
              icon: MessagesSquare,
            },
            {
              title: "Akuntabilitas Resolusi",
              description: "Melacak laporan penyelesaian prototipe dan tag status untuk mensimulasikan rencana aksi dan transparansi.",
              icon: ClipboardCheck,
            },
            {
              title: "Simulasi Kebijakan",
              description: "Mensimulasikan bobot indikator secara dinamis untuk melihat pratinjau prioritas hipotetis berdasarkan fokus strategis.",
              icon: Sliders,
            },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-stone-200/70 bg-white p-6 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="inline-flex rounded-xl bg-emerald-50 p-2.5 text-emerald-800 ring-1 ring-emerald-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base">{feature.title}</h3>
                  <p className="text-xs leading-relaxed text-slate-500">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Focus Area Section */}
      <section className="rounded-3xl border border-stone-200/80 bg-white/50 p-8 shadow-sm backdrop-blur space-y-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-900">
              Cakupan Wilayah
            </p>
            <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              Area Fokus Geografis
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              Analisis awal mencakup empat kecamatan utama dari pusat perkotaan Purwokerto, mencerminkan pola mobilitas yang beragam, populasi universitas, dan pusat ekonomi.
            </p>
          </div>
          <Link
            to="/simulator"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 hover:text-emerald-900 transition self-start md:self-auto"
          >
            Bandingkan Bobot Wilayah <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {purwokertoDistricts.map((district) => {
            const score = calculatePriorityScore(district);
            const status = getPriorityStatus(score);
            
            // Assign badges based on score status
            const getStatusColor = (st: string) => {
              if (st === "Critical") return "bg-red-50 text-red-700 border-red-200/70";
              if (st === "High") return "bg-amber-50 text-amber-800 border-amber-200/70";
              if (st === "Medium") return "bg-blue-50 text-blue-700 border-blue-200/70";
              return "bg-emerald-50 text-emerald-700 border-emerald-200/70";
            };

            const translateStatus = (st: string) => {
              if (st === "Critical") return "Kritis";
              if (st === "High") return "Tinggi";
              if (st === "Medium") return "Sedang";
              return "Rendah";
            };

            return (
              <div
                key={district.id}
                className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm hover:shadow-md transition duration-300 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-sm">Kecamatan {district.name}</h3>
                  <span className={`text-[10px] font-extrabold uppercase tracking-wide border px-2 py-0.5 rounded-md ${getStatusColor(status)}`}>
                    {translateStatus(status)}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Skor Prioritas</span>
                    <span className="font-bold text-slate-900">{Math.round(score)}/100</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-stone-100 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full ${score >= 85 ? "bg-red-500" : score >= 70 ? "bg-amber-500" : score >= 50 ? "bg-blue-500" : "bg-emerald-500"}`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 leading-normal italic border-t border-stone-150 pt-2.5">
                  "{district.shortInsight}"
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Final CTA Section */}
      <section className="rounded-[2.5rem] border border-emerald-800/10 bg-gradient-to-br from-emerald-900 to-emerald-950 p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute left-0 bottom-0 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Jelajahi prototipe intelijen publik Purwokerto.
          </h2>
          <p className="text-emerald-100 text-base max-w-lg mx-auto leading-relaxed">
            Mulai dari dasbor untuk meninjau prioritas kecamatan simulasi, menjelajahi sinyal visual, dan menyesuaikan konfigurasi penilaian indikator.
          </p>

          <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-center pt-2">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 px-6 py-3.5 text-sm font-bold shadow-lg shadow-amber-950/20 transition"
            >
              Buka Pusat Kendali
              <ArrowRight className="h-4.5 w-4.5" />
            </Link>
            <Link
              to="/methodology"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 hover:bg-white/10 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition"
            >
              Baca Metodologi
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Disclaimer Notice */}
      <section className="max-w-3xl mx-auto text-center px-4">
        <p className="text-xs text-slate-500 leading-relaxed">
          <strong>Pemberitahuan Transparansi:</strong> Proyek ini adalah prototipe teknologi sipil yang dikembangkan untuk tujuan pembelajaran dan portofolio rekayasa perangkat lunak. Semua data, skor, indeks, dan laporan yang ditampilkan di sini adalah simulasi tiruan. Ini tidak mewakili perencanaan aktual atau tindakan resmi dari Pemerintah Kabupaten Banyumas atau otoritas administratif mana pun di Purwokerto.
        </p>
      </section>
    </div>
  );
};
