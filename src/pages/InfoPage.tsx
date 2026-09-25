import { FormEvent, useState } from "react";
const ArrowLeft = () => null;
const ArrowRight = () => null;
const Check = () => null;
const Code2 = () => null;
const Mail = () => null;
const MapPin = () => null;
const MessageSquare = () => null;
const Satellite = () => null;
const Send = () => null;
const ShieldCheck = () => null;
const Sparkles = () => null;
const Orbit = () => null;
const Radio = () => null;
const Globe2 = () => null;
const Cpu = () => null;
import type { Page, WorkspaceDraft } from "../App";

type InfoPageKind = Exclude<Page, "landing" | "workspace" | "satellite-info">;

interface Props {
  page: InfoPageKind;
  onNavigate: (page: Page) => void;
  onOpenWorkspace: (draft?: WorkspaceDraft) => void;
}

const pageContent: Record<
  InfoPageKind,
  { eyebrow: string; title: string; intro: string }
> = {
  product: {
    eyebrow: "MISSION SYSTEM",
    title: "Earth intelligence, powered by natural language.",
    intro:
      "SatQuery connects satellite imagery, AI models, geospatial evidence, and natural-language questions inside one intelligent analysis workspace.",
  },
  "api-docs": {
    eyebrow: "DEVELOPER SYSTEM",
    title: "Build satellite intelligence into your workflow.",
    intro:
      "Connect your applications to the same analysis capabilities used by the SatQuery workspace.",
  },
  privacy: {
    eyebrow: "DATA SECURITY",
    title: "Your imagery remains under your control.",
    intro:
      "This demonstration stores analysis sessions locally in your browser. Production deployments can connect these controls to your own identity, storage, and retention policies.",
  },
  terms: {
    eyebrow: "MISSION GUIDELINES",
    title: "Responsible analysis starts with clear boundaries.",
    intro:
      "SatQuery provides analytical assistance and should complement, not replace, field verification and professional judgment.",
  },
  contact: {
    eyebrow: "MISSION CONTROL",
    title: "Bring us your next Earth observation question.",
    intro:
      "Tell us what you are monitoring and we can shape an analysis workflow around your region, sensor, and decision.",
  },
};

const navItems: Array<[string, Page]> = [
  ["Product", "product"],
  ["Satellite Guide", "satellite-info"],
  ["API Docs", "api-docs"],
];

function SpaceBackground() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#020617]">
        <div className="absolute left-[10%] top-[10%] h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute right-[5%] top-[20%] h-[32rem] w-[32rem] rounded-full bg-violet-600/10 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[35%] h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(56,189,248,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,.06) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        <div className="absolute left-[8%] top-[25%] h-1 w-1 rounded-full bg-white shadow-[120px_40px_#fff,260px_-30px_#fff,420px_90px_#fff,600px_-50px_#fff,760px_100px_#fff,900px_-20px_#fff]" />
      </div>
    </>
  );
}

function Header({
  onNavigate,
  onOpenWorkspace,
}: Pick<Props, "onNavigate" | "onOpenWorkspace">) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#020617]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <button
          onClick={() => onNavigate("landing")}
          className="group flex items-center gap-3"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 shadow-[0_0_25px_rgba(34,211,238,.15)]">
            <Satellite className="h-4 w-4 text-cyan-300" />
            <span className="absolute -right-1 -top-1 h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
          </span>

          <span className="text-lg font-bold tracking-tight text-white">
            SAT<span className="text-cyan-300">QUERY</span>
            <span className="ml-1 text-sm font-medium text-violet-400">
              AI
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-7 text-xs font-medium uppercase tracking-wider text-slate-400 md:flex">
          {navItems.map(([label, target]) => (
            <button
              key={target}
              onClick={() => onNavigate(target)}
              className="transition-colors hover:text-cyan-300"
            >
              {label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => onOpenWorkspace()}
          className="group flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 shadow-[0_0_25px_rgba(34,211,238,.08)] transition-all hover:border-cyan-300/60 hover:bg-cyan-300/15"
        >
          Open Workspace
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </header>
  );
}

function ProductContent({
  onOpenWorkspace,
}: Pick<Props, "onOpenWorkspace">) {
  const features = [
    [
      "Ask",
      "Natural-language answers with confidence, evidence, and suggested follow-ups.",
      MessageSquare,
      "cyan",
    ],
    [
      "Detect",
      "Ground buildings, roads, vegetation, water, and other visible objects.",
      Globe2,
      "violet",
    ],
    [
      "Compare",
      "Review added, removed, and modified regions across acquisition dates.",
      Orbit,
      "blue",
    ],
  ] as const;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {features.map(([title, text, Icon, accent]) => (
        <article
          key={title}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.07]"
        >
          <div
            className={`absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl ${
              accent === "cyan"
                ? "bg-cyan-400/10"
                : accent === "violet"
                  ? "bg-violet-500/10"
                  : "bg-blue-500/10"
            }`}
          />

          <Icon className="relative h-6 w-6 text-cyan-300" />

          <div className="mt-6 flex items-center gap-2">
            <h2 className="text-lg font-bold text-white">{title}</h2>
            <span className="h-1 w-1 rounded-full bg-cyan-300" />
            <span className="text-[10px] uppercase tracking-widest text-slate-500">
              Module
            </span>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            {text}
          </p>

          <button
            onClick={() =>
              onOpenWorkspace({
                question:
                  title === "Ask"
                    ? "How many buildings are visible?"
                    : title === "Detect"
                      ? "Show me all buildings"
                      : "What changed in the last year?",
              })
            }
            className="mt-6 flex items-center gap-2 text-sm font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
          >
            Launch module
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </article>
      ))}
    </div>
  );
}

