import React from "react";

export type MapLayerType =
  | "Priority"
  | "Mobility"
  | "Drainage"
  | "Waste"
  | "Student Mobility"
  | "Complaint Signals"
  | "Data Confidence";

export interface MapLayer {
  id: MapLayerType;
  label: string;
  description: string;
}

export const MAP_LAYERS: MapLayer[] = [
  {
    id: "Priority",
    label: "Skor Prioritas",
    description: "Skor prioritas gabungan berdasarkan semua indikator dalam formula pendukung keputusan warga.",
  },
  {
    id: "Mobility",
    label: "Lalu Lintas & Mobilitas",
    description: "Volume lalu lintas, antrean kendaraan pada jam sibuk, dan tekanan pergerakan transit umum.",
  },
  {
    id: "Drainage",
    label: "Drainase & Banjir",
    description: "Tinjauan kapasitas drainase lingkungan setempat dan titik rawan penyumbatan/banjir.",
  },
  {
    id: "Waste",
    label: "Sampah & Kebersihan",
    description: "Keterlambatan logistik pengumpulan sampah, masalah penumpukan sampah sementara, dan rute kebersihan.",
  },
  {
    id: "Student Mobility",
    label: "Mobilitas Pelajar",
    description: "Tekanan aktivitas kampus, area kepadatan mahasiswa tinggi, dan kebutuhan penyeberangan pejalan kaki.",
  },
  {
    id: "Complaint Signals",
    label: "Urgensi Laporan Warga",
    description: "Laporan warga dan sinyal umpan balik mendesak yang dicatat oleh portal wilayah (belum terverifikasi).",
  },
  {
    id: "Data Confidence",
    label: "Tingkat Keyakinan Data",
    description: "Indikator yang menunjukkan seberapa kuat, terverifikasi, dan lengkap sumber data yang mendasarinya.",
  },
];

interface MapLayerControlsProps {
  selectedLayer: MapLayerType;
  onSelectLayer: (layer: MapLayerType) => void;
}

export const MapLayerControls: React.FC<MapLayerControlsProps> = ({
  selectedLayer,
  onSelectLayer,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1.5 text-slate-400">
        <span className="text-[10px] font-bold uppercase tracking-wider">Visualisasi Lapisan Peta</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {MAP_LAYERS.map((layer) => {
          const isActive = selectedLayer === layer.id;
          return (
            <button
              key={layer.id}
              onClick={() => onSelectLayer(layer.id)}
              className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition-all shadow-sm ${
                isActive
                  ? "border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-600/30"
                  : "border-stone-200 bg-white text-slate-600 hover:bg-stone-50 hover:text-slate-800"
              }`}
            >
              {layer.label}
            </button>
          );
        })}
      </div>
      <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-3 text-xs text-slate-600">
        <strong className="block font-bold text-slate-800">
          Lapisan: {MAP_LAYERS.find((l) => l.id === selectedLayer)?.label}
        </strong>
        <p className="mt-1 leading-relaxed">
          {MAP_LAYERS.find((l) => l.id === selectedLayer)?.description}
        </p>
      </div>
    </div>
  );
};
