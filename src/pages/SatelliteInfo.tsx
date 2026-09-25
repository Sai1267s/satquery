const ArrowRight = () => null;
const BarChart3 = () => null;
const BookOpen = () => null;
const CheckCircle2 = () => null;
const ChevronLeft = () => null;
const Globe2 = () => null;
const Layers3 = () => null;
const Map = () => null;
const Satellite = () => null;
const ShieldCheck = () => null;
const Sparkles = () => null;
const Waves = () => null;
import type { Page } from "../App";

interface Props {
  onNavigate: (page: Page) => void;
  onOpenWorkspace: (draft?: { question?: string }) => void;
}

const MISSIONS = [
  { name: "Sentinel-2", detail: "Optical multispectral imagery", coverage: "10-60 m", cadence: "5 days" },
  { name: "Landsat 8/9", detail: "Long-term land monitoring", coverage: "15-100 m", cadence: "16 days" },
  { name: "Sentinel-1", detail: "All-weather radar imagery", coverage: "5-40 m", cadence: "6 days" },
  { name: "Commercial high-res", detail: "Detailed urban analysis", coverage: "0.3-5 m", cadence: "Tasked" },
];

const BANDS = [
  { band: "Blue", range: "490 nm", use: "Water, atmosphere, bathymetry", color: "bg-blue-500" },
  { band: "Green", range: "560 nm", use: "Vegetation vigor and true-color mapping", color: "bg-emerald-500" },
  { band: "Red", range: "665 nm", use: "Soil, built surfaces, plant absorption", color: "bg-red-500" },
  { band: "NIR", range: "842 nm", use: "Canopy structure and vegetation health", color: "bg-violet-500" },
  { band: "SWIR", range: "1610 nm", use: "Moisture, burn scars, materials", color: "bg-amber-500" },
];

const QUERY_STARTERS = [
  "Compare vegetation loss around a new road",
  "Find buildings within 100 meters of water",
  "Estimate crop health by field",
  "Detect flood extent after a storm",
];

const DATASETS = [
  { name: "Sentinel-2 L2A", provider: "Copernicus / ESA", bestFor: "Land cover, crops, vegetation", update: "Every 5 days", color: "border-emerald-200 bg-emerald-50" },
  { name: "Landsat Collection 2", provider: "USGS / NASA", bestFor: "Long-term change history", update: "Every 16 days", color: "border-blue-200 bg-blue-50" },
  { name: "Sentinel-1 GRD", provider: "Copernicus / ESA", bestFor: "Floods, structure, cloudy scenes", update: "Every 6 days", color: "border-violet-200 bg-violet-50" },
  { name: "SRTM / Copernicus DEM", provider: "NASA / ESA", bestFor: "Elevation, slope, terrain", update: "Static baseline", color: "border-amber-200 bg-amber-50" },
];

const SATELLITE_PARTS = [
  ["Optical payload", "Captures reflected sunlight across visible and infrared bands."],
  ["Radar antenna", "Sends microwave pulses and measures the return, day or night."],
  ["Attitude control", "Keeps the spacecraft pointed at the target during a scan."],
  ["Onboard storage", "Buffers imagery before it can be downlinked to a ground station."],
  ["Ground segment", "Receives, corrects, catalogs, and publishes the imagery dataset."],
  ["Calibration targets", "Known reference surfaces help keep measurements comparable."],
];

