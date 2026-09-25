export type AIMode = "vqa" | "grounding" | "change";

export interface AnalysisRequest {
  mode: AIMode;
  question: string;
  imageA?: File | null;
  imageB?: File | null;
}

export interface DetectedObject {
  id: string;
  label: string;
  confidence: number;
  bbox: { x: number; y: number; w: number; h: number };
  color: string;
}

export interface ChangeRegion {
  id: string;
  label: string;
  type: "added" | "removed" | "modified";
  bbox: { x: number; y: number; w: number; h: number };
  confidence: number;
}

export interface EvidenceItem {
  id: string;
  text: string;
  confidence: number;
  source: string;
}

export interface AnalysisResult {
  mode: AIMode;
  answer: string;
  confidence: number;
  summary: string;
  objects?: DetectedObject[];
  changes?: ChangeRegion[];
  evidence: EvidenceItem[];
  modelInfo: {
    name: string;
    version: string;
    processingTime: number;
  };
  suggestions: string[];
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const VQA_RESULTS: AnalysisResult[] = [
  {
    mode: "vqa",
    answer:
      "The image shows a dense urban residential district with approximately 340 buildings visible. The area features a grid-based road network with 12 major intersections. Vegetation coverage is approximately 18%, concentrated along the eastern boundary. No significant water bodies are detected within the frame.",
    confidence: 0.94,
    summary: "Urban residential area with grid road network detected.",
    evidence: [
      { id: "e1", text: "Building density consistent with residential zoning patterns", confidence: 0.96, source: "Structural classifier v2.3" },
      { id: "e2", text: "Road widths (8–12m) indicate local street classification", confidence: 0.91, source: "Road segmentation model" },
      { id: "e3", text: "Vegetation index (NDVI: 0.31) indicates moderate green cover", confidence: 0.88, source: "Spectral analysis" },
    ],
    modelInfo: { name: "SatVQA", version: "3.1.2", processingTime: 2.4 },
    suggestions: ["How many buildings are in the northern sector?", "What is the average building footprint?", "Show me the road network"],
  },
  {
    mode: "vqa",
    answer:
      "The scene depicts an agricultural landscape with mixed crop fields. At least 6 distinct field parcels are visible, spanning approximately 420 hectares. The field in the southwest shows signs of recent harvesting based on soil exposure patterns.",
    confidence: 0.89,
    summary: "Agricultural landscape with mixed crop fields.",
    evidence: [
      { id: "e1", text: "Crop row patterns match cereal grain cultivation", confidence: 0.92, source: "Agricultural pattern model" },
      { id: "e2", text: "Field boundaries align with cadastral data", confidence: 0.85, source: "Boundary detector" },
    ],
    modelInfo: { name: "SatVQA", version: "3.1.2", processingTime: 1.8 },
    suggestions: ["Which fields appear irrigated?", "Estimate total cropland area", "Identify crop types"],
  },
];

const GROUNDING_RESULTS: AnalysisResult[] = [
  {
    mode: "grounding",
    answer:
      "I detected and localized 47 buildings, 3 road segments, and 2 vegetation patches in the image. Buildings are concentrated in the northern quadrant. Two large structures in the center appear to be commercial or industrial.",
    confidence: 0.91,
    summary: "47 buildings, 3 road segments, 2 vegetation areas localized.",
    objects: [
      { id: "b1", label: "Building cluster A", confidence: 0.97, bbox: { x: 12, y: 10, w: 22, h: 18 }, color: "#0D9488" },
      { id: "b2", label: "Large structure", confidence: 0.95, bbox: { x: 42, y: 38, w: 16, h: 14 }, color: "#0D9488" },
      { id: "b3", label: "Building cluster B", confidence: 0.89, bbox: { x: 62, y: 15, w: 20, h: 22 }, color: "#0D9488" },
      { id: "r1", label: "Main road", confidence: 0.98, bbox: { x: 5, y: 48, w: 90, h: 6 }, color: "#F59E0B" },
      { id: "r2", label: "Secondary road", confidence: 0.93, bbox: { x: 38, y: 5, w: 6, h: 90 }, color: "#F59E0B" },
      { id: "v1", label: "Vegetation patch", confidence: 0.87, bbox: { x: 70, y: 60, w: 18, h: 24 }, color: "#10B981" },
      { id: "v2", label: "Tree line", confidence: 0.82, bbox: { x: 8, y: 68, w: 25, h: 12 }, color: "#10B981" },
    ],
    evidence: [
      { id: "e1", text: "Rooftop signatures match multi-story residential buildings", confidence: 0.95, source: "Building detector v4" },
      { id: "e2", text: "Road surface reflectance consistent with asphalt", confidence: 0.93, source: "Surface classifier" },
      { id: "e3", text: "Canopy texture indicates mature deciduous trees", confidence: 0.88, source: "Vegetation model" },
    ],
    modelInfo: { name: "SatGrounding", version: "2.5.0", processingTime: 3.1 },
    suggestions: ["Show only buildings", "Highlight roads in detail", "Measure building footprints"],
  },
];

const CHANGE_RESULTS: AnalysisResult[] = [
  {
    mode: "change",
    answer:
      "Comparing the two images (estimated 18-month interval), I detected significant urban expansion in the northern zone. 12 new building structures were constructed, and approximately 2.3 hectares of vegetation was cleared. One large construction site is actively ongoing.",
    confidence: 0.87,
    summary: "12 new buildings, 2.3 ha vegetation loss, 1 active construction site.",
    changes: [
      { id: "c1", label: "New residential block", type: "added", bbox: { x: 10, y: 8, w: 25, h: 20 }, confidence: 0.95 },
      { id: "c2", label: "Construction site", type: "added", bbox: { x: 55, y: 12, w: 20, h: 18 }, confidence: 0.91 },
      { id: "c3", label: "Vegetation cleared", type: "removed", bbox: { x: 65, y: 55, w: 22, h: 28 }, confidence: 0.89 },
      { id: "c4", label: "Road extension", type: "modified", bbox: { x: 5, y: 44, w: 45, h: 8 }, confidence: 0.86 },
      { id: "c5", label: "New commercial building", type: "added", bbox: { x: 35, y: 60, w: 18, h: 15 }, confidence: 0.83 },
    ],
    evidence: [
      { id: "e1", text: "New building footprints absent in baseline image confirmed by pixel difference", confidence: 0.95, source: "Change detector v3" },
      { id: "e2", text: "Vegetation loss confirmed by NDVI decrease (0.52 → 0.19)", confidence: 0.92, source: "Spectral diff engine" },
      { id: "e3", text: "Construction site material signatures detected (concrete, steel)", confidence: 0.84, source: "Material classifier" },
    ],
    modelInfo: { name: "SatChange", version: "1.8.3", processingTime: 4.7 },
    suggestions: ["How many new structures?", "Quantify vegetation loss", "Zoom into construction site"],
  },
];

export type PipelineStep = {
  id: string;
  label: string;
  status: "pending" | "running" | "done";
};

export const PIPELINE_STEPS: PipelineStep[] = [
  { id: "validate", label: "Image validated", status: "pending" },
  { id: "parse", label: "Query understood", status: "pending" },
  { id: "analyze", label: "Analyzing", status: "pending" },
  { id: "verify", label: "Evidence verified", status: "pending" },
  { id: "complete", label: "Analysis complete", status: "pending" },
];

export async function runAnalysis(
  request: AnalysisRequest,
  onStep: (stepId: string) => void
): Promise<AnalysisResult> {
  await delay(600);
  onStep("validate");
  await delay(700);
  onStep("parse");
  await delay(900);
  onStep("analyze");
  await delay(1200);
  onStep("verify");
  await delay(600);
  onStep("complete");

  if (request.mode === "vqa") {
    const r = VQA_RESULTS[Math.floor(Math.random() * VQA_RESULTS.length)];
    return { ...r };
  }
  if (request.mode === "grounding") return { ...GROUNDING_RESULTS[0] };
  return { ...CHANGE_RESULTS[0] };
}
