import type { FeatureCollection, Polygon } from "geojson";

export interface DistrictBoundaryProperties {
  districtId: string;
  name: string;
  centroid: [number, number];
  dominantIssue: string;
  recommendedAction: string;
  boundaryQuality: "Prototype";
}

export const purwokertoDistrictBoundaries: FeatureCollection<Polygon, DistrictBoundaryProperties> = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        districtId: "pwt-utara",
        name: "Purwokerto Utara",
        centroid: [-7.405, 109.244],
        dominantIssue:
          "High student mobility pressure and pedestrian road crossings around campus activity corridors.",
        recommendedAction:
          "Prioritize corridor-wide crossing safety, traffic calming, and drainage checks by kecamatan boundary.",
        boundaryQuality: "Prototype",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [109.220, -7.405],
            [109.221, -7.395],
            [109.225, -7.385],
            [109.230, -7.380],
            [109.245, -7.382],
            [109.260, -7.385],
            [109.268, -7.390],
            [109.267, -7.400],
            [109.265, -7.408],
            [109.262, -7.415],
            [109.255, -7.418],
            [109.242, -7.419],
            [109.230, -7.421],
            [109.226, -7.420],
            [109.222, -7.418],
            [109.220, -7.405],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        districtId: "pwt-timur",
        name: "Purwokerto Timur",
        centroid: [-7.430, 109.250],
        dominantIssue: "Traffic congestion and peak-hour vehicle queues around commercial and civic service sectors.",
        recommendedAction:
          "Optimize traffic signal synchronization, curbside management, and service queue monitoring by eastern service area.",
        boundaryQuality: "Prototype",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [109.230, -7.421],
            [109.242, -7.419],
            [109.255, -7.418],
            [109.262, -7.415],
            [109.265, -7.425],
            [109.270, -7.432],
            [109.274, -7.440],
            [109.272, -7.448],
            [109.260, -7.446],
            [109.250, -7.444],
            [109.238, -7.440],
            [109.228, -7.436],
            [109.229, -7.428],
            [109.230, -7.421],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        districtId: "pwt-selatan",
        name: "Purwokerto Selatan",
        centroid: [-7.455, 109.235],
        dominantIssue: "Waste collection schedule delays and neighborhood drainage overflow signals.",
        recommendedAction:
          "Prioritize drainage capacity review, refuse logistics routes, and neighborhood waste response across the southern boundary.",
        boundaryQuality: "Prototype",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [109.192, -7.440],
            [109.200, -7.442],
            [109.208, -7.445],
            [109.216, -7.442],
            [109.224, -7.439],
            [109.228, -7.436],
            [109.238, -7.440],
            [109.250, -7.444],
            [109.260, -7.446],
            [109.272, -7.448],
            [109.270, -7.458],
            [109.265, -7.466],
            [109.260, -7.472],
            [109.250, -7.475],
            [109.238, -7.476],
            [109.225, -7.472],
            [109.215, -7.468],
            [109.208, -7.460],
            [109.200, -7.452],
            [109.192, -7.440],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        districtId: "pwt-barat",
        name: "Purwokerto Barat",
        centroid: [-7.422, 109.212],
        dominantIssue: "Wayfinding and public transport access improvements around western transit corridors.",
        recommendedAction:
          "Maintain baseline monitoring while improving civic wayfinding and transit access coverage by western boundary.",
        boundaryQuality: "Prototype",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [109.220, -7.405],
            [109.222, -7.418],
            [109.226, -7.420],
            [109.230, -7.421],
            [109.229, -7.428],
            [109.228, -7.436],
            [109.224, -7.439],
            [109.216, -7.442],
            [109.208, -7.445],
            [109.200, -7.442],
            [109.192, -7.440],
            [109.195, -7.432],
            [109.198, -7.425],
            [109.202, -7.418],
            [109.208, -7.412],
            [109.215, -7.408],
            [109.220, -7.405],
          ],
        ],
      },
    },
  ],
};
