import React, { useState } from "react";
import { Plus, RotateCcw, AlertTriangle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import type { CivicFeedbackSignal } from "../types";
import { mockCivicFeedbackSignals } from "../data/mockCivicFeedbackSignals";
import { getStoredData, setStoredData, resetStoredData } from "../utils/storage";
import { SignalReviewStats } from "../components/signalReview/SignalReviewStats";
import { SignalFilterBar } from "../components/signalReview/SignalFilterBar";
import { SignalReviewCard } from "../components/signalReview/SignalReviewCard";
import { SignalReviewPanel } from "../components/signalReview/SignalReviewPanel";

const STORAGE_KEY = "pil:civic-feedback-signals";

export const SignalReviewPage: React.FC = () => {
  // Load initial signals
  const [signals, setSignals] = useState<CivicFeedbackSignal[]>(() => {
    return getStoredData<CivicFeedbackSignal[]>(STORAGE_KEY, mockCivicFeedbackSignals);
  });

  // Filter States
  const [filters, setFilters] = useState({
    district: "",
    category: "",
    urgency: "",
    validationStatus: "",
    feedbackType: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Editor states
  const [selectedSignal, setSelectedSignal] = useState<CivicFeedbackSignal | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Handlers
  const handleSaveSignal = (updatedSignal: CivicFeedbackSignal) => {
    let nextSignals: CivicFeedbackSignal[];
    if (signals.some((s) => s.id === updatedSignal.id)) {
      nextSignals = signals.map((s) => (s.id === updatedSignal.id ? updatedSignal : s));
    } else {
      nextSignals = [updatedSignal, ...signals];
    }
    setSignals(nextSignals);
    setStoredData(STORAGE_KEY, nextSignals);
    setSelectedSignal(null);
    setIsAddingNew(false);
  };

  const handleDeleteSignal = (id: string) => {
    const nextSignals = signals.filter((s) => s.id !== id);
    setSignals(nextSignals);
    setStoredData(STORAGE_KEY, nextSignals);
    setSelectedSignal(null);
    setIsAddingNew(false);
  };

  const handleResetData = () => {
    if (window.confirm("Apakah Anda yakin ingin menyetel ulang data sinyal ke bawaan prototipe? Semua perubahan Anda akan hilang.")) {
      resetStoredData(STORAGE_KEY);
      setSignals(mockCivicFeedbackSignals);
    }
  };

  const handleCreateNewSignal = () => {
    const newSignal: CivicFeedbackSignal = {
      id: `sig-manual-${Date.now().toString().slice(-4)}`,
      title: "",
      summary: "",
      district: "Unknown",
      category: "Other",
      feedbackType: "Complaint",
      urgency: "Medium",
      relatedIndicator: "complaintUrgencyIndex",
      confidenceScore: 100,
      validationStatus: "Needs Review",
      sourceType: "Manual Import",
      sourceLabel: "Petugas Lapangan",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setSelectedSignal(newSignal);
    setIsAddingNew(true);
  };

  const handleResetFilters = () => {
    setFilters({
      district: "",
      category: "",
      urgency: "",
      validationStatus: "",
      feedbackType: "",
    });
    setSearchQuery("");
  };

  // Filter Logic
  const filteredSignals = signals.filter((s) => {
    if (filters.district && s.district !== filters.district) return false;
    if (filters.category && s.category !== filters.category) return false;
    if (filters.urgency && s.urgency !== filters.urgency) return false;
    if (filters.validationStatus && s.validationStatus !== filters.validationStatus) return false;
    if (filters.feedbackType && s.feedbackType !== filters.feedbackType) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const titleMatch = s.title.toLowerCase().includes(q);
      const summaryMatch = s.summary.toLowerCase().includes(q);
      const sourceMatch = s.sourceLabel.toLowerCase().includes(q);
      if (!titleMatch && !summaryMatch && !sourceMatch) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 transition"
            >
              <ArrowLeft className="h-3 w-3" /> Kembali ke Dasbor
            </Link>
          </div>
          <h1 className="text-2xl font-black text-slate-900 leading-tight">
            Civic Signal Review Center
          </h1>
          <p className="text-xs font-semibold text-slate-650 mt-1">
            Validasi, kategorisasi, dan moderasi manual sinyal umpan balik warga untuk kalibrasi analitik prioritas wilayah Purwokerto.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleResetData}
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-slate-650 px-4 py-2.5 text-xs font-bold transition shadow-sm"
          >
            <RotateCcw className="h-4 w-4" /> Reset ke Bawaan
          </button>
          <button
            type="button"
            onClick={handleCreateNewSignal}
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-950 text-white px-4.5 py-2.5 text-xs font-black transition shadow-sm"
          >
            <Plus className="h-4 w-4" /> Tambah Sinyal Manual
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <SignalReviewStats signals={signals} />

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        {/* Text Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Cari sinyal berdasarkan judul, ringkasan, atau label sumber data..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 pl-11 text-xs font-semibold text-slate-800 focus:border-emerald-500 focus:outline-none shadow-sm"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Advanced Filters */}
        <SignalFilterBar
          filters={filters}
          onChangeFilters={setFilters}
          onReset={handleResetFilters}
        />
      </div>

      {/* Signals Grid List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
            Daftar Sinyal Terfilter ({filteredSignals.length})
          </h2>
        </div>

        {filteredSignals.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSignals.map((sig) => (
              <SignalReviewCard
                key={sig.id}
                signal={sig}
                onSelect={(s) => {
                  setSelectedSignal(s);
                  setIsAddingNew(false);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm">
            <AlertTriangle className="mx-auto h-8 w-8 text-amber-500" />
            <h3 className="mt-3 text-sm font-bold text-slate-800">
              Tidak Ada Sinyal Ditemukan
            </h3>
            <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">
              Tidak ada data sinyal umpan balik yang cocok dengan filter atau kata kunci pencarian Anda saat ini. Silakan ubah filter Anda atau reset data.
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <button
                type="button"
                onClick={handleResetFilters}
                className="rounded-xl border border-stone-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 hover:bg-stone-50 transition"
              >
                Reset Filter
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar/Modal Panel for Reviewing and Editing */}
      {selectedSignal && (
        <SignalReviewPanel
          signal={selectedSignal}
          onSave={handleSaveSignal}
          onDelete={isAddingNew ? undefined : handleDeleteSignal}
          onClose={() => {
            setSelectedSignal(null);
            setIsAddingNew(false);
          }}
        />
      )}
    </div>
  );
};
