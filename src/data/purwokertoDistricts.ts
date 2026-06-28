import type { District } from "../types";

export const purwokertoDistricts: District[] = [
  {
    id: "pwt-utara",
    name: "Purwokerto Utara",
    trafficIndex: 78,
    wasteIndex: 65,
    publicServiceIndex: 82,
    studentMobilityIndex: 90, // High due to universities (UNSOED, etc.)
  },
  {
    id: "pwt-timur",
    name: "Purwokerto Timur",
    trafficIndex: 85, // Heavy traffic/commercial area
    wasteIndex: 72,
    publicServiceIndex: 88,
    studentMobilityIndex: 65,
  },
  {
    id: "pwt-selatan",
    name: "Purwokerto Selatan",
    trafficIndex: 70,
    wasteIndex: 88, // Industrial/residential waste challenge
    publicServiceIndex: 60,
    studentMobilityIndex: 50,
  },
  {
    id: "pwt-barat",
    name: "Purwokerto Barat",
    trafficIndex: 65,
    wasteIndex: 55,
    publicServiceIndex: 75,
    studentMobilityIndex: 45,
  },
];
