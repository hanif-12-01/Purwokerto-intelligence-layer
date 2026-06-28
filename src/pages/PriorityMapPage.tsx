import React, { useState } from "react";
import { Info, Map as MapIcon } from "lucide-react";
import { purwokertoDistricts } from "../data/purwokertoDistricts";
import { MapLayerControls, type MapLayerType } from "../components/map/MapLayerControls";
import { MapLegend } from "../components/map/MapLegend";
import { PriorityMapCanvas } from "../components/map/PriorityMapCanvas";
import { DistrictMapDetail } from "../components/map/DistrictMapDetail";
import { getStoredData } from "../utils/storage";
import type { DistrictIndicatorProfile } from "../types";

export const PriorityMapPage: React.FC = () => {
  const [districtProfiles] = useState<DistrictIndicatorProfile[]>(() =>
    getStoredData<DistrictIndicatorProfile[]>("pwt_district_profiles", purwokertoDistricts)
  );
  const [selectedId, setSelectedId] = useState<string>("pwt-utara");
  const [selectedLayer, setSelectedLayer] = useState<MapLayerType>("Priority");

  const selectedDistrict =
    districtProfiles.find((district) => district.id === selectedId) ||
    districtProfiles[0];

  return (
    <div className="space-y-6">
      {/* Header section */}
      <section className="rounded-3xl border border-stone-200 bg-white/70 p-6 shadow-sm backdrop-blur">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 shadow-sm">
              <MapIcon className="h-3.5 w-3.5" /> Prototipe berbasis penanda
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-100 px-3 py-1 text-xs font-bold text-stone-600 shadow-sm">
              Batas GIS resmi belum diintegrasikan
            </span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Peta Prioritas Purwokerto
          </h1>
          <p className="text-sm text-slate-600">
            Peta kecerdasan publik berbasis penanda untuk membaca sinyal prioritas layanan perkotaan di seluruh pusat kota Purwokerto.
          </p>
        </div>
      </section>

      {/* Main split dashboard view */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          {/* Map canvas */}
          <PriorityMapCanvas
            districts={districtProfiles}
            selectedId={selectedId}
            selectedLayer={selectedLayer}
            onSelectDistrict={setSelectedId}
          />

          {/* Layer Controls */}
          <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
            <MapLayerControls selectedLayer={selectedLayer} onSelectLayer={setSelectedLayer} />
          </div>

          {/* Map explanation info card */}
          <div className="rounded-3xl border border-amber-200 bg-amber-50/50 p-5 shadow-sm space-y-2">
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
              <Info className="h-4 w-4 shrink-0 text-amber-600" />
              Catatan Simulasi Peta Warga
            </h4>
            <p className="text-xs font-medium leading-relaxed text-amber-800">
              Peta ini menggunakan simulasi berbasis penanda dan nilai indikator tiruan. Peta ini dirancang untuk mempersiapkan integrasi masa depan dengan batas GIS resmi, data pengaduan yang terverifikasi, dan sumber data terbuka.
            </p>
          </div>
        </div>

        {/* Right Sidebar panels */}
        <div className="space-y-6 lg:col-span-4">
          {/* Details panel */}
          <section className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
            <DistrictMapDetail district={selectedDistrict} />
          </section>

          {/* Legend */}
          <MapLegend />

          {/* Data Basis panel */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Basis Data</h4>
            <div className="text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Data saat ini:</span>
                <span className="text-slate-700 font-bold">Tiruan / simulasi</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Data masa depan:</span>
                <span className="text-slate-700 font-bold text-right">
                  BPS, Banyumas Open Data, Lapak Aduan, BPBD/DPU/Dishub/DLH
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Validasi:</span>
                <span className="text-slate-700 font-bold">Diperlukan peninjauan manusia</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Status GIS:</span>
                <span className="text-slate-700 font-bold">Belum terintegrasi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
