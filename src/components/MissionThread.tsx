"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Terminal,
  Workflow,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  FileCode2,
  Lock,
  Zap,
  Play,
  Check,
  Clock,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Stage {
  id: string;
  num: string;
  label: string;
  tag: string;
  heading: string;
  description: string;
  bullets: {
    title: string;
    desc: string;
  }[];
  cta: string;
}

const STAGES: Stage[] = [
  {
    id: "brief",
    num: "01",
    label: "BRIEF",
    tag: "01 // OUTCOME CAPTURE",
    heading: "START WITH THE OUTCOME.",
    description: "Give Ultron one outcome. The system turns intent into executable work.",
    bullets: [
      {
        title: "Intent Parsing",
        desc: "Natural language brief converted into formal AST objectives.",
      },
      {
        title: "Budget Ceiling",
        desc: "Set a hard financial cap (e.g. $5.00 limit) with circuit breakers.",
      },
      {
        title: "Constraint Invariants",
        desc: "Non-negotiable safety and access rules locked before run.",
      },
    ],
    cta: "Inspect Brief Protocol",
  },
  {
    id: "plan",
    num: "02",
    label: "PLAN",
    tag: "02 // MISSION PLANNING",
    heading: "TURN INTENT INTO A MISSION.",
    description: "Ultron converts the outcome into structured, verifiable work.",
    bullets: [
      {
        title: "Mission DAG",
        desc: "Directed acyclic graph with dependency ordering and contracts.",
      },
      {
        title: "Task Breakdown",
        desc: "Atomic tasks generated with unambiguous definitions of done.",
      },
      {
        title: "Parallel Scheduling",
        desc: "Independent task streams dispatched simultaneously across the crew.",
      },
    ],
    cta: "Explore DAG Generator",
  },
  {
    id: "delegate",
    num: "03",
    label: "DELEGATE",
    tag: "03 // WORKFORCE ROUTING",
    heading: "GIVE EVERY TASK TO THE RIGHT AGENT.",
    description: "Specialized agents receive focused work matched to their role.",
    bullets: [
      {
        title: "Role Matching",
        desc: "Lead, Coder, Design, RAG, QA, and Launch agents receive assignments.",
      },
      {
        title: "Context Injection",
        desc: "Only the necessary files, schema, and tools provided to each sandbox.",
      },
      {
        title: "Boundary Enforcement",
        desc: "Cedar policies bound to each individual agent identity.",
      },
    ],
    cta: "View Agent Roster",
  },
  {
    id: "execute",
    num: "04",
    label: "EXECUTE",
    tag: "04 // AUTONOMOUS EXECUTION",
    heading: "LET THE CREW RUN THE MISSION.",
    description: "Agents execute in parallel while you stay out of the way.",
    bullets: [
      {
        title: "Parallel Execution",
        desc: "Multi-agent swarm working inside isolated sandboxes.",
      },
      {
        title: "Live State Streaming",
        desc: "Real-time terminal logs, file diffs, and status pulses.",
      },
      {
        title: "Inter-Agent Sync",
        desc: "Lead orchestrates blockers and hands off deliverables seamlessly.",
      },
    ],
    cta: "Enter Live Office",
  },
  {
    id: "verify",
    num: "05",
    label: "VERIFY",
    tag: "05 // VERIFICATION",
    heading: "CHECK THE WORK BEFORE IT SHIPS.",
    description: "Test, review, policy checks, and human checkpoints.",
    bullets: [
      {
        title: "Automated Test Suites",
        desc: "Headless unit, integration, and visual regression tests.",
      },
      {
        title: "Cedar Policy Check",
        desc: "Zero unauthorized network or database writes permitted.",
      },
      {
        title: "Human Checkpoint",
        desc: "Critical actions pause until approved by human operator.",
      },
    ],
    cta: "Audit Verification Gates",
  },
  {
    id: "ship",
    num: "06",
    label: "SHIP",
    tag: "06 // DELIVERY",
    heading: "ONE VERIFIED OUTCOME.",
    description: "The completed result is assembled and ready to ship.",
    bullets: [
      {
        title: "Production Deploy",
        desc: "Verified output deployed to AWS production infrastructure.",
      },
      {
        title: "Budget Audit Cleared",
        desc: "Exact token and compute spend certified under the ceiling.",
      },
      {
        title: "Audit Ledger Archived",
        desc: "Complete cryptographic log stored in OpenSearch for compliance.",
      },
    ],
    cta: "Start Your Mission",
  },
];

