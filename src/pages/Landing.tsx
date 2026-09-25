const ArrowRight = () => null;
const Bot = () => null;
const Database = () => null;
const FileText = () => null;
const Globe2 = () => null;
const Map = () => null;
const MessageSquare = () => null;
const Orbit = () => null;
const Rocket = () => null;
const Satellite = () => null;
const Search = () => null;
const Sparkles = () => null;
const Telescope = () => null;
const Zap = () => null;
import type { Page, WorkspaceDraft } from "../App";

interface Props {
  onNavigate: (page: Page) => void;
  onOpenWorkspace: (draft?: WorkspaceDraft) => void;
}

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

      <div className="absolute left-[5%] top-[20%] h-1 w-1 rounded-full bg-white shadow-[100px_80px_#fff,220px_-20px_#fff,380px_120px_#fff,520px_-50px_#fff,700px_60px_#fff,850px_150px_#fff,1050px_-30px_#fff]" />
    </div>
  );
}

function Header({
  onNavigate,
  onOpenWorkspace,
}: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#020617]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <button
          onClick={() => onNavigate("landing")}
          className="flex items-center gap-3"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 shadow-[0_0_30px_rgba(34,211,238,.12)]">
            <Satellite className="h-4 w-4 text-cyan-300" />
            <img src="/url.png" alt="SatQuery AI"></img>
            <span className="absolute -right-1 -top-1 h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
          </div>

          <div className="text-left">
            <div className="text-lg font-bold tracking-tight text-white">
              SAT<span className="text-cyan-300">QUERY</span>
              <span className="ml-1 text-sm font-medium text-violet-400">
                AI
              </span>
            </div>
          </div>
        </button>

        <nav className="hidden items-center gap-7 text-xs font-medium uppercase tracking-wider text-slate-400 md:flex">
          <button
            onClick={() => onNavigate("landing")}
            className="text-cyan-300"
          >
            Platform
          </button>

          <button
            onClick={() => onOpenWorkspace()}
            className="transition hover:text-cyan-300"
          >
            Analysis
          </button>

          <button
            onClick={() => onNavigate("satellite-info")}
            className="transition hover:text-cyan-300"
          >
            Explorer
          </button>

          <button
            onClick={() => onNavigate("product")}
            className="transition hover:text-cyan-300"
          >
            Product
          </button>

          <button
            onClick={() => onNavigate("api-docs")}
            className="transition hover:text-cyan-300"
          >
            API
          </button>
        </nav>

        <button
          onClick={() => onOpenWorkspace()}
          className="flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300/60 hover:bg-cyan-400/20"
        >
          Start Analysis
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}

function OrbitVisual() {
  return (
    <div className="relative mx-auto h-[430px] w-full max-w-[560px]">
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/20" />

      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rotate-[25deg] rounded-full border border-violet-400/15" />

      <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rotate-[-25deg] rounded-full border border-cyan-400/10" />

      <div className="absolute left-1/2 top-1/2 flex h-60 w-60 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blue-300/20 bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-violet-600/20 shadow-[0_0_100px_rgba(59,130,246,.2)]">
        <div className="absolute inset-3 rounded-full border border-cyan-300/10" />

        <Globe2 className="h-28 w-28 text-cyan-200/70" strokeWidth={1} />

        <div className="absolute bottom-10 left-10 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,.9)]" />

        <div className="absolute right-12 top-12 h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,.9)]" />
      </div>

      <div className="absolute right-[8%] top-[8%] rotate-[-8deg]">
        <div className="relative flex h-16 w-24 items-center justify-center rounded-xl border border-white/20 bg-slate-700/50 shadow-[0_0_35px_rgba(34,211,238,.15)] backdrop-blur-md">
          <Satellite className="h-8 w-8 text-slate-200" />

          <div className="absolute -left-12 h-10 w-10 rounded border border-cyan-400/30 bg-cyan-400/10" />
          <div className="absolute -right-12 h-10 w-10 rounded border border-cyan-400/30 bg-cyan-400/10" />
        </div>

        <div className="absolute -bottom-8 left-1/2 h-8 w-px bg-gradient-to-b from-cyan-300/60 to-transparent" />
      </div>

      <div className="absolute left-[7%] top-[18%] rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            Satellite Link
          </span>
        </div>

        <p className="mt-2 font-mono text-xs text-cyan-300">
          ORBITAL DATA ACTIVE
        </p>
      </div>

      <div className="absolute bottom-[10%] right-[8%] rounded-xl border border-violet-400/20 bg-violet-400/5 px-4 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-violet-300" />
          <span className="text-xs font-semibold text-violet-200">
            AI ROUTER
          </span>
        </div>

        <p className="mt-1 text-[10px] text-slate-500">
          MODEL SELECTION ACTIVE
        </p>
      </div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  text,
  accent,
  onClick,
}: {
  icon: typeof Map;
  title: string;
  text: string;
  accent: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/4 p-5 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/8"
    >
      <div
        className={`absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl ${accent}`}
      />

      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/20">
            <Icon className="h-5 w-5 text-cyan-300" />
          </span>

          <ArrowRight className="h-4 w-4 text-slate-600 transition group-hover:translate-x-1 group-hover:text-cyan-300" />
        </div>

        <h3 className="mt-5 text-base font-bold text-white">{title}</h3>

        <p className="mt-2 text-xs leading-relaxed text-slate-500">
          {text}
        </p>
      </div>
    </button>
  );
}

