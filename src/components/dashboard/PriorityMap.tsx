import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Layers } from "lucide-react";
import { purwokertoDistricts } from "../../data/purwokertoDistricts";
import { purwokertoDistrictBoundaries } from "../../data/purwokertoBoundaries";
import { mapMarkers } from "../../data/mapMarkers";
import { calculatePriorityScore, getPriorityStatus, getStatusClasses } from "../../utils/scoring";
import { SectionHeader } from "../ui/SectionHeader";

const statusPalette = {
  Critical: "#dc2626",
  High: "#f97316",
  Medium: "#0284c7",
  Low: "#059669",
};

export function PriorityMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Purwokerto center
    const map = L.map(mapContainerRef.current, {
      center: [-7.430, 109.240],
      zoom: 12,
      zoomControl: false, // minimalist dashboard view
      scrollWheelZoom: false, // prevent accidental zooming
      dragging: true,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; CARTO',
      subdomains: "abcd",
      maxZoom: 20,
    }).addTo(map);

    // Add boundaries
    L.geoJSON(purwokertoDistrictBoundaries, {
      style: (feature) => {
        const districtId = feature?.properties?.districtId;
        const district = purwokertoDistricts.find((d) => d.id === districtId);
        if (!district) return { fillColor: "#94a3b8", weight: 1, fillOpacity: 0.2 };

        const score = calculatePriorityScore(district);
        const status = getPriorityStatus(score);
        const color = statusPalette[status];

        return {
          fillColor: color,
          fillOpacity: 0.35,
          color: color,
          weight: 1.5,
        };
      },
    }).addTo(map);

    // Add markers
    mapMarkers.forEach((markerData) => {
      const district = purwokertoDistricts.find((d) => d.id === markerData.districtId);
      if (!district) return;

      const score = calculatePriorityScore(district);
      const status = getPriorityStatus(score);
      const color = statusPalette[status];

      const customIcon = L.divIcon({
        html: `
          <div class="relative flex h-8 w-8 items-center justify-center transform -translate-x-1/2 -translate-y-1/2">
            <span
              style="background-color: ${color};"
              class="relative flex h-7 w-7 items-center justify-center rounded-full border border-transparent text-[10px] font-black text-white shadow-md ring-4 ring-white/80"
            >
              ${Math.round(score)}
            </span>
          </div>
        `,
        className: "leaflet-div-icon",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      L.marker([markerData.lat, markerData.lng], { icon: customIcon })
        .addTo(map)
        .bindTooltip(
          `<div class="px-1.5 py-0.5 text-[10px] font-bold">${markerData.name}: ${Math.round(score)}</div>`,
          { direction: "top", offset: [0, -10] }
        );
    });

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const indonesianStatus: Record<string, string> = {
    Critical: "Kritis",
    High: "Tinggi",
    Medium: "Sedang",
    Low: "Rendah",
  };

  return (
    <section className="space-y-5">
      <SectionHeader
        eyebrow="Pratinjau GIS"
        title="Peta Prioritas Purwokerto"
        description="Visualisasi berbasis wilayah menggunakan prototipe poligon batas kecamatan."
      />
      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-stone-200 bg-stone-100 shadow-sm z-10">
          <div ref={mapContainerRef} className="h-full w-full min-h-[360px]" />
          <div className="absolute right-8 top-8 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-3 py-1 text-xs font-bold text-emerald-800 shadow-sm z-40 pointer-events-none">
            <Layers className="h-3.5 w-3.5" /> Lapisan Batas Prototipe
          </div>
        </div>
        <div className="space-y-3">
          {purwokertoDistricts.map((district) => {
            const score = calculatePriorityScore(district);
            const status = getPriorityStatus(score);
            return (
              <div key={district.id} className="rounded-2xl border border-stone-200 bg-white/85 p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-extrabold text-slate-950">{district.name}</h3>
                    <p className="text-sm text-slate-500">Skor prioritas batas: {score}</p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-bold ${getStatusClasses(status)}`}>
                    {indonesianStatus[status] || status}
                  </span>
                </div>
              </div>
            );
          })}
          <p className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium leading-6 text-amber-900">
            Pratinjau batas GIS prototipe. Terintegrasi dengan koordinat geospasial nyata dan batas kecamatan.
          </p>
        </div>
      </div>
    </section>
  );
}
