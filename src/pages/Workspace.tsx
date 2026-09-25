import { useState, useRef, useCallback, useEffect } from "react";
import {
  Satellite,
  ChevronLeft,
  Upload,
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Layers,
  GitCompare,
  Search,
  Sparkles,
  CheckCircle2,
  Circle,
  Loader2,
  ChevronDown,
  ChevronUp,
  Building2,
  Trees,
  Road,
  Droplets,
  Eye,
  EyeOff,
  BarChart3,
  Download,
  Share2,
  Info,
  MessageSquare,
  RefreshCw,
  SlidersHorizontal,
  Sun,
  Contrast,
  MapPin,
  Clock,
  FileImage,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import type { Page, WorkspaceDraft } from "../App";
import {
  runAnalysis,
  PIPELINE_STEPS,
  type AIMode,
  type AnalysisResult,
  type PipelineStep,
} from "../services/mockApi";

interface Props {
  onNavigate: (p: Page) => void;
  draft?: WorkspaceDraft;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Badge({ children, color = "teal" }: { children: React.ReactNode; color?: string }) {
  const map: Record<string, string> = {
    teal: "bg-teal-50 text-teal-700 border-teal-200",
    violet: "bg-violet-50 text-violet-700 border-violet-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    red: "bg-red-50 text-red-600 border-red-200",
    navy: "bg-navy-100 text-navy-600 border-navy-200",
  };
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${map[color] ?? map.navy}`}>
      {children}
    </span>
  );
}

function ConfidenceBar({ value, color = "#0D9488" }: { value: number; color?: string }) {
  return (
    <div className="h-1.5 bg-navy-100 rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${value * 100}%`, background: color }} />
    </div>
  );
}

function InsightChart({ result }: { result: AnalysisResult }) {
  const bars = result.mode === "change"
    ? [
        { label: "New structures", value: 72, color: "#10B981" },
        { label: "Vegetation loss", value: 48, color: "#EF4444" },
        { label: "Road changes", value: 31, color: "#F59E0B" },
        { label: "Stable area", value: 84, color: "#0D9488" },
      ]
    : [
        { label: "Buildings", value: 78, color: "#0D9488" },
        { label: "Roads", value: 54, color: "#F59E0B" },
        { label: "Vegetation", value: 36, color: "#10B981" },
        { label: "Water", value: 18, color: "#3B82F6" },
      ];

  return (
    <div className="rounded-xl border border-navy-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-600">Scene composition</p>
          <p className="mt-0.5 text-[11px] text-navy-400">Relative signal in analyzed area</p>
        </div>
        <BarChart3 className="h-4 w-4 text-teal-600" />
      </div>
      <div className="space-y-2.5">
        {bars.map((bar) => (
          <div key={bar.label}>
            <div className="mb-1 flex justify-between text-[11px]">
              <span className="text-navy-500">{bar.label}</span>
              <span className="font-mono font-semibold text-navy-700">{bar.value}%</span>
            </div>
            <div className="h-2 rounded-full bg-navy-100">
              <div className="h-2 rounded-full transition-all duration-700" style={{ width: `${bar.value}%`, background: bar.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface UploadBoxProps {
  label: string;
  file: File | null;
  onFile: (f: File) => void;
  onClear: () => void;
  small?: boolean;
}

function UploadBox({ label, file, onFile, onClear, small }: UploadBoxProps) {
  const [drag, setDrag] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files[0];
    if (f) onFile(f);
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-xl transition-colors cursor-pointer ${
        drag ? "border-teal-400 bg-teal-50" : file ? "border-navy-200 bg-navy-50" : "border-navy-200 hover:border-teal-300 hover:bg-teal-50/30"
      } ${small ? "p-3" : "p-4"}`}
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={handleDrop}
      onClick={() => !file && ref.current?.click()}
    >
      <input ref={ref} type="file" accept=".jpg,.jpeg,.png,.tif,.tiff" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }} />
      {file ? (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-navy-200 overflow-hidden shrink-0">
            <img
              src={`https://images.unsplash.com/photo-1722082839841-45473f5a15cf?w=64&h=64&fit=crop&auto=format`}
              alt="thumb"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-navy-800 truncate">{file.name}</p>
            <p className="text-xs text-navy-400">{(file.size / 1024).toFixed(0)} KB</p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onClear(); }}
            className="p-1 rounded-lg hover:bg-navy-200 shrink-0"
          >
            <X className="w-3.5 h-3.5 text-navy-500" />
          </button>
        </div>
      ) : (
        <div className={`flex flex-col items-center gap-2 ${small ? "py-1" : "py-2"}`}>
          <Upload className={`text-navy-400 ${small ? "w-4 h-4" : "w-5 h-5"}`} />
          <div className="text-center">
            <p className={`font-medium text-navy-600 ${small ? "text-xs" : "text-sm"}`}>{label}</p>
            {!small && <p className="text-xs text-navy-400 mt-0.5">JPG · PNG · GeoTIFF · COG</p>}
          </div>
        </div>
      )}
    </div>
  );
}

const LAYER_DEFS = [
  { id: "buildings", label: "Buildings", color: "#0D9488", Icon: Building2 },
  { id: "roads", label: "Roads", color: "#F59E0B", Icon: Road },
  { id: "vegetation", label: "Vegetation", color: "#10B981", Icon: Trees },
  { id: "water", label: "Water", color: "#3B82F6", Icon: Droplets },
  { id: "changes", label: "Changes", color: "#EF4444", Icon: GitCompare },
];

const RESULT_TABS = ["Overview", "Map", "Objects", "Changes", "Evidence", "Export"];

const MODES: { id: AIMode; label: string; icon: typeof Search; desc: string; color: string }[] = [
  { id: "vqa", label: "Ask", icon: Search, desc: "Answer questions about an image", color: "teal" },
  { id: "grounding", label: "Detect", icon: Layers, desc: "Locate and highlight objects", color: "violet" },
  { id: "change", label: "Compare", icon: GitCompare, desc: "Detect changes between two images", color: "amber" },
];

const SAMPLE_QUESTIONS: Record<AIMode, string[]> = {
  vqa: [
    "How many buildings are visible?",
    "What is the vegetation coverage?",
    "Describe the road network.",
    "Are there any industrial areas?",
  ],
  grounding: [
    "Show me those buildings",
    "Highlight all roads",
    "Find vegetation patches",
    "Locate water bodies",
  ],
  change: [
    "How many new structures?",
    "Zoom into the changed area",
    "Quantify vegetation loss",
    "Show construction sites",
  ],
};

// Satellite viewer overlays for mock data
const MOCK_OBJECTS = [
  { x: 12, y: 10, w: 22, h: 18, label: "Building cluster A", color: "#0D9488", conf: 0.97 },
  { x: 42, y: 38, w: 16, h: 14, label: "Large structure", color: "#0D9488", conf: 0.95 },
  { x: 62, y: 15, w: 20, h: 22, label: "Building cluster B", color: "#0D9488", conf: 0.89 },
  { x: 5, y: 47, w: 90, h: 7, label: "Main road", color: "#F59E0B", conf: 0.98 },
  { x: 37, y: 5, w: 7, h: 90, label: "Secondary road", color: "#F59E0B", conf: 0.93 },
  { x: 70, y: 60, w: 18, h: 24, label: "Vegetation", color: "#10B981", conf: 0.87 },
];

const MOCK_CHANGES = [
  { x: 10, y: 8, w: 25, h: 20, label: "New residential block", type: "added", conf: 0.95 },
  { x: 55, y: 12, w: 20, h: 18, label: "Construction site", type: "added", conf: 0.91 },
  { x: 65, y: 55, w: 22, h: 28, label: "Vegetation cleared", type: "removed", conf: 0.89 },
  { x: 5, y: 44, w: 45, h: 8, label: "Road extension", type: "modified", conf: 0.86 },
];

const changeColor = { added: "#10B981", removed: "#EF4444", modified: "#F59E0B" };

// ─── Main Workspace ───────────────────────────────────────────────────────────

function SpaceBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#020617]">
      <div className="absolute left-[8%] top-[10%] h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute right-[5%] top-[15%] h-128 w-lg rounded-full bg-violet-600/15 blur-[140px]" />
      <div className="absolute bottom-[-10%] left-[35%] h-96 w-96 rounded-full bg-blue-600/10 blur-[130px]" />

      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,.06) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      <div
        className="absolute left-[5%] top-[20%] h-1 w-1 rounded-full bg-white"
        style={{
          boxShadow:
            "100px 80px #fff, 220px -20px #fff, 380px 120px #fff, 520px -50px #fff, 700px 60px #fff, 850px 150px #fff, 1050px -30px #fff",
        }}
      />
    </div>
  );
}