export default function Landing({
  onNavigate,
  onOpenWorkspace,
}: Props) {
  const quickQuery = (question: string) => {
    onOpenWorkspace({ question });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <SpaceBackground />

      <Header
        onNavigate={onNavigate}
        onOpenWorkspace={onOpenWorkspace}
      />

      <main>
        {/* HERO */}
        <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 lg:pt-20">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5">
                <Sparkles className="h-3.5 w-3.5 text-cyan-300" />

                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-300">
                  AI-POWERED SPACE & EARTH INTELLIGENCE
                </span>
              </div>

              <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-tight text-white md:text-6xl lg:text-7xl">
                Ask.
                <br />
                Analyze.
                <br />
                <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                  Understand.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
                Explore satellite and Earth imagery using natural language.
                Detect objects, understand changes, and turn complex remote
                sensing data into explainable insights.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => onOpenWorkspace()}
                  className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-bold text-white shadow-[0_0_35px_rgba(34,211,238,.2)] transition hover:shadow-[0_0_45px_rgba(34,211,238,.3)]"
                >
                  Start Analysis
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => onNavigate("satellite-info")}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-300"
                >
                  <Globe2 className="h-4 w-4" />
                  Explore Earth
                </button>
              </div>

              <div className="mt-10 flex flex-wrap gap-7">
                <div>
                  <p className="font-mono text-lg font-bold text-white">
                    VQA
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-slate-600">
                    Visual Questions
                  </p>
                </div>

                <div className="h-10 w-px bg-white/10" />

                <div>
                  <p className="font-mono text-lg font-bold text-white">
                    AI
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-slate-600">
                    Query Router
                  </p>
                </div>

                <div className="h-10 w-px bg-white/10" />

                <div>
                  <p className="font-mono text-lg font-bold text-white">
                    GEO
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-slate-600">
                    Spatial Intelligence
                  </p>
                </div>
              </div>
            </div>

            <OrbitVisual />
          </div>

          {/* ASK BAR */}
          <div className="relative mx-auto mt-5 max-w-4xl">
            <div className="rounded-2xl border border-cyan-400/20 bg-white/5 p-2 shadow-[0_20px_80px_rgba(0,0,0,.3)] backdrop-blur-xl">
              <div className="flex items-center gap-3 rounded-xl bg-black/20 px-4 py-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-400/10">
                  <Sparkles className="h-4 w-4 text-violet-300" />
                </div>

                <input
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      const value = event.currentTarget.value.trim();

                      if (value) {
                        quickQuery(value);
                      }
                    }
                  }}
                  placeholder="Ask anything about space or Earth imagery..."
                  className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
                />

                <button
                  onClick={() => onOpenWorkspace()}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-violet-500 to-blue-600 text-white transition hover:scale-105"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-300">
                PLATFORM MODULES
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
                Explore our capabilities
              </h2>
            </div>

            <div className="hidden items-center gap-2 text-[10px] uppercase tracking-widest text-slate-600 md:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Systems operational
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={Search}
              title="Analysis"
              text="Upload imagery and get AI-powered insights, answers, and detections."
              accent="bg-violet-500/10"
              onClick={() => onOpenWorkspace()}
            />

            <FeatureCard
              icon={Globe2}
              title="Explorer"
              text="Explore Earth with maps, satellite layers, and location-aware intelligence."
              accent="bg-emerald-500/10"
              onClick={() => onNavigate("satellite-info")}
            />

            <FeatureCard
              icon={Rocket}
              title="Mission"
              text="Organize satellite intelligence workflows around real-world objectives."
              accent="bg-orange-500/10"
              onClick={() => onOpenWorkspace()}
            />

            <FeatureCard
              icon={Database}
              title="Data"
              text="Work with satellite imagery and structured geospatial information."
              accent="bg-blue-500/10"
              onClick={() => onOpenWorkspace()}
            />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Telescope}
              title="Research"
              text="Turn Earth observation data into understandable research insights."
              accent="bg-pink-500/10"
              onClick={() => onNavigate("product")}
            />

            <FeatureCard
              icon={FileText}
              title="Documentation"
              text="Explore workflows, API capabilities, and technical resources."
              accent="bg-cyan-500/10"
              onClick={() => onNavigate("api-docs")}
            />

            <FeatureCard
              icon={Zap}
              title="AI Intelligence"
              text="Let the query router identify the analysis task and route it to the appropriate model."
              accent="bg-violet-500/10"
              onClick={() => onOpenWorkspace()}
            />
          </div>
        </section>

        {/* ANALYSIS PREVIEW */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-5 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/4 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <div className="flex items-center gap-3">
                  <Orbit className="h-5 w-5 text-cyan-300" />

                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Recent Analysis
                    </h3>

                    <p className="mt-0.5 text-[10px] uppercase tracking-widest text-slate-600">
                      Earth observation activity
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onOpenWorkspace()}
                  className="text-xs font-semibold text-cyan-300 hover:text-cyan-200"
                >
                  View all →
                </button>
              </div>

              <div className="grid gap-4 p-5 md:grid-cols-3">
                {[
                  ["Flood Detection", "River Region", "Analysis"],
                  ["Change Detection", "Forest Region", "Comparison"],
                  ["Object Grounding", "Urban Region", "Detection"],
                ].map(([tag, location, type]) => (
                  <button
                    key={tag}
                    onClick={() => onOpenWorkspace()}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-black/20 text-left transition hover:border-cyan-400/30"
                  >
                    <div className="relative h-32 overflow-hidden bg-gradient-to-br from-slate-800 via-blue-950 to-cyan-950">
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute left-5 top-8 h-20 w-32 rotate-12 rounded-full bg-emerald-400/20 blur-xl" />
                        <div className="absolute right-2 top-2 h-20 w-20 rounded-full bg-blue-400/20 blur-xl" />
                      </div>

                      <div className="absolute left-3 top-3 rounded-md border border-white/10 bg-black/40 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-cyan-300">
                        {tag}
                      </div>

                      <Map className="absolute bottom-4 right-4 h-7 w-7 text-white/20" />
                    </div>

                    <div className="p-4">
                      <p className="text-sm font-bold text-white">
                        {location}
                      </p>

                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-wider text-slate-600">
                          {type}
                        </span>

                        <ArrowRight className="h-3.5 w-3.5 text-slate-600 transition group-hover:translate-x-1 group-hover:text-cyan-300" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-violet-400/15 bg-gradient-to-br from-violet-500/10 via-blue-500/5 to-transparent p-6 backdrop-blur-xl">
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/10">
                    <Bot className="h-5 w-5 text-violet-300" />
                  </div>

                  <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Online
                  </span>
                </div>

                <h3 className="mt-7 text-lg font-bold text-white">
                  SatQuery AI Assistant
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  Ask questions about satellite imagery and let the AI route
                  your query to the appropriate analysis workflow.
                </p>

                <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="mt-0.5 h-4 w-4 text-cyan-300" />

                    <div>
                      <p className="text-xs font-semibold text-slate-300">
                        Example query
                      </p>

                      <p className="mt-2 text-xs leading-relaxed text-slate-500">
                        "What has changed in this area?"
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    quickQuery("What has changed in this area?")
                  }
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-violet-400/20 bg-violet-400/10 px-4 py-3 text-xs font-semibold text-violet-200 transition hover:bg-violet-400/15"
                >
                  Ask SatQuery AI
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mx-auto max-w-7xl px-6 pb-20 pt-10">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 p-8 md:p-10">
            <div className="absolute right-[-5%] top-[-80%] h-[400px] w-[400px] rounded-full border border-cyan-400/10" />
            <div className="absolute right-[5%] top-1/2 h-40 w-40 -translate-y-1/2 rounded-full border border-violet-400/10" />

            <div className="relative flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
              <div>
                <div className="flex items-center gap-2 text-cyan-300">
                  <Satellite className="h-4 w-4" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.25em]">
                    Mission Control
                  </span>
                </div>

                <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">
                  Ask SatQuery AI anything about Earth.
                </h2>

                <p className="mt-2 max-w-xl text-sm text-slate-500">
                  Upload imagery, ask a question, and transform satellite data
                  into explainable intelligence.
                </p>
              </div>

              <button
                onClick={() => onOpenWorkspace()}
                className="group flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-6 py-3 text-sm font-bold text-white shadow-[0_0_35px_rgba(34,211,238,.15)]"
              >
                Enter Workspace
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/20 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-xs text-slate-600 md:flex-row">
          <span className="font-semibold text-slate-300">
            SATQUERY AI
          </span>



        </div>
      </footer>
    </div>
  );
}