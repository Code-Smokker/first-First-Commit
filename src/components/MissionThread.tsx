"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import {
  Sparkles,
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
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ShinyButton from "@/components/ui/shiny-button";

interface Stage {
  id: string;
  num: string;
  label: string;
  tag: string;
  title: string;
  description: string;
  bullets: {
    title: string;
    desc: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
  badge: string;
  badgeColor: string;
}

const STAGES: Stage[] = [
  {
    id: "brief",
    num: "01",
    label: "BRIEF",
    tag: "OUTCOME",
    title: "START WITH THE OUTCOME.",
    description: "Give Ultron one outcome. The system turns intent into executable work.",
    bullets: [
      {
        title: "Intent Parsing",
        desc: "Natural language brief converted into formal AST objectives.",
        icon: Terminal,
      },
      {
        title: "Budget Ceiling",
        desc: "Set a hard financial cap (e.g. $5.00 limit) with circuit breakers.",
        icon: Lock,
      },
      {
        title: "Constraint Invariants",
        desc: "Cedar permissions and stack boundaries locked before start.",
        icon: ShieldCheck,
      },
    ],
    badge: "STAGE 01 // OUTCOME CAPTURE",
    badgeColor: "text-sky-400 bg-sky-950/60 border-sky-500/30",
  },
  {
    id: "plan",
    num: "02",
    label: "PLAN",
    tag: "PLANNING",
    title: "TURN INTENT INTO A MISSION.",
    description: "Ultron's Lead agent breaks the outcome into a structured plan.",
    bullets: [
      {
        title: "DAG Generation",
        desc: "Constructs Directed Acyclic Graph of parallel and serial tasks.",
        icon: Workflow,
      },
      {
        title: "Context7 Indexing",
        desc: "RAG retrieves repository schema and architectural patterns.",
        icon: Layers,
      },
      {
        title: "Task Contracts",
        desc: "Explicit definitions of done with deterministic criteria.",
        icon: CheckCircle2,
      },
    ],
    badge: "STAGE 02 // AST MISSION PLAN",
    badgeColor: "text-purple-400 bg-purple-950/60 border-purple-500/30",
  },
  {
    id: "delegate",
    num: "03",
    label: "DELEGATE",
    tag: "DELEGATION",
    title: "GIVE EVERY TASK TO THE RIGHT AGENT.",
    description: "Specialized agents receive focused work with scoped credentials.",
    bullets: [
      {
        title: "Role Specialization",
        desc: "Lead delegates to Code, Design, RAG, QA, and Launch specialists.",
        icon: Cpu,
      },
      {
        title: "Scoped IAM Credentials",
        desc: "Each agent runs with least-privilege tokens inside microVMs.",
        icon: Lock,
      },
      {
        title: "Consensus Agreement",
        desc: "Multi-agent alignment before filesystem mutations occur.",
        icon: Sparkles,
      },
    ],
    badge: "STAGE 03 // MULTI-AGENT DISPATCH",
    badgeColor: "text-amber-400 bg-amber-950/60 border-amber-500/30",
  },
  {
    id: "execute",
    num: "04",
    label: "EXECUTE",
    tag: "EXECUTION",
    title: "LET THE CREW RUN THE MISSION.",
    description: "Agents execute in parallel while you stay out of the way.",
    bullets: [
      {
        title: "Parallel MicroVM Sandboxes",
        desc: "Background container execution across AWS Fargate pods.",
        icon: Zap,
      },
      {
        title: "Live PTY Telemetry",
        desc: "Bi-directional terminal streaming with zero UI freeze.",
        icon: Terminal,
      },
      {
        title: "Continuous State Sync",
        desc: "Living office floor mirrors real-time pod activity and logs.",
        icon: Workflow,
      },
    ],
    badge: "STAGE 04 // AUTONOMOUS RUNTIME",
    badgeColor: "text-cyan-400 bg-cyan-950/60 border-cyan-500/30",
  },
  {
    id: "verify",
    num: "05",
    label: "VERIFY",
    tag: "VERIFICATION",
    title: "CHECK THE WORK BEFORE IT SHIPS.",
    description: "Every important result passes through verification, testing, and human checkpoints.",
    bullets: [
      {
        title: "Automated Regressions",
        desc: "Full test suite execution with cryptographic artifact hashing.",
        icon: CheckCircle2,
      },
      {
        title: "Cedar Policy Audit",
        desc: "Deterministic verification against AWS Cedar policy invariants.",
        icon: ShieldCheck,
      },
      {
        title: "Human Approval Gates",
        desc: "Sensitive mutations pause for explicit staging confirmation.",
        icon: Lock,
      },
    ],
    badge: "STAGE 05 // POLICY VERIFICATION",
    badgeColor: "text-emerald-400 bg-emerald-950/60 border-emerald-500/30",
  },
  {
    id: "ship",
    num: "06",
    label: "SHIP",
    tag: "DELIVERY",
    title: "ONE VERIFIED OUTCOME.",
    description: "The crew turns the original brief into a finished, production-ready result.",
    bullets: [
      {
        title: "Production Deployment",
        desc: "Verified output deployed to AWS production infrastructure.",
        icon: ArrowRight,
      },
      {
        title: "Budget Audit Cleared",
        desc: "Total mission cost calculated within specified budget ceiling.",
        icon: CheckCircle2,
      },
      {
        title: "Complete Audit Trail",
        desc: "Full transcript and changelog archived in OpenSearch ledger.",
        icon: FileCode2,
      },
    ],
    badge: "STAGE 06 // MISSION COMPLETE",
    badgeColor: "text-rose-400 bg-rose-950/60 border-rose-500/30",
  },
];

export default function MissionThread() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

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
    const targetScroll = containerTop + (index / STAGES.length) * (containerHeight - window.innerHeight);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const currentStage = STAGES[activeStageIndex];

