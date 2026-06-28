import React, { useState } from "react";
import { ShieldAlert, Send, HelpCircle, CheckCircle2, Lock, List } from "lucide-react";
import type { PublicFeedbackSubmission } from "../../types";
import { sanitizeFeedback } from "../../utils/sanitizeFeedback";
import { getStoredData, setStoredData } from "../../utils/storage";

const STORAGE_KEY = "pil:public-feedback-submissions";

export const PublicFeedbackPage: React.FC = () => {
  // Local state for form fields
  const [feedbackType, setFeedbackType] = useState<PublicFeedbackSubmission["feedbackType"]>("Complaint");
  const [district, setDistrict] = useState<PublicFeedbackSubmission["district"]>("Purwokerto Utara");
  const [category, setCategory] = useState<PublicFeedbackSubmission["category"]>("Drainage");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [locationHint, setLocationHint] = useState("");
  const [urgency, setUrgency] = useState<PublicFeedbackSubmission["urgency"]>("Medium");

  // Status states
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Load existing submissions from localStorage
  const [submissions, setSubmissions] = useState<PublicFeedbackSubmission[]>(() => {
    return getStoredData<PublicFeedbackSubmission[]>(STORAGE_KEY, []);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setSuccessMessage(null);

    // Simple validation
    if (!title.trim()) {
      setValidationError("Judul masukan harus diisi.");
      return;
    }
    if (!summary.trim()) {
      setValidationError("Detail laporan/ringkasan harus diisi.");
      return;
    }

    // Sanitize user inputs to protect privacy
    const sanitizedTitle = sanitizeFeedback(title);
    const sanitizedSummary = sanitizeFeedback(summary);
    const sanitizedLocationHint = locationHint ? sanitizeFeedback(locationHint) : "";

    // Create submission object
    const newSubmission: PublicFeedbackSubmission = {
      id: `pub-sig-${Date.now().toString().slice(-4)}`,
      feedbackType,
      district,
      category,
      title: sanitizedTitle,
      summary: sanitizedSummary,
      locationHint: sanitizedLocationHint || undefined,
      urgency,
      validationStatus: "Needs Review",
      sourceType: "Public Submission",
      createdAt: new Date().toISOString().split("T")[0],
    };

    // Save to local storage
    const updatedSubmissions = [newSubmission, ...submissions];
    setSubmissions(updatedSubmissions);
    setStoredData(STORAGE_KEY, updatedSubmissions);

    // Clear form inputs
    setTitle("");
    setSummary("");
    setLocationHint("");
    setFeedbackType("Complaint");
    setDistrict("Purwokerto Utara");
    setCategory("Drainage");
    setUrgency("Medium");

    // Show success message
    setSuccessMessage("Your feedback has been saved locally as a prototype civic signal and still requires human review.");
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header section */}
      <div className="border-b border-stone-200 pb-5">
        <h1 className="text-2xl font-black text-slate-900 leading-tight">
          Submit Civic Feedback
        </h1>
        <p className="text-sm font-medium text-slate-600 mt-1">
          Share structured feedback about urban service signals in Purwokerto.
        </p>
        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs font-semibold text-amber-900 flex items-start gap-2.5">
          <HelpCircle className="h-4.5 w-4.5 text-amber-700 shrink-0 mt-0.5" />
          <p>
            Your submission will be treated as a civic signal and will require human review before being used in dashboard insights.
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        
        {/* Sidebar Info Cards */}
        <div className="space-y-6 lg:order-2">
          {/* Card 1: What happens next */}
          <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-800" />
              What happens next?
            </h2>
            <ul className="text-xs text-slate-650 space-y-2 list-disc list-inside leading-relaxed">
              <li>Submitted as a prototype civic signal.</li>
              <li>Reviewed later by operators via the Government Workspace.</li>
              <li>Validated signals may support public insights and priority weights.</li>
            </ul>
          </div>

          {/* Card 2: Privacy Reminder */}
          <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Lock className="h-4 w-4 text-amber-700" />
              Privacy reminder
            </h2>
            <div className="text-xs text-slate-650 space-y-2 leading-relaxed">
              <p className="font-semibold text-amber-900 bg-amber-50 p-2 rounded-lg border border-amber-100">
                ⚠️ PERINGATAN: Jangan masukkan data pribadi seperti nama, NIK, email, nomor telepon, atau alamat rumah lengkap dalam form ini!
              </p>
              <p>
                Platform ini tidak meminta data sensitif tersebut. Data yang Anda masukkan akan disaring dari pola alamat email dan nomor telepon demi keamanan privasi Anda.
              </p>
              <p className="text-[10px] text-slate-500 italic mt-2 border-t border-stone-100 pt-2">
                Catatan Prototipe: Laporan Anda disimpan secara lokal di dalam browser Anda saat ini. Tidak ada data yang dikirimkan ke server eksternal/pemerintah asli.
              </p>
            </div>
          </div>
        </div>

        {/* Input Form Card */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm lg:col-span-2 lg:order-1">
          <h2 className="text-lg font-bold text-slate-900 mb-5 pb-3 border-b border-stone-100">
            Form Umpan Balik Sinyal Kota
          </h2>

          {successMessage && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-950 flex items-start gap-2.5 shadow-sm">
              <CheckCircle2 className="h-5 w-5 text-emerald-800 shrink-0" />
              <div>
                <p className="font-extrabold text-emerald-900">Masukan Berhasil Disimpan!</p>
                <p className="font-medium mt-0.5 text-emerald-850">{successMessage}</p>
              </div>
            </div>
          )}

          {validationError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-xs font-bold text-red-950 flex items-start gap-2.5 shadow-sm">
              <ShieldAlert className="h-5 w-5 text-red-700 shrink-0" />
              <div>
                <p className="font-extrabold text-red-900">Validasi Gagal</p>
                <p className="font-medium mt-0.5 text-red-850">{validationError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Feedback Type & Urgency Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Tipe Umpan Balik *
                </label>
                <select
                  value={feedbackType}
                  onChange={(e) => setFeedbackType(e.target.value as PublicFeedbackSubmission["feedbackType"])}
                  className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Complaint">Complaint (Keluhan)</option>
                  <option value="Criticism">Criticism (Kritik)</option>
                  <option value="Suggestion">Suggestion (Saran)</option>
                  <option value="Appreciation">Appreciation (Apresiasi)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Tingkat Urgensi *
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value as PublicFeedbackSubmission["urgency"])}
                  className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Low">Low (Rendah)</option>
                  <option value="Medium">Medium (Sedang)</option>
                  <option value="High">High (Tinggi)</option>
                  <option value="Critical">Critical (Sangat Mendesak)</option>
                </select>
              </div>
            </div>

            {/* District & Category Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Kecamatan Wilayah *
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value as PublicFeedbackSubmission["district"])}
                  className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Purwokerto Utara">Purwokerto Utara</option>
                  <option value="Purwokerto Timur">Purwokerto Timur</option>
                  <option value="Purwokerto Selatan">Purwokerto Selatan</option>
                  <option value="Purwokerto Barat">Purwokerto Barat</option>
                  <option value="Unknown">Unknown (Tidak Diketahui / Lintas Wilayah)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Kategori Isu Layanan *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as PublicFeedbackSubmission["category"])}
                  className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Drainage">Drainage (Saluran Air & Banjir)</option>
                  <option value="Waste">Waste (Persampahan & Lingkungan)</option>
                  <option value="Traffic">Traffic (Lalu Lintas & Kemacetan)</option>
                  <option value="Road Damage">Road Damage (Kerusakan Jalan)</option>
                  <option value="Street Lighting">Street Lighting (Penerangan Jalan)</option>
                  <option value="Public Facility">Public Facility (Fasilitas Publik)</option>
                  <option value="Public Service">Public Service (Layanan Administrasi)</option>
                  <option value="UMKM/Public Space">UMKM/Public Space (PKL & Ruang Publik)</option>
                  <option value="Student Mobility">Student Mobility (Kepadatan Sekitar Sekolah/Kampus)</option>
                  <option value="Other">Other (Lainnya)</option>
                </select>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Judul Sinyal Masukan *
              </label>
              <input
                type="text"
                placeholder="Contoh: Kerusakan Lampu Jalan di Jl. HR Bunyamin"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:border-emerald-500 focus:outline-none"
              />
              <p className="text-[10px] text-slate-500 mt-1">
                Tuliskan secara ringkas isu perkotaan yang ingin Anda sampaikan.
              </p>
            </div>

            {/* Summary */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Deskripsi Detail Masukan *
              </label>
              <textarea
                rows={4}
                placeholder="Tuliskan secara mendalam masalah/aspirasi Anda. Harap tidak menyertakan NIK, nomor telepon, email, atau nama lengkap Anda."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Location Hint */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Petunjuk Lokasi (Opsional)
              </label>
              <input
                type="text"
                placeholder="Contoh: Depan Kampus Unsoed, dekat pertigaan lampu merah"
                value={locationHint}
                onChange={(e) => setLocationHint(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:border-emerald-500 focus:outline-none"
              />
              <p className="text-[10px] text-slate-500 mt-1">
                Petunjuk lokasi umum, jangan masukkan alamat rumah lengkap Anda demi menjaga privasi.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-800 hover:bg-emerald-950 text-white px-5 py-3 text-xs font-black transition shadow-sm"
              >
                <Send className="h-4 w-4" /> Kirim Sinyal Umpan Balik Warga
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Submissions List Section */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="text-base font-black text-slate-900 flex items-center gap-2 pb-3 border-b border-stone-100">
          <List className="h-4 w-4 text-emerald-800" />
          Sinyal Umpan Balik Lokal Anda ({submissions.length})
        </h2>
        <p className="text-[10px] text-slate-500 italic">
          Sinyal-sinyal berikut disimpan secara lokal di browser Anda. Statusnya diatur ke "Needs Review" (Perlu Ditinjau) untuk disimulasikan di dalam Government Workspace.
        </p>

        {submissions.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="border border-stone-150 rounded-xl p-4 bg-stone-50 hover:bg-stone-100/50 transition relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2.5">
                    <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-850 ring-1 ring-emerald-100">
                      {sub.feedbackType}
                    </span>
                    <span className="text-[10px] text-slate-450 font-semibold">
                      ID: {sub.id} • {sub.createdAt}
                    </span>
                  </div>

                  <h3 className="text-xs font-black text-slate-900 mb-1">{sub.title}</h3>
                  <p className="text-xs text-slate-650 leading-relaxed mb-3 line-clamp-3">
                    {sub.summary}
                  </p>

                  {sub.locationHint && (
                    <p className="text-[10px] text-slate-500 font-semibold mb-3">
                      📍 Lokasi: {sub.locationHint}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-1.5 mt-auto pt-2 border-t border-stone-200/50">
                  <span className="text-[10px] font-bold text-slate-500">
                    Wilayah: <span className="text-slate-800">{sub.district}</span>
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[10px] font-bold text-slate-500">
                    Isu: <span className="text-slate-800">{sub.category}</span>
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[10px] font-bold text-slate-500">
                    Urgensi: <span className="text-amber-800 font-extrabold">{sub.urgency}</span>
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="inline-flex rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-bold text-amber-800 ring-1 ring-amber-100/80">
                    {sub.validationStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-slate-500 text-xs font-semibold">
            Belum ada sinyal masukan yang Anda kirimkan. Silakan isi form di atas untuk mencoba simulasi pengiriman sinyal.
          </div>
        )}
      </div>
    </div>
  );
};
