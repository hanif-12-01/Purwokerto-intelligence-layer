export type PriorityStatus = "Low" | "Medium" | "High" | "Critical";
export type ConfidenceLevel = "Weak" | "Moderate" | "Strong";

export interface DistrictIndicatorProfile {
  id: string;
  name: string;
  population?: number;
  density?: number;
  urbanRole: string;
  dominantIssue: string;
  trafficIndex: number;
  wasteIndex: number;
  drainageFloodIndex: number;
  roadInfraIndex: number;
  publicServicePressureIndex: number;
  studentMobilityIndex: number;
  complaintUrgencyIndex: number;
  resolutionAccountabilityIndex: number;
  dataConfidenceScore: number;
  sourceStatus: "Mock" | "Open Data Ready" | "Complaint-Derived" | "Needs Verification";
  shortInsight: string;
  recommendedAction: string;
}

export interface PriorityResult {
  score: number;
  status: PriorityStatus;
  confidenceLevel: ConfidenceLevel;
}

export type FeedbackCategory = "Complaint" | "Criticism" | "Suggestion" | "Appreciation";
export type UrgencyLevel = "Low" | "Medium" | "High" | "Critical";

export type FeedbackType = "Complaint" | "Criticism" | "Suggestion" | "Appreciation";
export type ValidationStatus = "Needs Review" | "Under Review" | "Resolved" | "Ignored";
export type SourceType = "Mock" | "Portal" | "Manual Input" | "Social Media" | "Official Registry";

export interface CitizenFeedback {
  id: string;
  districtId: string;
  category: FeedbackCategory;
  urgency: UrgencyLevel;
  message: string;
  recommendedAction: string;
  title?: string;
  feedbackType?: FeedbackType;
  validationStatus?: ValidationStatus;
  sourceType?: SourceType;
  sourceLabel?: string;
  createdAt?: string;
}

export type CompletionStatus = "Submitted" | "Under Review" | "Needs Revision" | "Validated";

export interface CompletionReport {
  id: string;
  districtId: string;
  status: CompletionStatus;
  actionTaken: string;
  completionTime: string;
  fieldConstraints: string;
  publicSummary: string;
}

export interface DataSourceMetadata {
  id: string;
  sourceName: string;
  sourceType: "Mock" | "BPS" | "Open Data" | "Complaint Portal" | "Manual Survey" | "Official Agency" | "News Reference" | "Social Media Import";
  sourceUrl: string;
  sourceYear: string;
  dataStatus: "Mock" | "Open Data Ready" | "Complaint-Derived" | "Needs Verification" | "Verified";
  confidenceNote: string;
}

export interface CivicFeedbackSignal {
  id: string;
  title: string;
  summary: string;
  district:
    | "Purwokerto Utara"
    | "Purwokerto Timur"
    | "Purwokerto Selatan"
    | "Purwokerto Barat"
    | "Unknown";
  category:
    | "Drainage"
    | "Waste"
    | "Traffic"
    | "Road Damage"
    | "Street Lighting"
    | "Public Facility"
    | "Public Service"
    | "UMKM/Public Space"
    | "Student Mobility"
    | "Other";
  feedbackType: "Complaint" | "Criticism" | "Suggestion" | "Appreciation";
  urgency: "Low" | "Medium" | "High" | "Critical";
  relatedIndicator:
    | "trafficIndex"
    | "wasteIndex"
    | "drainageFloodIndex"
    | "roadInfraIndex"
    | "publicServicePressureIndex"
    | "studentMobilityIndex"
    | "complaintUrgencyIndex"
    | "resolutionAccountabilityIndex";
  confidenceScore: number;
  validationStatus: "Needs Review" | "Reviewed" | "Validated" | "Rejected";
  sourceType:
    | "Mock"
    | "Manual Import"
    | "Open Data"
    | "Complaint-Derived"
    | "Social Media Import"
    | "Needs Verification";
  sourceLabel: string;
  createdAt: string;
  reviewedAt?: string;
}

export interface ScenarioWeights {
  trafficIndex: number;
  wasteIndex: number;
  drainageFloodIndex: number;
  roadInfraIndex: number;
  publicServicePressureIndex: number;
  studentMobilityIndex: number;
  complaintUrgencyIndex: number;
}

export interface PublicFeedbackSubmission {
  id: string;
  feedbackType: "Complaint" | "Criticism" | "Suggestion" | "Appreciation";
  district:
    | "Purwokerto Utara"
    | "Purwokerto Timur"
    | "Purwokerto Selatan"
    | "Purwokerto Barat"
    | "Unknown";
  category:
    | "Drainage"
    | "Waste"
    | "Traffic"
    | "Road Damage"
    | "Street Lighting"
    | "Public Facility"
    | "Public Service"
    | "UMKM/Public Space"
    | "Student Mobility"
    | "Other";
  title: string;
  summary: string;
  locationHint?: string;
  urgency: "Low" | "Medium" | "High" | "Critical";
  validationStatus: "Needs Review";
  sourceType: "Public Submission";
  createdAt: string;
}