function ApiContent() {
  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-2xl border border-cyan-400/15 bg-[#030b1c] shadow-[0_20px_70px_rgba(0,0,0,.35)]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2 text-cyan-300">
            <Code2 className="h-4 w-4" />
            <span className="font-mono text-xs">POST /v1/analyze</span>
          </div>

          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Online
          </div>
        </div>

        <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-slate-300">
{`{
  "mode": "change",
  "question": "What changed near the river?",
  "image_a": "baseline.tif",
  "image_b": "latest.tif"
}`}
        </pre>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {[
          ["/v1/analyze", "Run VQA, grounding, or change detection"],
          ["/v1/sessions", "Save and retrieve reviewable analyses"],
          ["/v1/health", "Check model and imagery service status"],
        ].map(([endpoint, text]) => (
          <div
            key={endpoint}
            className="rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl"
          >
            <p className="font-mono text-xs font-semibold text-cyan-300">
              {endpoint}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              {text}
            </p>
          </div>
        ))}
      </div>

      <p className="text-xs leading-relaxed text-slate-500">
        Every response should include an answer, confidence, model metadata,
        evidence items, and geometry where available.
      </p>
    </div>
  );
}

function LegalContent({ page }: { page: "privacy" | "terms" }) {
  const privacy = page === "privacy";

  const items = privacy
    ? [
        [
          "Local-first demo storage",
          "Saved sessions remain in your browser unless you connect a backend.",
        ],
        [
          "Imagery permissions",
          "Only upload imagery you are authorized to process and share.",
        ],
        [
          "Operational controls",
          "A production deployment should define retention, deletion, access logs, and encryption.",
        ],
      ]
    : [
        [
          "Decision support",
          "Outputs are probabilistic analysis and require human review.",
        ],
        [
          "Data responsibility",
          "You are responsible for permissions, provenance, and sensitive locations.",
        ],
        [
          "Model limitations",
          "Cloud, shadows, sensor differences, and image resolution can change results.",
        ],
      ];

  return (
    <div className="space-y-3">
      {items.map(([title, text]) => (
        <div
          key={title}
          className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
        >
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />

          <div>
            <h2 className="text-sm font-bold text-white">{title}</h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              {text}
            </p>
          </div>
        </div>
      ))}

      <p className="pt-3 text-xs text-slate-600">
        Last updated September 2026. This page describes the demonstration
        experience and should be reviewed before production deployment.
      </p>
    </div>
  );
}

function ContactContent() {
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-6">
        <Check className="h-6 w-6 text-emerald-400" />

        <h2 className="mt-4 font-bold text-emerald-300">
          Transmission received
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Your message has been received by the mission interface.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Name
          <input
            required
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50"
          />
        </label>

        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Work Email
          <input
            required
            type="email"
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50"
          />
        </label>
      </div>

      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
        What are you monitoring?
        <textarea
          required
          rows={5}
          className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50"
          placeholder="Region, imagery, and decision you need to support..."
        />
      </label>

      <button className="flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/20">
        Transmit message
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}

export default function InfoPage({
  page,
  onNavigate,
  onOpenWorkspace,
}: Props) {
  const content = pageContent[page];

  return (
    <div className="relative min-h-full overflow-hidden bg-[#020617] text-white">
      <SpaceBackground />

      <Header
        onNavigate={onNavigate}
        onOpenWorkspace={onOpenWorkspace}
      />

      <main className="relative mx-auto max-w-7xl px-6 py-16">
        <button
          onClick={() => onNavigate("landing")}
          className="mb-10 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-cyan-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to SatQuery
        </button>

        <div className="mb-10 flex items-center gap-3">
          <span className="h-px w-10 bg-cyan-400/50" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-300">
            SATQUERY AI // {content.eyebrow}
          </span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="relative">
            <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full border border-cyan-400/10" />
            <div className="absolute -left-14 -top-14 h-36 w-36 rounded-full border border-violet-400/10" />

            <div className="relative">
              <div className="mb-5 flex items-center gap-2 text-xs text-slate-500">
                <Radio className="h-3.5 w-3.5 text-cyan-300" />
                MISSION CONTROL / ACTIVE
              </div>

              <h1 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
                {content.title}
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400">
                {content.intro}
              </p>

              <div className="mt-10 space-y-4">
                {[
                  [MessageSquare, "Evidence attached to every analysis"],
                  [MapPin, "Built for location-aware questions"],
                  [Cpu, "AI-assisted model routing"],
                ].map(([Icon, text]) => (
                  <div
                    key={text as string}
                    className="flex items-center gap-3 text-sm text-slate-400"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/15 bg-cyan-400/5">
                      <Icon className="h-4 w-4 text-cyan-300" />
                    </span>
                    {text as string}
                  </div>
                ))}
              </div>

              <div className="mt-10 flex items-center gap-3">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                  Earth observation systems online
                </span>
              </div>
            </div>
          </div>

          <div>
            {page === "product" && (
              <ProductContent onOpenWorkspace={onOpenWorkspace} />
            )}

            {page === "api-docs" && <ApiContent />}

            {(page === "privacy" || page === "terms") && (
              <LegalContent page={page} />
            )}

            {page === "contact" && <ContactContent />}
          </div>
        </div>
      </main>

      <footer className="relative border-t border-white/10 bg-black/20 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-xs text-slate-600 md:flex-row">
          <span className="font-semibold tracking-wide text-slate-300">
            SATQUERY AI
          </span>

          <span>
            Natural-language satellite intelligence // Earth observation
            systems
          </span>

          <button
            onClick={() => onNavigate("satellite-info")}
            className="font-semibold text-cyan-300 transition hover:text-cyan-200"
          >
            Satellite Guide →
          </button>
        </div>
      </footer>
    </div>
  );
}