export default function SatelliteInfo({ onNavigate, onOpenWorkspace }: Props) {
  return (
    <div className="min-h-full space-page bg-transparent text-slate-100">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#020617]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <button onClick={() => onNavigate("landing")} className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/80">
              <Satellite className="h-4 w-4 text-white" />
            </span>
            <span className="text-lg font-bold tracking-tight text-white">SAT<span className="text-cyan-300">QUERY</span> <span className="text-sm font-medium text-violet-400">AI</span></span>
          </button>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-400 md:flex">
            <a href="#missions" className="hover:text-cyan-200">Missions</a>
            <a href="#bands" className="hover:text-cyan-200">Spectral bands</a>
            <a href="#datasets" className="hover:text-cyan-200">Datasets</a>
            <a href="#conditions" className="hover:text-cyan-200">Conditions</a>
            <a href="#workflow" className="hover:text-cyan-200">Workflow</a>
          </nav>
          <button onClick={() => onNavigate("workspace")} className="flex items-center gap-2 rounded-lg bg-cyan-500/80 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-700">
            Open workspace <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-[#020617] px-6 py-20 text-white">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(135deg, transparent 0 48%, #2dd4bf 49% 50%, transparent 51%), linear-gradient(25deg, transparent 0 65%, #475569 66% 67%, transparent 68%)", backgroundSize: "280px 280px" }} />
          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-teal-400/10 px-3 py-1.5 text-xs font-semibold text-teal-300">
                <Globe2 className="h-3.5 w-3.5" /> Earth observation, explained
              </div>
              <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">Know what your imagery can reveal.</h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-navy-200 md:text-lg">Choose the right sensor, resolution, and spectral signal for the question you want to answer. SatQuery turns those signals into evidence-backed explanations.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => onNavigate("workspace")} className="flex items-center gap-2 rounded-xl bg-cyan-400/100 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-teal-400">Ask about an image <Sparkles className="h-4 w-4" /></button>
                <a href="#missions" className="flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">Browse data sources <ArrowRight className="h-4 w-4" /></a>
              </div>
            </div>
          </div>
        </section>

        <section id="missions" className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 max-w-2xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-300">Choose your signal</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Satellite missions at a glance</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">Resolution is a tradeoff, not a score. Use frequent, broad coverage for change monitoring and finer pixels when the object itself matters.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {MISSIONS.map((mission) => (
              <article key={mission.name} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-lg">
                <div className="mb-5 flex items-center justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10"><Satellite className="h-5 w-5 text-cyan-300" /></span><span className="text-xs font-semibold text-emerald-600">Available</span></div>
                <h3 className="font-bold text-slate-100">{mission.name}</h3>
                <p className="mt-1 text-xs text-slate-400">{mission.detail}</p>
                <dl className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs"><div className="flex justify-between"><dt className="text-slate-500">Pixel size</dt><dd className="font-semibold text-slate-300">{mission.coverage}</dd></div><div className="flex justify-between"><dt className="text-slate-500">Revisit</dt><dd className="font-semibold text-slate-300">{mission.cadence}</dd></div></dl>
              </article>
            ))}
          </div>
        </section>

        <section id="bands" className="border-y border-white/10 bg-white/[0.03] px-6 py-16">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-violet-600">Beyond RGB</p>
              <h2 className="text-3xl font-extrabold tracking-tight">Spectral bands turn pixels into signals.</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">Different wavelengths interact with roofs, soil, water, and leaves in different ways. Combining bands lets models separate what looks similar in a normal photograph.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2"><div className="rounded-xl bg-violet-50 p-4"><Layers3 className="h-5 w-5 text-violet-600" /><p className="mt-3 text-sm font-bold">Multispectral</p><p className="mt-1 text-xs leading-relaxed text-slate-400">Useful for land cover, agriculture, water, and vegetation health.</p></div><div className="rounded-xl bg-amber-50 p-4"><Waves className="h-5 w-5 text-amber-600" /><p className="mt-3 text-sm font-bold">Radar</p><p className="mt-1 text-xs leading-relaxed text-slate-400">Works through cloud and darkness for floods, structure, and deformation.</p></div></div>
            </div>
            <div className="space-y-3">
              {BANDS.map((item) => <div key={item.band} className="flex items-center gap-4 rounded-xl border border-white/10 p-4"><span className={`h-10 w-2 rounded-full ${item.color}`} /><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-4"><h3 className="text-sm font-bold">{item.band}</h3><span className="font-mono text-xs text-slate-500">{item.range}</span></div><p className="mt-1 text-xs text-slate-400">{item.use}</p></div></div>)}
            </div>
          </div>
        </section>

        <section id="datasets" className="border-y border-white/10 bg-transparent px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 max-w-2xl"><p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-300">Open datasets</p><h2 className="text-3xl font-extrabold tracking-tight">Start with the dataset that fits the question.</h2><p className="mt-3 text-sm leading-relaxed text-slate-400">These reference datasets cover the common signals used by SatQuery-style workflows. Always check acquisition time, cloud mask, projection, and license before using imagery in a decision.</p></div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{DATASETS.map((dataset) => <article key={dataset.name} className={`rounded-2xl border p-5 ${dataset.color}`}><p className="font-mono text-xs font-semibold text-slate-400">{dataset.provider}</p><h3 className="mt-3 text-base font-bold text-slate-100">{dataset.name}</h3><p className="mt-2 text-xs leading-relaxed text-slate-400">Best for {dataset.bestFor.toLowerCase()}.</p><div className="mt-5 flex justify-between border-t border-black/10 pt-3 text-xs"><span className="text-slate-400">Refresh</span><span className="font-semibold text-slate-200">{dataset.update}</span></div></article>)}</div>
          </div>
        </section>

        <section id="parts" className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div><p className="mb-2 text-xs font-bold uppercase tracking-widest text-violet-600">Inside the system</p><h2 className="text-3xl font-extrabold tracking-tight">From orbit to a useful answer.</h2><p className="mt-4 text-sm leading-relaxed text-slate-400">A satellite product is more than a picture. The payload captures a signal, the spacecraft preserves its geometry, and the ground segment turns raw measurements into a map that models can interpret.</p><div className="mt-6 rounded-2xl bg-[#020617] p-5 text-white"><p className="text-xs font-bold uppercase tracking-widest text-teal-300">Scan chain</p><div className="mt-4 flex items-center justify-between text-center text-[11px] text-navy-300"><span><span className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/100 font-bold text-slate-950">1</span>Capture</span><span className="h-px flex-1 bg-navy-600" /><span><span className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/100 font-bold text-slate-950">2</span>Correct</span><span className="h-px flex-1 bg-navy-600" /><span><span className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/100 font-bold text-slate-950">3</span>Explain</span></div></div></div>
            <div className="grid gap-3 sm:grid-cols-2">{SATELLITE_PARTS.map(([title, text]) => <div key={title} className="rounded-xl border border-white/10 bg-white p-4"><div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10"><Satellite className="h-4 w-4 text-cyan-300" /></div><h3 className="text-sm font-bold">{title}</h3><p className="mt-1.5 text-xs leading-relaxed text-slate-400">{text}</p></div>)}</div>
          </div>
        </section>

        <section id="conditions" className="border-y border-white/10 bg-white/[0.03] px-6 py-16">
          <div className="mx-auto max-w-7xl"><div className="mb-8 max-w-2xl"><p className="mb-2 text-xs font-bold uppercase tracking-widest text-amber-600">Quality and conditions</p><h2 className="text-3xl font-extrabold tracking-tight">Weather changes what the sensor can see.</h2><p className="mt-3 text-sm leading-relaxed text-slate-400">Resolution describes pixel size, not certainty. Clouds, haze, shadows, sun angle, and revisit timing can affect the view just as much as the sensor itself.</p></div><div className="grid gap-4 md:grid-cols-3"><div className="rounded-2xl bg-amber-50 p-5"><h3 className="font-bold text-amber-900">Cloud and haze</h3><p className="mt-2 text-xs leading-relaxed text-amber-800">Optical imagery may hide roofs, roads, and crops. Use a cloud mask or choose radar for cloudy periods.</p></div><div className="rounded-2xl bg-blue-50 p-5"><h3 className="font-bold text-blue-900">Sun and shadows</h3><p className="mt-2 text-xs leading-relaxed text-blue-800">Low sun angles stretch shadows and alter reflectance. Compare similar acquisition seasons where possible.</p></div><div className="rounded-2xl bg-emerald-50 p-5"><h3 className="font-bold text-emerald-900">Resolution and scale</h3><p className="mt-2 text-xs leading-relaxed text-emerald-800">A 10 m pixel can describe a field or block, but not reliably identify a small rooftop or narrow road.</p></div></div><div className="mt-6 overflow-hidden rounded-xl border border-white/10"><div className="grid grid-cols-4 bg-transparent px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-slate-400"><span>Resolution</span><span>Good for</span><span>Watch out for</span><span>Typical use</span></div><div className="grid grid-cols-4 px-4 py-3 text-xs text-slate-400"><span className="font-semibold">0.3-5 m</span><span>Buildings, vehicles</span><span>Cost and coverage</span><span>Detailed urban review</span></div><div className="grid grid-cols-4 border-t border-white/10 px-4 py-3 text-xs text-slate-400"><span className="font-semibold">10-30 m</span><span>Fields, roads, blocks</span><span>Mixed pixels</span><span>Regional monitoring</span></div><div className="grid grid-cols-4 border-t border-white/10 px-4 py-3 text-xs text-slate-400"><span className="font-semibold">30-100 m</span><span>Climate and terrain</span><span>Small objects vanish</span><span>Long-term change</span></div></div></div>
        </section>

        <section id="workflow" className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8"><p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-300">Practical workflow</p><h2 className="text-3xl font-extrabold tracking-tight">Ask better questions with context.</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">Start broad, validate the visual evidence, then narrow the question. SatQuery keeps the answer connected to the region, model, and confidence score.</p></div>
          <div className="grid gap-4 md:grid-cols-3"><div className="rounded-2xl bg-[#020617] p-6 text-white"><Map className="h-6 w-6 text-teal-300" /><p className="mt-5 text-sm font-bold">1. Locate</p><p className="mt-2 text-xs leading-relaxed text-navy-300">Confirm coordinates, acquisition dates, cloud cover, and the area of interest.</p></div><div className="rounded-2xl border border-white/10 bg-white p-6"><BarChart3 className="h-6 w-6 text-violet-600" /><p className="mt-5 text-sm font-bold">2. Analyze</p><p className="mt-2 text-xs leading-relaxed text-slate-400">Select VQA, grounding, or comparison to match the question to the right model.</p></div><div className="rounded-2xl border border-white/10 bg-white p-6"><ShieldCheck className="h-6 w-6 text-emerald-600" /><p className="mt-5 text-sm font-bold">3. Verify</p><p className="mt-2 text-xs leading-relaxed text-slate-400">Inspect overlays, evidence, uncertainty, and technical details before sharing a conclusion.</p></div></div>
        </section>

        <section className="bg-cyan-500/80 px-6 py-16"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><div><p className="mb-2 text-xs font-bold uppercase tracking-widest text-teal-100">Try a real question</p><h2 className="max-w-2xl text-3xl font-extrabold text-white">Turn a satellite scene into a decision.</h2></div><BookOpen className="hidden h-16 w-16 text-teal-200/60 lg:block" /></div><div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-4">{QUERY_STARTERS.map((query) => <button key={query} onClick={() => onOpenWorkspace({ question: query })} className="flex min-h-24 flex-col justify-between rounded-xl bg-white/10 p-4 text-left text-sm font-semibold text-white transition-colors hover:bg-white/20"><span>{query}</span><ArrowRight className="h-4 w-4 text-teal-100" /></button>)}</div></div></section>
      </main>

      <footer className="bg-navy-950 px-6 py-8 text-slate-500"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-xs md:flex-row md:items-center"><span className="font-semibold text-white">SatQuery AI</span><span>For education, research, planning, and responsible Earth observation.</span><button onClick={() => onNavigate("landing")} className="flex items-center gap-1 hover:text-white"><ChevronLeft className="h-3.5 w-3.5" /> Back to home</button></div></footer>
    </div>
  );
}
