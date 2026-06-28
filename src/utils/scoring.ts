import type { DistrictIndicatorProfile, PriorityResult, ScenarioWeights, ConfidenceLevel } from "../types";

export const baseWeights: ScenarioWeights = {
  trafficIndex: 0.18,
  wasteIndex: 0.15,
  drainageFloodIndex: 0.15,
  roadInfraIndex: 0.14,
  publicServicePressureIndex: 0.12,
  studentMobilityIndex: 0.12,
  complaintUrgencyIndex: 0.14,
};

export function calculatePriorityScore(district: DistrictIndicatorProfile): number {
  return calculateWeightedScore(district, baseWeights);
}

export function calculateWeightedScore(district: DistrictIndicatorProfile, weights: ScenarioWeights): number {
  const score =
    district.trafficIndex * weights.trafficIndex +
    district.wasteIndex * weights.wasteIndex +
    district.drainageFloodIndex * weights.drainageFloodIndex +
    district.roadInfraIndex * weights.roadInfraIndex +
    district.publicServicePressureIndex * weights.publicServicePressureIndex +
    district.studentMobilityIndex * weights.studentMobilityIndex +
    district.complaintUrgencyIndex * weights.complaintUrgencyIndex;

  return Math.round(score * 100) / 100;
}

export function getPriorityStatus(score: number): PriorityResult["status"] {
  if (score >= 85) return "Critical";
  if (score >= 70) return "High";
  if (score >= 50) return "Medium";
  return "Low";
}

export function getConfidenceLevel(score: number): ConfidenceLevel {
  if (score >= 75) return "Strong";
  if (score >= 50) return "Moderate";
  return "Weak";
}

export function getStatusClasses(status: PriorityResult["status"]): string {
  switch (status) {
    case "Critical":
      return "border-red-200 bg-red-50 text-red-800";
    case "High":
      return "border-orange-200 bg-orange-50 text-orange-800";
    case "Medium":
      return "border-sky-200 bg-sky-50 text-sky-800";
    case "Low":
      return "border-emerald-200 bg-emerald-50 text-emerald-800";
  }
}