export default function MissionThread() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  // Framer Motion scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      // Map 0 -> 1 progress smoothly across 6 stages
      const numStages = STAGES.length;
      const index = Math.min(
        Math.floor(latest * numStages),
        numStages - 1
      );
      setActiveStageIndex(index);
    });
  }, [scrollYProgress]);

  const handleStageClick = (index: number) => {
    setActiveStageIndex(index);
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const targetScroll =
      containerTop + (index / STAGES.length) * (containerHeight - window.innerHeight);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const currentStage = STAGES[activeStageIndex];

  // Orbital arc coordinates for the 6 nodes on the left
  // Circle center is offscreen to the left: cx = -260, cy = 285, R = 500
  // y spans from 60 to 510, x = cx + sqrt(R^2 - (y - cy)^2)
  const NODE_COORDS = [
    { x: 186, y: 60 },
    { x: 220, y: 150 },
    { x: 238, y: 240 },
    { x: 238, y: 330 },
    { x: 220, y: 420 },
    { x: 186, y: 510 },
  ];

  const activeCoord = NODE_COORDS[activeStageIndex] || NODE_COORDS[0];

  return (
    <section
      id="mission-thread"
      ref={containerRef}
      className="relative w-full bg-[#080B10] text-white"
      style={{ height: "550vh" }}
    >
      {/* Sticky Cinematic Stage Viewport */}
      <div className="sticky top-[var(--nav-height)] h-[calc(100vh-var(--nav-height))] w-full overflow-hidden flex flex-col justify-between pt-6 sm:pt-8 pb-4 sm:pb-6 select-none">
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-sky-500/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-cyan-500/5 blur-[120px] pointer-events-none" />

        {/* ================================================== */}
        {/* 1. FIXED SECTION HEADER (Top Center) */}
        {/* ================================================== */}
        <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-4xl mx-auto flex-shrink-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/10 text-slate-300 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase mb-2 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span>ULTRON // AUTONOMOUS WORKFLOW</span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl tracking-tight text-white leading-tight">
            FROM OUTCOME TO SHIPPED WORK.
          </h2>

          <p className="mt-1 text-slate-400 font-sans text-xs sm:text-sm tracking-wide">
            One outcome becomes coordinated work, verified by the crew.
          </p>
        </div>

        {/* ================================================== */}
        {/* 2. CINEMATIC 3-COLUMN MAIN STAGE */}
        {/* Desktop: 22% Left | 42% Center | 36% Right */}
        {/* ================================================== */}
        <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center px-4 sm:px-8 max-w-[1700px] mx-auto w-full min-h-0 overflow-hidden">
          {/* -------------------------------------------------- */}
          {/* COLUMN 1: LEFT PARTIALLY CROPPED LIFECYCLE ARC (20-22%) */}
          {/* -------------------------------------------------- */}
          <div className="hidden lg:flex lg:col-span-3 h-full relative items-center justify-start overflow-visible pointer-events-auto">
            {/* SVG Orbital Arc */}
            <svg
              className="absolute left-0 top-1/2 -translate-y-1/2 w-[340px] h-[580px] overflow-visible pointer-events-none"
              viewBox="0 0 340 580"
              fill="none"
            >
              {/* Outer faint orbit glow */}
              <path
                d="M 186 60 A 500 500 0 0 1 186 510"
                stroke="rgba(56, 189, 248, 0.12)"
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* Main sharp orbit ring */}
              <path
                d="M 186 60 A 500 500 0 0 1 186 510"
                stroke="rgba(255, 255, 255, 0.14)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />

              {/* Active Connector Beam to Center Content */}
              <line
                x1={activeCoord.x + 14}
                y1={activeCoord.y}
                x2="340"
                y2={activeCoord.y}
                stroke="rgba(56, 189, 248, 0.6)"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                className="transition-all duration-300 ease-out"
              />
            </svg>

            {/* Stage Nodes & Labels along the Arc */}
            <div className="relative w-full h-[580px]">
              {STAGES.map((stage, idx) => {
                const coord = NODE_COORDS[idx];
                const isActive = activeStageIndex === idx;
                const isCompleted = activeStageIndex > idx;

                return (
                  <div
                    key={stage.id}
                    onClick={() => handleStageClick(idx)}
                    style={{
                      position: "absolute",
                      left: `${coord.x}px`,
                      top: `${coord.y}px`,
                      transform: "translate(-50%, -50%)",
                    }}
                    className="flex items-center gap-3 cursor-pointer group select-none z-20"
                  >
                    {/* Node Dot / Badge */}
                    <div className="relative flex items-center justify-center">
                      {isActive && (
                        <span className="absolute -inset-2 rounded-full bg-sky-400/20 blur-sm animate-pulse pointer-events-none" />
                      )}

                      <div
                        className={cn(
                          "w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300",
                          isActive
                            ? "bg-[#080B10] border-2 border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.8)] scale-110"
                            : isCompleted
                            ? "bg-[#080B10] border border-sky-500/40 text-sky-400/60"
                            : "bg-[#080B10] border border-white/15 text-slate-500 group-hover:border-white/30"
                        )}
                      >
                        {isActive ? (
                          <div className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
                        ) : isCompleted ? (
                          <Check className="w-3.5 h-3.5 text-sky-400/80" />
                        ) : (
                          <span className="text-[10px] font-mono text-slate-500 font-semibold">
                            {stage.num}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Small Technical Label */}
                    <span
                      className={cn(
                        "font-mono text-xs tracking-widest uppercase transition-all duration-200",
                        isActive
                          ? "text-sky-300 font-bold drop-shadow-[0_0_10px_rgba(56,189,248,0.5)] translate-x-0.5"
                          : isCompleted
                          ? "text-slate-400 font-medium group-hover:text-slate-200"
                          : "text-slate-500 group-hover:text-slate-300"
                      )}
                    >
                      {stage.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* -------------------------------------------------- */}
          {/* COLUMN 2: CENTER ACTIVE CONTENT (42%) */}
          {/* max-width ~520px, clean typography, generous negative space */}
          {/* -------------------------------------------------- */}
          <div className="col-span-1 lg:col-span-5 flex flex-col justify-center px-2 sm:px-6 z-20 max-w-[540px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col"
              >
                {/* Stage Tag */}
                <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-sky-400 uppercase mb-3">
                  <span className="w-2 h-[1px] bg-sky-400" />
                  <span>{currentStage.tag}</span>
                </div>

                {/* Stage Main Heading */}
                <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight mb-3">
                  {currentStage.heading}
                </h3>

                {/* Stage Description */}
                <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed mb-6">
                  {currentStage.description}
                </p>

                {/* Stage Bullets */}
                <div className="space-y-3 mb-8">
                  {currentStage.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                      <span className="text-sky-400 font-bold mt-0.5">•</span>
                      <p className="text-slate-300 leading-relaxed font-sans">
                        <strong className="text-white font-semibold">
                          {bullet.title}:
                        </strong>{" "}
                        {bullet.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Restrained CTA Button (Styled like reference "Engine ↗") */}
                <div className="flex items-center gap-4">
                  <a
                    href="#zones"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-sky-400/50 text-white font-mono text-xs tracking-wider transition-all duration-200 group shadow-md"
                  >
                    <span>{currentStage.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-sky-400 group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  {/* Stage Index indicator */}
                  <span className="text-xs font-mono text-slate-500">
                    STAGE {currentStage.num} / 06
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* -------------------------------------------------- */}
          {/* COLUMN 3: RIGHT LARGE PRODUCT VISUAL (36-38%) */}
          {/* Partially cropped on the right edge, cinematic technical panel */}
          {/* -------------------------------------------------- */}
          <div className="col-span-1 lg:col-span-4 h-[380px] sm:h-[440px] lg:h-[480px] relative flex items-center justify-start lg:-mr-16 overflow-visible">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full lg:w-[125%] h-full rounded-2xl bg-[#0F141C]/95 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-2xl flex flex-col overflow-hidden group"
              >
                {/* Product Panel Top Window Bar */}
                <div className="h-10 px-4 bg-[#0A0D14] border-b border-white/10 flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 font-mono text-[11px] text-slate-400">
                      ultron // {currentStage.id}.runtime
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-emerald-400 font-semibold">ACTIVE</span>
                  </div>
                </div>

                {/* Product Panel Body: Dynamic Per-Stage UI */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col overflow-y-auto font-mono text-xs scrollbar-none">
                  {activeStageIndex === 0 && <StageVisualBrief />}
                  {activeStageIndex === 1 && <StageVisualPlan />}
                  {activeStageIndex === 2 && <StageVisualDelegate />}
                  {activeStageIndex === 3 && <StageVisualExecute />}
                  {activeStageIndex === 4 && <StageVisualVerify />}
                  {activeStageIndex === 5 && <StageVisualShip />}
                </div>

                {/* Subtle Right Edge Fade to enhance the partially-cropped feeling */}
                <div className="hidden lg:block absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#080B10] to-transparent pointer-events-none" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ================================================== */}
        {/* 3. BOTTOM MOBILE STEPPER (< 1024px) */}
        {/* ================================================== */}
        <div className="lg:hidden flex items-center justify-center gap-2 px-4 py-2 border-t border-white/10 flex-shrink-0">
          {STAGES.map((st, i) => (
            <button
              key={st.id}
              onClick={() => handleStageClick(i)}
              className={cn(
                "px-2.5 py-1 rounded-md text-[10px] font-mono transition-all",
                activeStageIndex === i
                  ? "bg-sky-400/20 text-sky-300 border border-sky-400/40 font-bold"
                  : "text-slate-500 hover:text-slate-300"
              )}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

{/* ========================================================================= */}
{/* STAGE VISUALS (Rich, Technical, Product-Grade UI Panels) */}
{/* ========================================================================= */}

function StageVisualBrief() {
  return (
    <div className="flex flex-col h-full justify-between space-y-4">
      <div>
        <div className="text-slate-400 text-[11px] mb-1">// MISSION INPUT PROMPT</div>
        <div className="p-3 rounded-xl bg-black/50 border border-white/10 text-white font-sans text-xs sm:text-sm leading-relaxed">
          &gt; &quot;Build a high-performance landing page for Ultron with 6 autonomous agents,
          interactive DAG, live pixel office, and Cedar permission guardrails.&quot;
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
          <span className="text-[10px] text-slate-400">BUDGET CEILING</span>
          <div className="text-lg font-bold text-white mt-0.5">$5.00 USD</div>
          <span className="text-[9px] text-emerald-400">Hard circuit breaker</span>
        </div>

        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
          <span className="text-[10px] text-slate-400">EXECUTION MODE</span>
          <div className="text-lg font-bold text-sky-400 mt-0.5">AUTONOMOUS</div>
          <span className="text-[9px] text-slate-400">6 Agent Crew</span>
        </div>
      </div>

      <div className="p-2.5 rounded-xl bg-sky-950/40 border border-sky-500/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-sky-400" />
          <span className="text-[11px] text-sky-200">Outcome Captured // 3 Invariants Locked</span>
        </div>
        <span className="text-[10px] text-sky-400 font-bold font-mono">READY</span>
      </div>
    </div>
  );
}

function StageVisualPlan() {
  return (
    <div className="flex flex-col h-full justify-between space-y-3">
      <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1 border-b border-white/10">
        <span>DAG TOPOLOGICAL GRAPH</span>
        <span className="text-purple-400">6 NODES • 0 CYCLES</span>
      </div>

      <div className="space-y-2 py-1">
        <div className="p-2.5 rounded-lg bg-black/40 border border-purple-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span className="text-white text-xs font-semibold">01. Parse Brief AST</span>
          </div>
          <span className="text-[10px] text-emerald-400">COMPLETED</span>
        </div>

        <div className="grid grid-cols-2 gap-2 pl-4 border-l border-purple-500/30">
          <div className="p-2 rounded-lg bg-purple-950/30 border border-purple-500/20 text-[11px]">
            <span className="text-purple-300 font-bold">02A. UI Tokens</span>
            <div className="text-[10px] text-slate-400">Parallel Stream 1</div>
          </div>
          <div className="p-2 rounded-lg bg-purple-950/30 border border-purple-500/20 text-[11px]">
            <span className="text-purple-300 font-bold">02B. Cedar Auth</span>
            <div className="text-[10px] text-slate-400">Parallel Stream 2</div>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
            <span className="text-slate-200 text-xs">03. Integration &amp; Build Test</span>
          </div>
          <span className="text-[10px] text-sky-400">QUEUED</span>
        </div>
      </div>

      <div className="p-2 rounded-lg bg-white/[0.02] border border-white/10 text-[10px] text-slate-400 flex justify-between">
        <span>Deterministic Task Contracts</span>
        <span className="text-slate-200">100% SPECIFIED</span>
      </div>
    </div>
  );
}

function StageVisualDelegate() {
  const agents = [
    { role: "LEAD", model: "qwen3-coder-plus", tasks: "4 Tasks", color: "text-amber-400 border-amber-500/30" },
    { role: "CODER", model: "deepseek-v3", tasks: "8 Tasks", color: "text-sky-400 border-sky-500/30" },
    { role: "DESIGN", model: "claude-3-5-sonnet", tasks: "3 Tasks", color: "text-rose-400 border-rose-500/30" },
    { role: "RAG", model: "gemini-2.0-flash", tasks: "5 Tasks", color: "text-cyan-400 border-cyan-500/30" },
    { role: "QA", model: "gpt-4o-mini", tasks: "6 Tasks", color: "text-purple-400 border-purple-500/30" },
    { role: "LAUNCH", model: "claude-3-5-haiku", tasks: "2 Tasks", color: "text-emerald-400 border-emerald-500/30" },
  ];

  return (
    <div className="flex flex-col h-full justify-between space-y-2">
      <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1 border-b border-white/10">
        <span>WORKFORCE IDENTITY MATRIX</span>
        <span className="text-sky-400">6/6 ROLES ALLOCATED</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {agents.map((ag) => (
          <div key={ag.role} className={cn("p-2 rounded-lg bg-black/40 border", ag.color)}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-[11px]">{ag.role}</span>
              <span className="text-[9px] text-slate-400">{ag.tasks}</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5 truncate">{ag.model}</div>
          </div>
        ))}
      </div>

      <div className="p-2 rounded-lg bg-black/50 border border-white/10 text-[10px] flex items-center justify-between">
        <span className="text-slate-400">Cedar Policy Boundary:</span>
        <span className="text-emerald-400 font-bold">ISOLATED_SANDBOX</span>
      </div>
    </div>
  );
}

function StageVisualExecute() {
  return (
    <div className="flex flex-col h-full justify-between space-y-2">
      <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1 border-b border-white/10">
        <span>LIVE TELEMETRY STREAM</span>
        <span className="text-emerald-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          RUNNING
        </span>
      </div>

      <div className="space-y-1.5 p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] text-slate-300">
        <div className="text-slate-500">&gt; [CODER] git checkout -b feature/auth-plane</div>
        <div className="text-sky-400">&gt; [CODER] compiled src/auth/cedar.ts in 240ms</div>
        <div className="text-rose-400">&gt; [DESIGN] synced tokens with living-office palette</div>
        <div className="text-amber-400">&gt; [LEAD] gate #2 cleared — unblocking QA stream</div>
        <div className="text-purple-400">&gt; [QA] spinning up test suites on port 3001</div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10">
          <span className="text-[9px] text-slate-400">TOKENS</span>
          <div className="text-xs font-bold text-white mt-0.5">142,890</div>
        </div>
        <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10">
          <span className="text-[9px] text-slate-400">SPEND</span>
          <div className="text-xs font-bold text-emerald-400 mt-0.5">$1.14 / $5.00</div>
        </div>
        <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10">
          <span className="text-[9px] text-slate-400">THROUGHPUT</span>
          <div className="text-xs font-bold text-sky-400 mt-0.5">38 ops/sec</div>
        </div>
      </div>
    </div>
  );
}

function StageVisualVerify() {
  return (
    <div className="flex flex-col h-full justify-between space-y-3">
      <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1 border-b border-white/10">
        <span>VERIFICATION DASHBOARD</span>
        <span className="text-emerald-400">ALL GATES ACTIVE</span>
      </div>

      <div className="space-y-2">
        <div className="p-2.5 rounded-lg bg-black/40 border border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-white text-xs">42/42 Headless Tests Passed</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold">100%</span>
        </div>

        <div className="p-2.5 rounded-lg bg-black/40 border border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-white text-xs">Cedar Permissions: 0 Unauthorized</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold">SECURE</span>
        </div>

        <div className="p-2.5 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-sky-400" />
            <span className="text-white text-xs">Budget Guard: $2.31 / $5.00 Used</span>
          </div>
          <span className="text-[10px] text-sky-400 font-bold">PASS</span>
        </div>
      </div>

      <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span className="text-[11px] text-amber-200">Human Checkpoint Gate</span>
        </div>
        <span className="text-[10px] text-amber-300 font-bold">APPROVED BY OPERATOR</span>
      </div>
    </div>
  );
}

function StageVisualShip() {
  return (
    <div className="flex flex-col h-full justify-between space-y-3">
      <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1 border-b border-white/10">
        <span>PRODUCTION RELEASE MANIFEST</span>
        <span className="text-emerald-400 font-bold">READY TO SHIP</span>
      </div>

      <div className="space-y-2">
        <div className="p-3 rounded-xl bg-black/50 border border-emerald-500/30">
          <div className="text-[10px] text-slate-400">TARGET DEPLOYMENT</div>
          <div className="text-sm font-bold text-white mt-0.5">AWS ECS Fargate + CloudFront CDN</div>
          <div className="text-[10px] text-slate-500 font-mono mt-1">Commit: 0x9e4f21a (Signed &amp; Verified)</div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
            <span className="text-[9px] text-slate-400">FINAL SPEND</span>
            <div className="text-base font-bold text-emerald-400 mt-0.5">$2.31</div>
            <span className="text-[9px] text-slate-400">$2.69 under cap</span>
          </div>

          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
            <span className="text-[9px] text-slate-400">AUDIT LEDGER</span>
            <div className="text-base font-bold text-sky-400 mt-0.5">ARCHIVED</div>
            <span className="text-[9px] text-slate-400">OpenSearch verified</span>
          </div>
        </div>
      </div>

      <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-[11px] text-emerald-200">Outcome Verified &amp; Shipped</span>
        </div>
        <span className="text-[10px] text-emerald-400 font-bold font-mono">DONE</span>
      </div>
    </div>
  );
}