  return (
    <section
      id="mission-thread"
      ref={containerRef}
      className="relative w-full bg-[#080B10] text-white"
      style={{ height: "450vh" }}
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-6 sm:py-8">
        {/* Section Header: Eyebrow + Main Title */}
        <div className="mb-6 lg:mb-8 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/10 text-slate-300 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span>ULTRON // AUTONOMOUS WORKFLOW</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
            <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl tracking-tight text-white leading-none">
              THE MISSION THREAD
            </h2>
            <span className="font-mono text-xs sm:text-sm text-slate-400 tracking-wider uppercase">
              FROM OUTCOME TO SHIPPED WORK.
            </span>
          </div>
        </div>

        {/* Mobile/Tablet Horizontal Progress Bar (< 1024px) */}
        <div className="lg:hidden flex items-center justify-between overflow-x-auto gap-2 py-2 mb-6 border-b border-white/10 scrollbar-none">
          {STAGES.map((stage, idx) => {
            const isActive = activeStageIndex === idx;
            const isCompleted = activeStageIndex > idx;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => handleStageClick(idx)}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-semibold whitespace-nowrap transition-colors border",
                  isActive
                    ? "bg-white/10 text-white border-sky-400/50 shadow-sm"
                    : isCompleted
                    ? "bg-transparent text-slate-400 border-white/10"
                    : "bg-transparent text-slate-600 border-transparent hover:text-slate-400"
                )}
              >
                <span
                  className={cn(
                    "w-2 h-2 rounded-full",
                    isActive ? "bg-sky-400 animate-pulse" : isCompleted ? "bg-slate-400" : "bg-slate-700"
                  )}
                />
                <span>{stage.label}</span>
              </button>
            );
          })}
        </div>

        {/* Desktop 3-Column Grid: Left Thread | Center Story | Right Product Demo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px] lg:min-h-[520px]">
          {/* ================================================== */}
          {/* 1. LEFT SIDE: PERSISTENT MISSION THREAD TRACK (2.5 Cols) */}
          {/* ================================================== */}
          <div className="hidden lg:flex lg:col-span-3 flex-col relative pr-4">
            <div className="relative pl-6 py-2">
              {/* Vertical Background Line */}
              <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-white/10" />

              {/* Vertical Animated Progress Line */}
              <motion.div
                className="absolute left-[11px] top-4 w-[2px] bg-gradient-to-b from-sky-400 via-crew-blue to-purple-400 origin-top"
                style={{
                  height: `${(activeStageIndex / (STAGES.length - 1)) * 88}%`,
                  transition: "height 0.4s ease-out",
                }}
              />

              {/* Stages List */}
              <div className="space-y-7">
                {STAGES.map((stage, idx) => {
                  const isActive = activeStageIndex === idx;
                  const isCompleted = activeStageIndex > idx;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => handleStageClick(idx)}
                      className="group flex items-start gap-4 text-left relative focus:outline-none transition-all cursor-pointer"
                    >
                      {/* Node Bullet */}
                      <div className="relative flex items-center justify-center -ml-[23px] mt-0.5">
                        {isActive && (
                          <div className="absolute w-6 h-6 rounded-full bg-sky-400/20 border border-sky-400/40 animate-ping" />
                        )}
                        <div
                          className={cn(
                            "w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center",
                            isActive
                              ? "bg-[#080B10] border-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.7)]"
                              : isCompleted
                              ? "bg-slate-700 border-slate-500"
                              : "bg-[#080B10] border-slate-800 group-hover:border-slate-600"
                          )}
                        >
                          {isActive && <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />}
                          {isCompleted && <div className="w-1 h-1 rounded-full bg-slate-300" />}
                        </div>
                      </div>

                      {/* Stage Label & Micro-Detail Tag */}
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "font-mono text-xs font-bold tracking-widest transition-colors",
                              isActive
                                ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                                : isCompleted
                                ? "text-slate-300"
                                : "text-slate-600 group-hover:text-slate-400"
                            )}
                          >
                            {stage.num} // {stage.label}
                          </span>
                        </div>
                        <span
                          className={cn(
                            "font-mono text-[9px] tracking-wider uppercase transition-colors",
                            isActive
                              ? "text-sky-400 font-semibold"
                              : isCompleted
                              ? "text-slate-500"
                              : "text-slate-700"
                          )}
                        >
                          {stage.tag}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ================================================== */}
          {/* 2. CENTER: ACTIVE STAGE STORY & BULLETS (4 Cols) */}
          {/* ================================================== */}
          <div className="lg:col-span-4 flex flex-col justify-center min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                className="space-y-4"
              >
                {/* Stage Pill */}
                <div
                  className={cn(
                    "inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-mono tracking-wider uppercase",
                    currentStage.badgeColor
                  )}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  <span>{currentStage.badge}</span>
                </div>

                {/* Stage Title */}
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                  {currentStage.title}
                </h3>

                {/* Stage Description */}
                <p className="text-slate-300 font-sans text-xs sm:text-sm leading-relaxed">
                  {currentStage.description}
                </p>

                {/* Feature Bullets */}
                <div className="space-y-2.5 pt-2">
                  {currentStage.bullets.map((bullet) => {
                    const Icon = bullet.icon;
                    return (
                      <div
                        key={bullet.title}
                        className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3 hover:border-white/15 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="w-3.5 h-3.5 text-sky-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-mono text-xs font-bold text-white tracking-wide">
                            {bullet.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 font-sans leading-normal mt-0.5">
                            {bullet.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Stage 06 Direct CTA */}
                {currentStage.id === "ship" && (
                  <div className="pt-2">
                    <ShinyButton
                      label="START BUILDING →"
                      onClick={() => (window.location.href = "/start")}
                      fillColor="#07090E"
                      labelColor="#FFFFFF"
                      accentColor="#38BDF8"
                      accentSoftColor="#818CF8"
                      cornerRadius={10}
                      className="w-full !py-2.5 !text-xs !font-mono !font-bold !tracking-wider !text-white !border-sky-400/50 hover:!border-sky-400 shadow-[0_0_22px_rgba(56,189,248,0.35)]"
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ================================================== */}
          {/* 3. RIGHT SIDE: LARGE PRODUCT VISUAL PANEL (5 Cols) */}
          {/* ================================================== */}
          <div className="lg:col-span-5 w-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                className="w-full rounded-2xl bg-[#0B0F17] border border-white/15 p-4 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden"
              >
                {/* Visual Glass Sheen Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/[0.04] via-transparent to-purple-500/[0.04] pointer-events-none" />

                {/* STAGE 01 // BRIEF: Command Interface */}
                {currentStage.id === "brief" && (
                  <div className="space-y-4 font-mono select-text">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-sky-400" />
                        <span className="text-xs font-bold text-white tracking-wider">
                          ULTRON COMMAND INTERFACE
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                        ONLINE
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-3">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest block">
                        Mission Prompt Input
                      </span>
                      <div className="flex items-center gap-2 text-sky-300 text-xs sm:text-sm font-semibold">
                        <span className="text-slate-500">$</span>
                        <span>&ldquo;Build a landing page for my startup.&rdquo;</span>
                        <span className="w-2 h-4 bg-sky-400 animate-pulse" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/10">
                        <span className="text-slate-500 block text-[10px]">FINANCIAL CEILING</span>
                        <span className="text-amber-300 font-bold">$5.00 Limit</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/10">
                        <span className="text-slate-500 block text-[10px]">EXECUTION MODE</span>
                        <span className="text-emerald-400 font-bold">Autonomous DAG</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-sky-500/10 border border-sky-500/30 text-[11px] text-sky-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-sky-400" />
                      <span>Outcome received • Routing to Lead Agent AST planner...</span>
                    </div>
                  </div>
                )}

                {/* STAGE 02 // PLAN: Mission Plan AST DAG */}
                {currentStage.id === "plan" && (
                  <div className="space-y-3.5 font-mono select-text">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <Workflow className="w-4 h-4 text-purple-400" />
                        <span className="text-xs font-bold text-white tracking-wider">
                          MISSION PLAN // AST DAG
                        </span>
                      </div>
                      <span className="text-[10px] text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
                        6 CONTRACTS
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-2 text-[11px] leading-relaxed">
                      <div className="text-sky-300 font-bold">Mission // SaaS Landing Page</div>
                      <div className="pl-3 space-y-1.5 text-slate-300">
                        <div className="flex items-center justify-between">
                          <span>├── 01 // Research & RAG Indexing</span>
                          <span className="text-[10px] text-emerald-400 font-semibold">Done</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>├── 02 // Design Tokens & Palette</span>
                          <span className="text-[10px] text-sky-400 font-semibold">Active</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>├── 03 // Next.js Component Tree</span>
                          <span className="text-[10px] text-purple-400 font-semibold">Queued</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>├── 04 // Cedar Authorization Audit</span>
                          <span className="text-[10px] text-amber-400 font-semibold">Gated</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>└── 05 // Production Deploy Pipeline</span>
                          <span className="text-[10px] text-slate-500 font-semibold">Pending</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Dependency Graph Status:</span>
                      <span className="text-emerald-400 font-bold">Zero Cyclic Blocks</span>
                    </div>
                  </div>
                )}

                {/* STAGE 03 // DELEGATE: 6 Ultron Agents Grid */}
                {currentStage.id === "delegate" && (
                  <div className="space-y-3 font-mono select-text">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-bold text-white tracking-wider">
                          SPECIALIST WORKFORCE
                        </span>
                      </div>
                      <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                        DISPATCHED
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-left">
                      {[
                        { name: "Lead Agent", role: "Mission DAG", model: "Claude 3.7", color: "text-sky-400" },
                        { name: "Code Agent", role: "Full-stack code", model: "Sonnet 3.5", color: "text-purple-400" },
                        { name: "Design Agent", role: "UI & Tokens", model: "Figma API", color: "text-rose-400" },
                        { name: "RAG Agent", role: "Knowledge", model: "OpenSearch", color: "text-blue-400" },
                        { name: "QA Agent", role: "Cedar Audit", model: "Cedar Engine", color: "text-emerald-400" },
                        { name: "Launch Agent", role: "Changelog", model: "ECS Fargate", color: "text-amber-400" },
                      ].map((ag) => (
                        <div
                          key={ag.name}
                          className="p-2.5 rounded-lg bg-black/50 border border-white/10 hover:border-white/20 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-0.5">
                            <span className={cn("text-xs font-bold", ag.color)}>{ag.name}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          </div>
                          <p className="text-[10px] text-slate-400 font-sans">{ag.role}</p>
                          <span className="text-[9px] text-slate-500 block mt-1">{ag.model}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STAGE 04 // EXECUTE: Live Runtime & PTY Streaming */}
                {currentStage.id === "execute" && (
                  <div className="space-y-3 font-mono select-text">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-bold text-white tracking-wider">
                          LIVE PTY STREAM (PID 4892)
                        </span>
                      </div>
                      <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                        <span>RUNNING</span>
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-black/80 border border-white/10 font-mono text-[11px] space-y-1.5 text-slate-300">
                      <div className="text-slate-500">// microVM Container: fargate-node-us-east-1</div>
                      <div className="text-emerald-400">[12:44:18] SYSTEM AstDag: 4 parallel tasks running</div>
                      <div className="text-sky-300">[12:44:21] COMMAND cd /workspace && git status</div>
                      <div className="text-slate-400">[12:44:23] OUTPUT M src/components/Hero.tsx</div>
                      <div className="text-purple-300">[12:44:30] TOOL cedar.validate_schema --strict (0ms)</div>
                      <div className="text-amber-300 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        <span>[12:44:35] INTERACTION REQUIRED: Staging confirmation</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-[10px] text-center">
                      <div className="p-2 rounded bg-white/[0.02] border border-white/10">
                        <span className="text-slate-500 block">ACTIVE PODS</span>
                        <span className="text-white font-bold">6 MicroVMs</span>
                      </div>
                      <div className="p-2 rounded bg-white/[0.02] border border-white/10">
                        <span className="text-slate-500 block">BUDGET SPENT</span>
                        <span className="text-sky-400 font-bold">$1.84 / $5.00</span>
                      </div>
                      <div className="p-2 rounded bg-white/[0.02] border border-white/10">
                        <span className="text-slate-500 block">LATENCY</span>
                        <span className="text-emerald-400 font-bold">24ms PTY</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* STAGE 05 // VERIFY: Verification Pipeline */}
                {currentStage.id === "verify" && (
                  <div className="space-y-3 font-mono select-text">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold text-white tracking-wider">
                          VERIFICATION AUDIT
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                        PASSED
                      </span>
                    </div>

                    <div className="space-y-2 text-[11px]">
                      {[
                        { label: "Unit & Integration Tests", result: "42/42 Tests Passed", status: "ok" },
                        { label: "Cedar Authorization Check", result: "POL-CEDAR-09 Validated", status: "ok" },
                        { label: "AST Mutation Invariants", result: "No Scope Overflows", status: "ok" },
                        { label: "Human Staging Approval", result: "Signed Off by User", status: "ok" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="p-2.5 rounded-lg bg-black/60 border border-white/10 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-slate-300">{item.label}</span>
                          </div>
                          <span className="text-[10px] text-emerald-400 font-bold font-mono">
                            {item.result}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-[11px] text-emerald-300">
                      All security gates cleared • Ready for production branch merge
                    </div>
                  </div>
                )}

                {/* STAGE 06 // SHIP: Final Outcome Delivery */}
                {currentStage.id === "ship" && (
                  <div className="space-y-3 font-mono select-text">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-rose-400" />
                        <span className="text-xs font-bold text-white tracking-wider">
                          MISSION COMPLETE
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                        SHIPPED
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-2 text-[11px]">
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Status:</span>
                        <span className="text-emerald-400 font-bold">100% Complete</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Total Mission Cost:</span>
                        <span className="text-sky-400 font-bold">$2.31 / $5.00 limit</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Time to Deliver:</span>
                        <span className="text-white font-bold">4m 12s autonomous</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Deployment URL:</span>
                        <span className="text-sky-300 font-bold flex items-center gap-1">
                          <span>production.ultron.app</span>
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-gradient-to-r from-sky-500/10 via-purple-500/10 to-rose-500/10 border border-white/15 text-center">
                      <p className="text-xs font-sans text-slate-300 mb-2">
                        One brief became a coordinated AI team.
                      </p>
                      <button
                        type="button"
                        onClick={() => (window.location.href = "/start")}
                        className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-[#080B10] font-mono text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 mx-auto"
                      >
                        <span>Start Building With Ultron</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
