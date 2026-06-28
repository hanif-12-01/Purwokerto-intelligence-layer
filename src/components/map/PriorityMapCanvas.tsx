import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { calculatePriorityScore, getPriorityStatus } from "../../utils/scoring";
import { purwokertoDistrictBoundaries } from "../../data/purwokertoBoundaries";
import { mapMarkers } from "../../data/mapMarkers";
import type { DistrictIndicatorProfile } from "../../types";
import type { MapLayerType } from "./MapLayerControls";

interface PriorityMapCanvasProps {
  districts: DistrictIndicatorProfile[];
  selectedId: string;
  selectedLayer: MapLayerType;
  onSelectDistrict: (id: string) => void;
}

const statusColors = {
  Low: "#10b981", // emerald-500
  Medium: "#3b82f6", // blue-500
  High: "#f59e0b", // amber-500
  Critical: "#ef4444", // red-500
};

export const PriorityMapCanvas: React.FC<PriorityMapCanvasProps> = ({
  districts,
  selectedId,
  selectedLayer,
  onSelectDistrict,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Get active indicator score for each district based on selectedLayer
  const getIndicatorScore = (district: DistrictIndicatorProfile) => {
    switch (selectedLayer) {
      case "Mobility":
        return district.trafficIndex;
      case "Drainage":
        return district.drainageFloodIndex;
      case "Waste":
        return district.wasteIndex;
      case "Student Mobility":
        return district.studentMobilityIndex;
      case "Complaint Signals":
        return district.complaintUrgencyIndex;
      case "Data Confidence":
        return district.dataConfidenceScore;
      case "Priority":
      default:
        return calculatePriorityScore(district);
    }
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Purwokerto Center: lat -7.4244, lng 109.230
    const map = L.map(mapContainerRef.current, {
      center: [-7.430, 109.240],
      zoom: 13,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    // Clean, minimalist tile layer (CartoDB Positron)
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
    }).addTo(map);

    mapRef.current = map;

    // Invalidate size shortly after initialization to ensure full canvas coverage
    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    }, 200);

    return () => {
      if (mapRef.current) {

        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update Boundaries and Markers on data/layer changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing geojson layer
    if (geoJsonLayerRef.current) {
      map.removeLayer(geoJsonLayerRef.current);
    }
    // Clear existing markers
    markersRef.current.forEach((marker) => map.removeLayer(marker));
    markersRef.current = [];

    // Add District Boundaries Polygon Layer
    const geoJson = L.geoJSON(purwokertoDistrictBoundaries, {
      style: (feature) => {
        const districtId = feature?.properties?.districtId;
        const district = districts.find((d) => d.id === districtId);
        if (!district) return { fillColor: "#94a3b8", weight: 1, fillOpacity: 0.2 };

        const totalScore = calculatePriorityScore(district);
        const status = getPriorityStatus(totalScore);
        const color = statusColors[status];
        const isSelected = districtId === selectedId;

        return {
          fillColor: color,
          fillOpacity: isSelected ? 0.5 : 0.25,
          color: isSelected ? "#0f172a" : color,
          weight: isSelected ? 3 : 1.5,
        };
      },
      onEachFeature: (feature, layer) => {
        layer.on({
          click: () => {
            const districtId = feature?.properties?.districtId;
            if (districtId) {
              onSelectDistrict(districtId);
            }
          },
        });
      },
    }).addTo(map);

    geoJsonLayerRef.current = geoJson;

    // Add Interactive Leaflet DivIcon Markers
    mapMarkers.forEach((markerData) => {
      const district = districts.find((d) => d.id === markerData.districtId);
      if (!district) return;

      const totalScore = calculatePriorityScore(district);
      const displayScore = getIndicatorScore(district);
      const status = getPriorityStatus(totalScore);
      const color = statusColors[status];
      const isSelected = markerData.districtId === selectedId;

      // Custom HTML Marker matching our Tailwind style
      const customIcon = L.divIcon({
        html: `
          <div class="relative flex h-8 w-8 items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2">
            ${
              isSelected
                ? '<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-400 opacity-60"></span>'
                : ""
            }
            <span
              style="background-color: ${color};"
              class="relative flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-black text-white shadow-md ring-4 transition-all ${
                isSelected ? "scale-125 ring-slate-800/25 border-slate-900" : "ring-white/80 border-transparent"
              }"
            >
              ${Math.round(displayScore)}
            </span>
          </div>
        `,
        className: "leaflet-div-icon",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const leafletMarker = L.marker([markerData.lat, markerData.lng], { icon: customIcon })
        .addTo(map)
        .on("click", () => {
          onSelectDistrict(markerData.districtId);
        });

      // Bind simple tooltip
      leafletMarker.bindTooltip(
        `<div class="px-1.5 py-0.5 text-[10px] font-bold">${markerData.name}: ${Math.round(displayScore)}</div>`,
        { direction: "top", offset: [0, -10] }
      );

      markersRef.current.push(leafletMarker);
    });
  }, [districts, selectedId, selectedLayer, onSelectDistrict]);

  const indonesianLayerNames: Record<string, string> = {
    Priority: "Skor Prioritas",
    Mobility: "Lalu Lintas & Mobilitas",
    Drainage: "Drainase & Banjir",
    Waste: "Sampah & Kebersihan",
    "Student Mobility": "Mobilitas Pelajar",
    "Complaint Signals": "Urgensi Laporan Warga",
    "Data Confidence": "Tingkat Keyakinan Data",
  };

  return (
    <div className="relative h-[480px] lg:h-[580px] w-full overflow-hidden rounded-3xl border border-stone-200 bg-stone-100 shadow-inner z-10">
      <div ref={mapContainerRef} className="h-full w-full" />


      
      {/* Map layer HUD note */}
      <div className="absolute right-4 top-4 z-40 rounded-full border border-white/80 bg-white/95 px-3 py-1 text-[11px] font-bold text-slate-800 shadow-sm pointer-events-none">
        Visualisasi Lapisan: {indonesianLayerNames[selectedLayer] || selectedLayer}
      </div>
    </div>
  );
};
