export interface MapMarker {
  districtId: string;
  name: string;
  lat: number;
  lng: number;
  dominantIssue: string;
  recommendedAction: string;
}

export const mapMarkers: MapMarker[] = [
  {
    districtId: "pwt-utara",
    name: "Purwokerto Utara",
    lat: -7.4080,
    lng: 109.2483,
    dominantIssue: "High student mobility pressure and pedestrian road crossings around campus activity hubs.",
    recommendedAction: "Establish traffic-calming measures and safe pedestrian zones near campus gates.",
  },
  {
    districtId: "pwt-timur",
    name: "Purwokerto Timur",
    lat: -7.4239,
    lng: 109.2530,
    dominantIssue: "Traffic congestion and peak-hour vehicle queues around commercial sectors.",
    recommendedAction: "Optimize traffic signal synchronization and parking management review.",
  },
  {
    districtId: "pwt-selatan",
    name: "Purwokerto Selatan",
    lat: -7.4520,
    lng: 109.2435,
    dominantIssue: "Waste collection schedule delays and neighborhood drainage overflow signals.",
    recommendedAction: "Conduct community drainage capacity review and update refuse logistics routes.",
  },
  {
    districtId: "pwt-barat",
    name: "Purwokerto Barat",
    lat: -7.4194,
    lng: 109.2198,
    dominantIssue: "Wayfinding and navigation improvements around public transit corridors.",
    recommendedAction: "Enhance civic signboard infrastructure and public transport service access points.",
  },
];
