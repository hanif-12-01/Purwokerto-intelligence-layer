import type { CompletionReport } from "../types";

export const mockCompletionReports: CompletionReport[] = [
  {
    id: "cr-001",
    districtId: "pwt-utara",
    status: "Under Review",
    actionTaken: "Reviewed simulated student mobility hotspot and crossing safety notes.",
    completionTime: "3 working days",
    fieldConstraints: "Requires field observation because report density may not represent all corridors.",
    publicSummary: "Draft follow-up is being reviewed for student mobility and pedestrian safety context.",
  },
  {
    id: "cr-002",
    districtId: "pwt-timur",
    status: "Submitted",
    actionTaken: "Prepared mock traffic circulation note for commercial activity nodes.",
    completionTime: "Pending review",
    fieldConstraints: "Needs validation of peak-hour conditions and temporary parking pressure.",
    publicSummary: "A simulated review note has been submitted for mobility pressure in activity centers.",
  },
  {
    id: "cr-003",
    districtId: "pwt-selatan",
    status: "Needs Revision",
    actionTaken: "Drafted waste pickup and drainage attention summary from simulated inputs.",
    completionTime: "5 working days",
    fieldConstraints: "Drainage conditions and waste route assumptions need clearer field evidence.",
    publicSummary: "The draft follow-up needs revision before it can be treated as a validated record.",
  },
  {
    id: "cr-004",
    districtId: "pwt-barat",
    status: "Validated",
    actionTaken: "Completed simulated public service accessibility and wayfinding review.",
    completionTime: "2 working days",
    fieldConstraints: "No major simulated constraint beyond routine monitoring coverage.",
    publicSummary: "The prototype record marks this low-risk accessibility review as validated.",
  },
];
