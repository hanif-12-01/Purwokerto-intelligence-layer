import type { ScenarioWeights } from "../types";

export interface PolicyMode {
  id: string;
  name: string;
  description: string;
  weights: ScenarioWeights;
}

export const policyModes: PolicyMode[] = [
  {
    id: "balanced",
    name: "Balanced Mode",
    description: "Uses the main transparent rule-based formula.",
    weights: {
      trafficIndex: 0.18,
      wasteIndex: 0.15,
      drainageFloodIndex: 0.15,
      roadInfraIndex: 0.14,
      publicServicePressureIndex: 0.12,
      studentMobilityIndex: 0.12,
      complaintUrgencyIndex: 0.14,
    },
  },
  {
    id: "mobility",
    name: "Mobility & Road Focus",
    description: "Raises traffic pressure and road infrastructure weight for mobility-oriented review.",
    weights: {
      trafficIndex: 0.30,
      wasteIndex: 0.10,
      drainageFloodIndex: 0.10,
      roadInfraIndex: 0.25,
      publicServicePressureIndex: 0.08,
      studentMobilityIndex: 0.09,
      complaintUrgencyIndex: 0.08,
    },
  },
  {
    id: "waste",
    name: "Waste & Sanitation Focus",
    description: "Highlights solid waste handling, sanitation and drainage capacity.",
    weights: {
      trafficIndex: 0.10,
      wasteIndex: 0.35,
      drainageFloodIndex: 0.20,
      roadInfraIndex: 0.10,
      publicServicePressureIndex: 0.08,
      studentMobilityIndex: 0.07,
      complaintUrgencyIndex: 0.10,
    },
  },
  {
    id: "service",
    name: "Public Service Focus",
    description: "Tests public facility access, service friction, and complaint response times.",
    weights: {
      trafficIndex: 0.10,
      wasteIndex: 0.10,
      drainageFloodIndex: 0.10,
      roadInfraIndex: 0.10,
      publicServicePressureIndex: 0.30,
      studentMobilityIndex: 0.10,
      complaintUrgencyIndex: 0.20,
    },
  },
  {
    id: "student",
    name: "Student Mobility Focus",
    description: "Prioritizes student movement and campus-area access corridors.",
    weights: {
      trafficIndex: 0.15,
      wasteIndex: 0.10,
      drainageFloodIndex: 0.10,
      roadInfraIndex: 0.10,
      publicServicePressureIndex: 0.10,
      studentMobilityIndex: 0.35,
      complaintUrgencyIndex: 0.10,
    },
  },
  {
    id: "drainage",
    name: "Drainage/Flood Review Focus",
    description: "Prioritizes drainage & flood vulnerability and complaint urgency.",
    weights: {
      trafficIndex: 0.10,
      wasteIndex: 0.15,
      drainageFloodIndex: 0.35,
      roadInfraIndex: 0.10,
      publicServicePressureIndex: 0.08,
      studentMobilityIndex: 0.07,
      complaintUrgencyIndex: 0.15,
    },
  },
];