export default function Workspace({ onNavigate, draft }: Props) {
  // Upload state
  const [imageA, setImageA] = useState<File | null>(draft?.image ?? null);
  const [imageB, setImageB] = useState<File | null>(null);
  const [mode, setMode] = useState<AIMode>("grounding");

  // Layer visibility
  const [layers, setLayers] = useState<Record<string, boolean>>({
    buildings: true, roads: true, vegetation: true, water: false, changes: false,
  });
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [showControls, setShowControls] = useState(false);

  // Question & analysis
  const [question, setQuestion] = useState(draft?.question ?? "");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [pipeline, setPipeline] = useState<PipelineStep[]>(PIPELINE_STEPS);
  const [activeTab, setActiveTab] = useState("Overview");
  const [showTech, setShowTech] = useState(false);
  const [followUp, setFollowUp] = useState("");

  // Viewer state
  const [zoom, setZoom] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [hoveredObj, setHoveredObj] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(() => draft?.image ? URL.createObjectURL(draft.image) : null);
  const [notice, setNotice] = useState<string | null>(null);

  // Left panel toggles
  const [leftTab, setLeftTab] = useState<"single" | "pair">("single");
  const [layersOpen, setLayersOpen] = useState(true);
  const [controlsOpen, setControlsOpen] = useState(false);

  useEffect(() => () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
  }, [imageUrl]);

  const handleImageA = (file: File) => {
    setImageA(file);
    setImageUrl((previous) => {
      if (previous) URL.revokeObjectURL(previous);
      return URL.createObjectURL(file);
    });
  };

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 2600);
  };

  const exportAnalysis = (format: "json" | "geojson" | "report") => {
    if (!result) return;
    const payload = format === "geojson"
      ? { type: "FeatureCollection", features: (result.objects ?? result.changes ?? []).map((item) => ({ type: "Feature", properties: item, geometry: null })) }
      : { generatedAt: new Date().toISOString(), question, ...result };
    const blob = new Blob([format === "report" ? JSON.stringify(payload, null, 2) : JSON.stringify(payload, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `satquery-${format}-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
    showNotice(`${format === "report" ? "Report" : format.toUpperCase()} export downloaded`);
  };

  const shareSession = async () => {
    const shareText = `SatQuery AI analysis: ${result?.summary ?? "Ready for analysis"}`;
    if (navigator.share) await navigator.share({ title: "SatQuery AI", text: shareText });
    else if (navigator.clipboard) await navigator.clipboard.writeText(shareText);
    showNotice(navigator.share ? "Share sheet opened" : "Analysis summary copied");
  };

  const toggleLayer = (id: string) => setLayers((p) => ({ ...p, [id]: !p[id] }));

  const handleAnalyze = useCallback(async () => {
    if (!question.trim()) return;
    setAnalyzing(true);
    setResult(null);
    setActiveTab("Overview");
    const fresh = PIPELINE_STEPS.map((s) => ({ ...s, status: "pending" as const }));
    setPipeline(fresh);

    try {
      const res = await runAnalysis(
        { mode, question, imageA, imageB },
        (stepId) => {
          setPipeline((prev) =>
            prev.map((s) => {
              if (s.id === stepId) return { ...s, status: "running" };
              const idx = prev.findIndex((x) => x.id === stepId);
              const sIdx = prev.findIndex((x) => x.id === s.id);
              if (sIdx < idx) return { ...s, status: "done" };
              return s;
            })
          );
        }
      );
      setPipeline((prev) => prev.map((s) => ({ ...s, status: "done" })));
      setResult(res);
      // Auto-enable relevant layers
      if (res.objects) setLayers((p) => ({ ...p, buildings: true, roads: true, vegetation: true }));
      if (res.changes) setLayers((p) => ({ ...p, changes: true }));
    } finally {
      setAnalyzing(false);
    }
  }, [question, mode, imageA, imageB]);

  const handleFollowUp = (q: string) => {
    setQuestion(q);
    setFollowUp(q);
    setTimeout(() => handleAnalyze(), 50);
  };

  const pipelineDone = pipeline.every((s) => s.status === "done");

  const showObjects = result?.mode === "grounding" && layers.buildings;
  const showChanges = result?.mode === "change" && layers.changes;

  return (
    <div className={`workspace-space-theme relative flex flex-col overflow-hidden bg-[#020617] ${fullscreen ? "fixed inset-0 z-50" : "h-full"}`}>
      <SpaceBackground />

      <style>{`
        .workspace-space-theme {
          background:
            radial-gradient(circle at 12% 18%, rgba(24, 92, 150, 0.28) 0%, rgba(24, 92, 150, 0.12) 18%, transparent 42%),
            radial-gradient(circle at 88% 12%, rgba(91, 52, 150, 0.24) 0%, rgba(91, 52, 150, 0.10) 20%, transparent 42%),
            radial-gradient(circle at 55% 90%, rgba(15, 76, 130, 0.20) 0%, transparent 40%),
            linear-gradient(135deg, #020617 0%, #030a16 35%, #06101f 70%, #020617 100%) !important;
        }

        .workspace-space-theme header,
        .workspace-space-theme aside {
          background: rgba(3, 10, 24, 0.82) !important;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-color: rgba(148, 163, 184, 0.16) !important;
        }

        .workspace-space-theme .bg-white {
          background: rgba(7, 17, 34, 0.82) !important;
          color: #e2e8f0 !important;
        }

        .workspace-space-theme .bg-navy-50 {
          background: rgba(15, 30, 52, 0.72) !important;
        }

        .workspace-space-theme .bg-navy-100 {
          background: rgba(30, 48, 74, 0.72) !important;
        }

        .workspace-space-theme .border-navy-100,
        .workspace-space-theme .border-navy-200 {
          border-color: rgba(148, 163, 184, 0.16) !important;
        }

        .workspace-space-theme .text-navy-900 { color: #f8fafc !important; }
        .workspace-space-theme .text-navy-800 { color: #e2e8f0 !important; }
        .workspace-space-theme .text-navy-700 { color: #cbd5e1 !important; }
        .workspace-space-theme .text-navy-600 { color: #b8c5d6 !important; }
        .workspace-space-theme .text-navy-500 { color: #94a3b8 !important; }
        .workspace-space-theme .text-navy-400 { color: #7f8ea3 !important; }

        .workspace-space-theme input,
        .workspace-space-theme textarea,
        .workspace-space-theme select {
          background: rgba(5, 15, 31, 0.78) !important;
          color: #e2e8f0 !important;
          border-color: rgba(148, 163, 184, 0.18) !important;
        }

        .workspace-space-theme input::placeholder,
        .workspace-space-theme textarea::placeholder {
          color: #64748b !important;
        }

        .workspace-space-theme .hover\:bg-navy-50:hover {
          background: rgba(30, 48, 74, 0.72) !important;
        }

        .workspace-space-theme .hover\:bg-navy-100:hover {
          background: rgba(30, 48, 74, 0.86) !important;
        }

        .workspace-space-theme .bg-navy-950 {
          background: rgba(2, 6, 23, 0.74) !important;
        }

        .workspace-space-theme .bg-violet-50 {
          background: rgba(91, 52, 150, 0.14) !important;
          border-color: rgba(167, 139, 250, 0.22) !important;
        }
      `}</style>
      {notice && (
        <div className="fixed bottom-5 left-1/2 z-60 -translate-x-1/2 rounded-xl bg-navy-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xl">
          {notice}
        </div>
      )}
      {/* ── Top bar ── */}
      <header className="bg-white border-b border-navy-200 shrink-0 z-20">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate("landing")}
              className="flex items-center gap-1.5 text-navy-500 hover:text-navy-800 transition-colors text-sm font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={() => onNavigate("satellite-info")}
              className="hidden md:block text-xs font-medium text-navy-500 hover:text-teal-700 transition-colors"
            >
              Satellite guide
            </button>
            <div className="w-px h-5 bg-navy-200" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center">
                <Satellite className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-navy-900 text-sm">
                Sat<span className="text-teal-600">Query</span> AI
              </span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-navy-100 rounded-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium text-navy-600">Analysis workspace</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={shareSession} className="hidden md:flex items-center gap-1.5 text-xs font-medium text-navy-600 hover:text-navy-800 px-3 py-1.5 rounded-lg hover:bg-navy-100 transition-colors">
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
            <button onClick={() => result ? exportAnalysis("report") : showNotice("Run an analysis before exporting")} className="hidden md:flex items-center gap-1.5 text-xs font-medium text-navy-600 hover:text-navy-800 px-3 py-1.5 rounded-lg hover:bg-navy-100 transition-colors">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
            <button onClick={() => { localStorage.setItem("satquery-session", JSON.stringify({ question, mode, result })); showNotice("Session saved locally"); }} className="text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 px-3 py-1.5 rounded-lg transition-colors">
              Save session
            </button>
          </div>
        </div>

        {/* Mode selector */}
        <div className="border-t border-navy-100 px-4 pb-2 pt-1 flex items-center gap-2 overflow-x-auto">
          {MODES.map(({ id, label, icon: Icon, desc, color }) => {
            const active = mode === id;
            const colorMap: Record<string, string> = {
              teal: active ? "bg-teal-600 text-white border-teal-600" : "text-navy-600 border-navy-200 hover:border-teal-300 hover:text-teal-700",
              violet: active ? "bg-violet-600 text-white border-violet-600" : "text-navy-600 border-navy-200 hover:border-violet-300 hover:text-violet-700",
              amber: active ? "bg-amber-500 text-white border-amber-500" : "text-navy-600 border-navy-200 hover:border-amber-300 hover:text-amber-700",
            };
            return (
              <button
                key={id}
                onClick={() => { setMode(id); setResult(null); }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-semibold transition-all whitespace-nowrap ${colorMap[color]}`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
                {!active && <span className="hidden lg:inline text-xs font-normal opacity-60">— {desc}</span>}
              </button>
            );
          })}
        </div>
      </header>

      {/* ── Main 3-column layout ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Left: Imagery & Controls ── */}
        <aside className="w-72 shrink-0 bg-white border-r border-navy-200 flex-col overflow-y-auto hidden md:flex">
          {/* Upload tabs */}
          <div className="p-4 border-b border-navy-100">
            <div className="flex rounded-lg bg-navy-100 p-1 mb-4">
              <button
                onClick={() => setLeftTab("single")}
                className={`flex-1 text-xs font-semibold py-1.5 rounded-md transition-colors ${leftTab === "single" ? "bg-white text-navy-800 shadow-sm" : "text-navy-500 hover:text-navy-700"}`}
              >
                Single image
              </button>
              <button
                onClick={() => setLeftTab("pair")}
                className={`flex-1 text-xs font-semibold py-1.5 rounded-md transition-colors ${leftTab === "pair" ? "bg-white text-navy-800 shadow-sm" : "text-navy-500 hover:text-navy-700"}`}
              >
                Image pair
              </button>
            </div>

            {leftTab === "single" ? (
              <UploadBox
                label="Upload satellite image"
                file={imageA}
                onFile={handleImageA}
                onClear={() => { setImageA(null); setImageUrl(null); }}
              />
            ) : (
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-medium text-navy-500 mb-1.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Before image
                  </p>
                  <UploadBox label="Earlier date" file={imageA} onFile={handleImageA} onClear={() => { setImageA(null); setImageUrl(null); }} small />
                </div>
                <div>
                  <p className="text-xs font-medium text-navy-500 mb-1.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> After image
                  </p>
                  <UploadBox label="Later date" file={imageB} onFile={setImageB} onClear={() => setImageB(null)} small />
                </div>
              </div>
            )}

            {(imageA || imageB) && (
              <div className="mt-3 p-3 bg-navy-50 rounded-xl text-xs space-y-1">
                {imageA && (
                  <div className="flex items-center gap-2 text-navy-600">
                    <FileImage className="w-3.5 h-3.5 text-navy-400 shrink-0" />
                    <span className="truncate">{imageA.name}</span>
                    <Badge color="emerald">Ready</Badge>
                  </div>
                )}
                {imageB && (
                  <div className="flex items-center gap-2 text-navy-600">
                    <FileImage className="w-3.5 h-3.5 text-navy-400 shrink-0" />
                    <span className="truncate">{imageB.name}</span>
                    <Badge color="emerald">Ready</Badge>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="p-4 border-b border-navy-100">
            <p className="text-xs font-semibold text-navy-600 uppercase tracking-wide mb-2">Imagery</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "photo-1722082839841-45473f5a15cf", label: "Zone A" },
                { id: "photo-1579158949974-bfa5b5f171e1", label: "Zone B" },
              ].map(({ id, label }, i) => (
                <button key={id} className={`rounded-lg overflow-hidden border-2 transition-colors ${i === 0 ? "border-teal-400" : "border-transparent hover:border-navy-300"}`}>
                  <img src={`https://images.unsplash.com/${id}?w=120&h=80&fit=crop&auto=format`} alt={label} className="w-full h-16 object-cover" />
                  <p className="text-xs text-center py-1 text-navy-600 font-medium bg-white">{label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Layers */}
          <div className="border-b border-navy-100">
            <button
              onClick={() => setLayersOpen(!layersOpen)}
              className="w-full flex items-center justify-between p-4 hover:bg-navy-50 transition-colors"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-navy-600 uppercase tracking-wide">
                <Layers className="w-3.5 h-3.5" /> Layers
              </div>
              {layersOpen ? <ChevronUp className="w-4 h-4 text-navy-400" /> : <ChevronDown className="w-4 h-4 text-navy-400" />}
            </button>
            {layersOpen && (
              <div className="px-4 pb-4 space-y-1.5">
                {LAYER_DEFS.map(({ id, label, color, Icon }) => (
                  <button
                    key={id}
                    onClick={() => toggleLayer(id)}
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-navy-50 transition-colors group"
                  >
                    <div className="w-3 h-3 rounded-sm shrink-0" style={{ background: color, opacity: layers[id] ? 1 : 0.3 }} />
                    <Icon className="w-3.5 h-3.5 text-navy-400 shrink-0" />
                    <span className={`text-xs font-medium flex-1 text-left transition-colors ${layers[id] ? "text-navy-700" : "text-navy-400"}`}>{label}</span>
                    {layers[id] ? (
                      <Eye className="w-3.5 h-3.5 text-navy-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-navy-300" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Display controls */}
          <div>
            <button
              onClick={() => setControlsOpen(!controlsOpen)}
              className="w-full flex items-center justify-between p-4 hover:bg-navy-50 transition-colors"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-navy-600 uppercase tracking-wide">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Display
              </div>
              {controlsOpen ? <ChevronUp className="w-4 h-4 text-navy-400" /> : <ChevronDown className="w-4 h-4 text-navy-400" />}
            </button>
            {controlsOpen && (
              <div className="px-4 pb-4 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-navy-500">
                      <Sun className="w-3.5 h-3.5" /> Brightness
                    </div>
                    <span className="text-xs font-mono text-navy-600">{brightness}%</span>
                  </div>
                  <input type="range" min={50} max={150} value={brightness} onChange={(e) => setBrightness(+e.target.value)} className="w-full h-1.5 rounded-full accent-teal-600 cursor-pointer" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-navy-500">
                      <Contrast className="w-3.5 h-3.5" /> Contrast
                    </div>
                    <span className="text-xs font-mono text-navy-600">{contrast}%</span>
                  </div>
                  <input type="range" min={50} max={150} value={contrast} onChange={(e) => setContrast(+e.target.value)} className="w-full h-1.5 rounded-full accent-teal-600 cursor-pointer" />
                </div>
                <button
                  onClick={() => { setBrightness(100); setContrast(100); }}
                  className="text-xs text-navy-500 hover:text-navy-700 flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Reset
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* ── Center: Satellite viewer ── */}
        <main className="flex-1 flex flex-col bg-navy-950 min-w-0 relative">
          {/* Viewer toolbar */}
          <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-1.5 pointer-events-auto">
              <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-2">
                <MapPin className="w-3 h-3 text-teal-400" />
                <span className="text-xs font-mono text-white/80">28.6139°N 77.2090°E</span>
              </div>
              {mode === "change" && (
                <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-2">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span className="text-xs text-white/80">Jan 2024 → Jul 2025</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1.5 pointer-events-auto">
              <button onClick={() => setZoom((z) => Math.min(3, z + 0.25))} className="bg-black/50 backdrop-blur-sm p-1.5 rounded-lg hover:bg-black/70 transition-colors">
                <ZoomIn className="w-4 h-4 text-white" />
              </button>
              <button onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))} className="bg-black/50 backdrop-blur-sm p-1.5 rounded-lg hover:bg-black/70 transition-colors">
                <ZoomOut className="w-4 h-4 text-white" />
              </button>
              <button onClick={() => setFullscreen(!fullscreen)} className="bg-black/50 backdrop-blur-sm p-1.5 rounded-lg hover:bg-black/70 transition-colors">
                <Maximize2 className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Zoom indicator */}
          <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg px-2.5 py-1">
              <span className="text-xs font-mono text-white/70">{Math.round(zoom * 100)}%</span>
            </div>
          </div>

          {/* Satellite image + overlays */}
          <div className="flex-1 overflow-hidden relative flex items-center justify-center">
            <div
              className="relative transition-transform duration-200"
              style={{ transform: `scale(${zoom})`, filter: `brightness(${brightness}%) contrast(${contrast}%)` }}
            >
              <img
                src={imageUrl ?? "https://images.unsplash.com/photo-1722082839841-45473f5a15cf?w=900&h=600&fit=crop&auto=format"}
                alt="Satellite imagery"
                className="block max-w-full select-none"
                style={{ maxHeight: "calc(100vh - 180px)" }}
                draggable={false}
              />

              {/* Detection overlays */}
              {result && showObjects && (
                <div className="absolute inset-0">
                  {MOCK_OBJECTS.filter((o) => {
                    if (o.color === "#0D9488" && !layers.buildings) return false;
                    if (o.color === "#F59E0B" && !layers.roads) return false;
                    if (o.color === "#10B981" && !layers.vegetation) return false;
                    return true;
                  }).map((o, i) => (
                    <div
                      key={i}
                      className="absolute rounded cursor-pointer transition-opacity"
                      style={{
                        left: `${o.x}%`,
                        top: `${o.y}%`,
                        width: `${o.w}%`,
                        height: `${o.h}%`,
                        border: `2px solid ${o.color}`,
                        background: `${o.color}18`,
                        opacity: hoveredObj === String(i) ? 1 : 0.75,
                      }}
                      onMouseEnter={() => setHoveredObj(String(i))}
                      onMouseLeave={() => setHoveredObj(null)}
                    >
                      <span
                        className="absolute -top-5 left-0 text-white text-xs font-semibold px-1.5 py-0.5 rounded whitespace-nowrap"
                        style={{ background: o.color }}
                      >
                        {o.label} · {Math.round(o.conf * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Change detection overlays */}
              {result && showChanges && (
                <div className="absolute inset-0">
                  {MOCK_CHANGES.map((c, i) => {
                    const color = changeColor[c.type as keyof typeof changeColor];
                    return (
                      <div
                        key={i}
                        className="absolute rounded cursor-pointer"
                        style={{
                          left: `${c.x}%`,
                          top: `${c.y}%`,
                          width: `${c.w}%`,
                          height: `${c.h}%`,
                          border: `2px solid ${color}`,
                          background: `${color}22`,
                        }}
                        onMouseEnter={() => setHoveredObj(`c${i}`)}
                        onMouseLeave={() => setHoveredObj(null)}
                      >
                        <span
                          className="absolute -top-5 left-0 text-white text-xs font-semibold px-1.5 py-0.5 rounded whitespace-nowrap capitalize"
                          style={{ background: color }}
                        >
                          {c.type}: {c.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Change timeline strip */}
              {mode === "change" && (
                <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-white/20 rounded-full relative">
                    <div className="absolute left-0 top-0 h-full w-1/3 bg-amber-400 rounded-full" />
                    <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-400 border-2 border-white cursor-pointer" />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-white/70 shrink-0">
                    <span>Jan 2024</span>
                    <span className="text-white/40">→</span>
                    <span>Jul 2025</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* ── Right: AI Analysis ── */}
        <aside className="w-96 shrink-0 bg-white border-l border-navy-200 flex-col overflow-hidden hidden lg:flex">
          {/* Question section */}
          <div className="p-4 border-b border-navy-100 shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-violet-100 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-violet-600" />
              </div>
              <span className="text-xs font-semibold text-navy-600 uppercase tracking-wide">AI Query</span>
              <Badge color={mode === "vqa" ? "teal" : mode === "grounding" ? "violet" : "amber"}>
                {MODES.find((m) => m.id === mode)?.label}
              </Badge>
            </div>

            <div className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-colors ${analyzing ? "border-violet-300 bg-violet-50" : "border-navy-200 hover:border-navy-300 focus-within:border-teal-400"}`}>
              <MessageSquare className="w-4 h-4 text-navy-400 shrink-0" />
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleAnalyze(); } }}
                placeholder="Ask anything about the image…"
                rows={2}
                className="flex-1 text-sm text-navy-800 placeholder-navy-400 bg-transparent resize-none outline-none leading-relaxed"
                disabled={analyzing}
              />
            </div>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {SAMPLE_QUESTIONS[mode].map((q) => (
                <button
                  key={q}
                  onClick={() => setQuestion(q)}
                  className="text-xs px-2.5 py-1 rounded-full border border-navy-200 text-navy-500 hover:border-navy-300 hover:text-navy-700 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            <button
              onClick={handleAnalyze}
              disabled={analyzing || !question.trim()}
              className="mt-3 w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
            >
              {analyzing ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing…</>
              ) : (
                <><Sparkles className="w-4 h-4" /> Analyze</>
              )}
            </button>
          </div>

          {/* Pipeline status */}
          {(analyzing || result) && (
            <div className="px-4 py-3 border-b border-navy-100 bg-navy-50 shrink-0">
              <div className="space-y-1.5">
                {pipeline.map((step) => (
                  <div key={step.id} className="flex items-center gap-2.5">
                    {step.status === "done" ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : step.status === "running" ? (
                      <Loader2 className="w-3.5 h-3.5 text-teal-500 animate-spin shrink-0" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-navy-300 shrink-0" />
                    )}
                    <span className={`text-xs font-medium transition-colors ${step.status === "done" ? "text-emerald-600" : step.status === "running" ? "text-teal-600" : "text-navy-400"}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="flex-1 overflow-y-auto">
              {/* Result tabs */}
              <div className="flex overflow-x-auto border-b border-navy-100 shrink-0">
                {RESULT_TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`shrink-0 px-4 py-2.5 text-xs font-semibold transition-colors border-b-2 ${activeTab === tab ? "border-teal-500 text-teal-600" : "border-transparent text-navy-500 hover:text-navy-700"}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-4 space-y-4">
                {/* Overview tab */}
                {activeTab === "Overview" && (
                  <>
                    {/* Confidence */}
                    <div className="bg-navy-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-navy-500" />
                          <span className="text-xs font-semibold text-navy-600 uppercase tracking-wide">Confidence</span>
                        </div>
                        <span className={`text-sm font-bold ${result.confidence >= 0.9 ? "text-emerald-600" : result.confidence >= 0.75 ? "text-amber-600" : "text-red-500"}`}>
                          {Math.round(result.confidence * 100)}%
                        </span>
                      </div>
                      <ConfidenceBar value={result.confidence} />
                      <p className="text-xs text-navy-400 mt-2">{result.summary}</p>
                    </div>

                    <InsightChart result={result} />

                    {/* Answer */}
                    <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-md bg-violet-600 flex items-center justify-center">
                          <Sparkles className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-xs font-semibold text-violet-700 uppercase tracking-wide">Analysis</span>
                      </div>
                      <p className="text-sm text-navy-700 leading-relaxed">{result.answer}</p>
                    </div>

                    {/* Objects / Changes summary */}
                    {result.objects && (
                      <div>
                        <p className="text-xs font-semibold text-navy-600 uppercase tracking-wide mb-2">Detected objects</p>
                        <div className="space-y-2">
                          {result.objects.slice(0, 4).map((obj) => (
                            <div key={obj.id} className="flex items-center gap-3 p-2.5 bg-navy-50 rounded-lg">
                              <div className="w-3 h-3 rounded-sm shrink-0" style={{ background: obj.color }} />
                              <span className="text-xs text-navy-700 font-medium flex-1 truncate">{obj.label}</span>
                              <span className="text-xs font-semibold text-navy-500 font-mono">{Math.round(obj.confidence * 100)}%</span>
                              <ConfidenceBar value={obj.confidence} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {result.changes && (
                      <div>
                        <p className="text-xs font-semibold text-navy-600 uppercase tracking-wide mb-2">Detected changes</p>
                        <div className="space-y-2">
                          {result.changes.map((c) => (
                            <div key={c.id} className="flex items-center gap-2.5 p-2.5 bg-navy-50 rounded-lg">
                              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: changeColor[c.type as keyof typeof changeColor] }} />
                              <span className="text-xs text-navy-700 font-medium flex-1 truncate">{c.label}</span>
                              <Badge color={c.type === "added" ? "emerald" : c.type === "removed" ? "red" : "amber"}>
                                {c.type}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Follow-up suggestions */}
                    <div>
                      <p className="text-xs font-semibold text-navy-600 uppercase tracking-wide mb-2">Follow-up questions</p>
                      <div className="space-y-1.5">
                        {result.suggestions.map((s) => (
                          <button
                            key={s}
                            onClick={() => handleFollowUp(s)}
                            className="w-full flex items-center gap-2 p-2.5 rounded-lg border border-navy-200 hover:border-teal-300 hover:bg-teal-50 transition-colors text-left group"
                          >
                            <ArrowRight className="w-3.5 h-3.5 text-navy-400 group-hover:text-teal-600 shrink-0 transition-colors" />
                            <span className="text-xs text-navy-600 group-hover:text-teal-700 font-medium">{s}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Evidence tab */}
                {activeTab === "Evidence" && (
                  <div className="space-y-3">
                    {result.evidence.map((ev) => (
                      <div key={ev.id} className="border border-navy-200 rounded-xl p-4">
                        <div className="flex items-start gap-2">
                          <ShieldCheckIcon className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-navy-700 leading-relaxed mb-2">{ev.text}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-navy-400 font-mono">{ev.source}</span>
                              <Badge color="emerald">{Math.round(ev.confidence * 100)}%</Badge>
                            </div>
                            <div className="mt-2">
                              <ConfidenceBar value={ev.confidence} color="#0D9488" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Objects tab */}
                {activeTab === "Objects" && result.objects && (
                  <div className="space-y-2">
                    {result.objects.map((obj) => (
                      <div key={obj.id} className="border border-navy-200 rounded-xl p-3">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-4 h-4 rounded" style={{ background: obj.color }} />
                          <span className="text-sm font-semibold text-navy-800 flex-1">{obj.label}</span>
                          <Badge color="emerald">{Math.round(obj.confidence * 100)}%</Badge>
                        </div>
                        <ConfidenceBar value={obj.confidence} color={obj.color} />
                        <p className="text-xs text-navy-400 mt-1.5">Bbox: {obj.bbox.x}%, {obj.bbox.y}% · {obj.bbox.w}×{obj.bbox.h}%</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Changes tab */}
                {activeTab === "Changes" && result.changes && (
                  <div className="space-y-2">
                    {result.changes.map((c) => (
                      <div key={c.id} className="border border-navy-200 rounded-xl p-3">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-3 h-3 rounded-full" style={{ background: changeColor[c.type as keyof typeof changeColor] }} />
                          <span className="text-sm font-semibold text-navy-800 flex-1">{c.label}</span>
                          <Badge color={c.type === "added" ? "emerald" : c.type === "removed" ? "red" : "amber"}>
                            {c.type}
                          </Badge>
                        </div>
                        <ConfidenceBar value={c.confidence} color={changeColor[c.type as keyof typeof changeColor]} />
                      </div>
                    ))}
                  </div>
                )}

                {/* Export tab */}
                {activeTab === "Export" && (
                  <div className="space-y-3">
                    <p className="text-xs text-navy-500 leading-relaxed">Export the analysis results in your preferred format.</p>
                    {[
                      { label: "Full report (PDF)", icon: Download, desc: "Analysis, evidence, and detections" },
                      { label: "GeoJSON overlays", icon: MapPin, desc: "Detection geometry for GIS tools" },
                      { label: "Raw JSON response", icon: Info, desc: "Structured data for developers" },
                    ].map(({ label, icon: Icon, desc }) => (
                      <button key={label} onClick={() => exportAnalysis(label.includes("GeoJSON") ? "geojson" : label.includes("PDF") ? "report" : "json")} className="w-full flex items-center gap-3 p-3 border border-navy-200 rounded-xl hover:bg-navy-50 transition-colors text-left">
                        <div className="w-8 h-8 rounded-lg bg-navy-100 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-navy-500" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-navy-800">{label}</p>
                          <p className="text-xs text-navy-400">{desc}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-navy-300 ml-auto" />
                      </button>
                    ))}
                  </div>
                )}

                {activeTab === "Map" && (
                  <div className="space-y-3">
                    <div className="relative h-48 overflow-hidden rounded-xl border border-navy-200 bg-[#dbe8e4]">
                      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(28deg, transparent 45%, #7ba99c 46%, transparent 48%), linear-gradient(115deg, transparent 48%, #93b9ae 49%, transparent 51%), repeating-linear-gradient(0deg, transparent 0 28px, #b5cdc6 29px 30px)" }} />
                      {(result.objects ?? result.changes ?? []).slice(0, 6).map((item, index) => {
                        const bbox = "bbox" in item ? item.bbox : { x: 10 + index * 12, y: 15 + index * 8, w: 12, h: 10 };
                        return <span key={index} className="absolute h-3 w-3 rounded-full border-2 border-white bg-teal-600 shadow" style={{ left: `${bbox.x}%`, top: `${bbox.y}%` }} />;
                      })}
                      <span className="absolute bottom-3 left-3 rounded-md bg-white/85 px-2 py-1 text-[10px] font-mono text-navy-600">28.6139°N 77.2090°E</span>
                    </div>
                    <p className="text-xs leading-relaxed text-navy-500">Spatial index centered on the analyzed footprint. Pins represent detected regions and are linked to the active overlays.</p>
                  </div>
                )}

                {/* Technical details toggle */}
                <div className="border border-navy-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setShowTech(!showTech)}
                    className="w-full flex items-center gap-2 p-3 hover:bg-navy-50 transition-colors"
                  >
                    <Info className="w-3.5 h-3.5 text-navy-400" />
                    <span className="text-xs font-medium text-navy-500 flex-1 text-left">Show technical details</span>
                    {showTech ? <ChevronUp className="w-3.5 h-3.5 text-navy-400" /> : <ChevronDown className="w-3.5 h-3.5 text-navy-400" />}
                  </button>
                  {showTech && (
                    <div className="border-t border-navy-100 p-3 bg-navy-50">
                      <div className="space-y-1.5 font-mono text-xs text-navy-500">
                        <div className="flex justify-between">
                          <span>Model</span>
                          <span className="text-navy-700">{result.modelInfo.name} v{result.modelInfo.version}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Inference time</span>
                          <span className="text-navy-700">{result.modelInfo.processingTime}s</span>
                        </div>
                        <div className="flex justify-between">
                          <span>AI mode</span>
                          <span className="text-navy-700">{result.mode.toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Confidence</span>
                          <span className="text-navy-700">{(result.confidence * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Model info footer */}
                <div className="flex items-center gap-2 pt-1 pb-2">
                  <div className="w-5 h-5 rounded-md bg-violet-100 flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-violet-600" />
                  </div>
                  <span className="text-xs text-navy-400">
                    {result.modelInfo.name} · v{result.modelInfo.version} · {result.modelInfo.processingTime}s
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Empty state */}
          {!result && !analyzing && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-navy-100 flex items-center justify-center mb-4">
                <Sparkles className="w-7 h-7 text-navy-400" />
              </div>
              <p className="text-sm font-semibold text-navy-700 mb-2">No analysis yet</p>
              <p className="text-xs text-navy-400 leading-relaxed max-w-48">
                Type a question above and click Analyze to get AI-powered insights from the satellite image.
              </p>
              <div className="mt-6 space-y-2 w-full max-w-56">
                {SAMPLE_QUESTIONS[mode].slice(0, 3).map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuestion(q)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-navy-200 text-navy-500 hover:border-teal-300 hover:text-teal-700 hover:bg-teal-50 transition-colors text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* ── Mobile bottom sheet (AI panel) ── */}
      <div className="lg:hidden border-t border-navy-200 bg-white shrink-0 max-h-64 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-violet-100 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-violet-600" />
            </div>
            <span className="text-xs font-semibold text-navy-600">AI Query</span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything…"
              className="flex-1 text-sm border border-navy-200 rounded-lg px-3 py-2 outline-none focus:border-teal-400"
            />
            <button
              onClick={handleAnalyze}
              disabled={analyzing || !question.trim()}
              className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-semibold"
            >
              {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : "Ask"}
            </button>
          </div>
          {result && (
            <div className="mt-3 p-3 bg-violet-50 border border-violet-200 rounded-xl">
              <p className="text-xs text-navy-700 leading-relaxed line-clamp-3">{result.answer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Inline ShieldCheck (to avoid import duplication)
function ShieldCheckIcon({ className }: { className?: string }) {
  return <ShieldCheck className={className} />;
}
