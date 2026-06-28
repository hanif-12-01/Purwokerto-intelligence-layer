import type { CitizenFeedback } from "../types";

export const mockFeedback: CitizenFeedback[] = [
  {
    id: "fb-001",
    districtId: "pwt-utara",
    category: "Complaint",
    urgency: "High",
    message: "Simulated report about crowded student mobility corridors during morning peak hours.",
    recommendedAction: "Mobility review with traffic management and campus-area coordination.",
  },
  {
    id: "fb-002",
    districtId: "pwt-timur",
    category: "Criticism",
    urgency: "High",
    message: "Simulated feedback about parking spillover and slow traffic near commercial activity areas.",
    recommendedAction: "Traffic circulation audit and short-term parking management review.",
  },
  {
    id: "fb-003",
    districtId: "pwt-selatan",
    category: "Suggestion",
    urgency: "Medium",
    message: "Simulated suggestion to improve neighborhood waste collection timing and public notices.",
    recommendedAction: "Waste route scheduling review and public communication improvement.",
  },
  {
    id: "fb-004",
    districtId: "pwt-barat",
    category: "Appreciation",
    urgency: "Low",
    message: "Simulated appreciation for visible street maintenance and cleaner local access roads.",
    recommendedAction: "Document as positive feedback and maintain routine service cadence.",
  },
  {
    id: "fb-005",
    districtId: "pwt-utara",
    category: "Suggestion",
    urgency: "Medium",
    message: "Simulated suggestion for better crossing signs near student boarding and UMKM activity areas.",
    recommendedAction: "Small-scale pedestrian safety review with related local agencies.",
  },
  {
    id: "fb-006",
    districtId: "pwt-selatan",
    category: "Complaint",
    urgency: "Critical",
    message: "Simulated complaint about recurring local flooding after intense rain in a residential lane.",
    recommendedAction: "Drainage and flood review with field validation before any intervention decision.",
  },
];
