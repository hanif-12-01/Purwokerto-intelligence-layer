import type { District, PriorityResult } from "../types";

/**
 * Calculates priority score for a district using the following formula:
 * score = trafficIndex * 0.3 + wasteIndex * 0.25 + publicServiceIndex * 0.2 + studentMobilityIndex * 0.25
 */
export function calculatePriorityScore(district: District): number {
  const score =
    district.trafficIndex * 0.3 +
    district.wasteIndex * 0.25 +
    district.publicServiceIndex * 0.2 +
    district.studentMobilityIndex * 0.25;
  
  // Return score rounded to 2 decimal places
  return Math.round(score * 100) / 100;
}

/**
 * Determines priority status based on the score:
 * - score >= 85 → Critical
 * - score >= 70 → High
 * - score >= 50 → Medium
 * - otherwise → Low
 */
export function getPriorityStatus(score: number): PriorityResult["status"] {
  if (score >= 85) {
    return "Critical";
  }
  if (score >= 70) {
    return "High";
  }
  if (score >= 50) {
    return "Medium";
  }
  return "Low";
}
