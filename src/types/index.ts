export interface District {
  id: string;
  name: string;
  trafficIndex: number;
  wasteIndex: number;
  publicServiceIndex: number;
  studentMobilityIndex: number;
}

export interface PriorityResult {
  score: number;
  status: "Low" | "Medium" | "High" | "Critical";
}
