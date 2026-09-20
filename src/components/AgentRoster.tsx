"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Zap,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Terminal,
  Activity,
  Shield,
  Layers,
  Search,
  Code2,
  Palette,
  Send,
} from "lucide-react";
import { SpritePortrait } from "@/components/office/SpritePortrait";
import type { OfficeCharacterName } from "@/live-office/scene/office/cast";

interface AgentData {
  id: string;
  number: string;
  role: string;
  name: string;
  characterName: OfficeCharacterName;
  title: string;
  roleStatement: string;
  description: string;
  quote: string;
  quoteAuthor: string;
  speech: string;
  capabilities: string[];
  terminalLogs: string[];
  stats: {
    missions: string;
    successRate: string;
    avgResponse: string;
  };
  stepIndex: number;
}

const AGENTS: AgentData[] = [
  {
    id: "lead",
    number: "01",
    role: "LEAD",
    name: "JIM",
    characterName: "jim",
    title: "Lead",
    roleStatement: "Plans the mission and coordinates the Ultron team.",
    description:
      "The Lead agent breaks the outcome into tasks, assigns the right specialists, tracks progress, and makes sure everyone stays aligned.",
    quote: "Good ideas get traction when the right people move together.",
    quoteAuthor: "Jim",
    speech: "Let's make it happen! 🚀",
    capabilities: [
      "Task Planning",
      "Delegation",
      "Progress Tracking",
      "Goal Alignment",
      "Risk Detection",
    ],
    terminalLogs: [
      "> Initializing lead agent...",
      "> Loading mission context...",
      "> Team synced ✓",
      "> Ready for execution.",
    ],
    stats: {
      missions: "1420",
      successRate: "99.8%",
      avgResponse: "1.4s",
    },
    stepIndex: 0,
  },
  {
    id: "coder",
    number: "02",
    role: "CODER",
    name: "MICHAEL",
    characterName: "michael",
    title: "Coder",
    roleStatement: "Builds and changes the product with precision.",
    description:
      "Writes high-performance, strictly typed full-stack code, generates tests, inspects ASTs, and creates seamless pull requests.",
    quote: "You miss 100% of the commits you don't push.",
    quoteAuthor: "Michael",
    speech: "Building the next piece. 💻",
    capabilities: [
      "AST Parsing",
      "Full-Stack Code",
      "Test Generation",
      "Git Worktrees",
      "Type Safety",
    ],
    terminalLogs: [
      "> Reading repository AST...",
      "> Generating component tree...",
      "> Unit tests passing ✓",
      "> Ready to push commit.",
    ],
    stats: {
      missions: "4890",
      successRate: "99.4%",
      avgResponse: "2.1s",
    },
    stepIndex: 3,
  },
  {
    id: "designer",
    number: "03",
    role: "DESIGNER",
    name: "PAM",
    characterName: "pam",
    title: "Designer",
    roleStatement: "Creates interfaces, assets, and visual systems.",
    description:
      "Crafts refined design tokens, validates visual hierarchy, ensures responsive typography, and creates modern glassmorphism aesthetics.",
    quote: "There's a lot of beauty in ordinary design when done right.",
    quoteAuthor: "Pam",
    speech: "I'm shaping the interface. 🎨",
    capabilities: [
      "Design Tokens",
      "UI/UX Layouts",
      "Color Science",
      "Visual Polish",
      "Responsive Systems",
    ],
    terminalLogs: [
      "> Loading design tokens...",
      "> Auditing visual hierarchy...",
      "> Contrast ratio 14.2:1 ✓",
      "> Design specs ready.",
    ],
    stats: {
      missions: "1850",
      successRate: "99.6%",
      avgResponse: "1.9s",
    },
    stepIndex: 1,
  },
  {
    id: "qa",
    number: "04",
    role: "QA",
    name: "PHYLLIS",
    characterName: "phyllis",
    title: "QA",
    roleStatement: "Verifies quality, security boundaries, and correctness.",
    description:
      "Runs comprehensive chaos tests, audits Cedar authorization policies, checks test coverage, and enforces safety gates.",
    quote: "I don't let broken code reach production. Ever.",
    quoteAuthor: "Phyllis",
    speech: "Running the checks. 🔍",
    capabilities: [
      "Cedar Policy Audit",
      "Playwright E2E",
      "Chaos Testing",
      "Fuzz Engine",
      "Zero-Leak Gate",
    ],
    terminalLogs: [
      "> Validating Cedar security scope...",
      "> Running Playwright test suite...",
      "> 0 vulnerabilities detected ✓",
      "> Gatekeeper approved.",
    ],
    stats: {
      missions: "6120",
      successRate: "100.0%",
      avgResponse: "0.4s",
    },
    stepIndex: 4,
  },
  {
    id: "research",
    number: "05",
    role: "RESEARCH",
    name: "OSCAR",
    characterName: "oscar",
    title: "Research",
    roleStatement: "Gathers intelligence and synthesizes knowledge.",
    description:
      "Scrapes authoritative documentation, indexes vector embeddings with OpenSearch, and validates factual accuracy.",
    quote: "Actually, let's verify what the data actually says.",
    quoteAuthor: "Oscar",
    speech: "I'm gathering the signal. 📊",
    capabilities: [
      "OpenSearch RAG",
      "Vector Embeddings",
      "RFC Indexing",
      "Knowledge Graphs",
      "Fact Verification",
    ],
    terminalLogs: [
      "> Querying OpenSearch index...",
      "> Extracting semantic embeddings...",
      "> Synthesizing 14 sources ✓",
      "> Knowledge graph ready.",
    ],
    stats: {
      missions: "2310",
      successRate: "99.9%",
      avgResponse: "0.8s",
    },
    stepIndex: 2,
  },
  {
    id: "marketing",
    number: "06",
    role: "MARKETING",
    name: "MEREDITH",
    characterName: "meredith",
    title: "Marketing",
    roleStatement: "Turns finished work into launch-ready messaging.",
    description:
      "Compiles Git commits into developer changelogs, crafts engaging product announcements, and handles launch distribution.",
    quote: "Ship it loud and make sure everyone hears about it.",
    quoteAuthor: "Meredith",
    speech: "Preparing the launch. 🚀",
    capabilities: [
      "Changelog Compiler",
      "Release Notes",
      "SEO Strategy",
      "Launch Messaging",
      "Documentation",
    ],
    terminalLogs: [
      "> Parsing Git commit log...",
      "> Generating release notes...",
      "> SEO tags optimized ✓",
      "> Ready for deployment.",
    ],
    stats: {
      missions: "3410",
      successRate: "99.7%",
      avgResponse: "1.1s",
    },
    stepIndex: 5,
  },
];

const STAGES = [
  { step: "01", label: "Outcome", agentId: "lead" },
  { step: "02", label: "Plan", agentId: "designer" },
  { step: "03", label: "Delegate", agentId: "research" },
  { step: "04", label: "Execute", agentId: "coder" },
  { step: "05", label: "Verify", agentId: "qa" },
  { step: "06", label: "Ship", agentId: "marketing" },
];

const EXAMPLE_MISSIONS = [
  "Build a landing page for my startup",
  "Run a market research report",
  "Design a product demo",
  "Launch a marketing campaign",
];

export default function AgentRoster() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [missionInput, setMissionInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const selectedAgent = AGENTS[selectedIndex];

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % AGENTS.length);
  };

  const handleBack = () => {
    setSelectedIndex((prev) => (prev - 1 + AGENTS.length) % AGENTS.length);
  };

  const handleSelectStage = (agentId: string) => {
    const idx = AGENTS.findIndex((a) => a.id === agentId);
    if (idx !== -1) {
      setSelectedIndex(idx);
    }
  };

  const handleGenerate = () => {
    if (!missionInput.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <section
      id="roster"
      className="relative py-20 lg:py-28 bg-[#070A0E] text-slate-100 overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-sky-500/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[300px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle technical background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(to right, #38bdf8 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ============================================================ */}
        {/* TOP HEADER SECTION */}
        {/* ============================================================ */}
        <div className="relative mb-12 lg:mb-16">
          {/* Floating Ultron Badge (Top-Left) */}
          <div className="hidden lg:flex items-center gap-3 absolute -top-4 left-0 p-3 rounded-2xl bg-[#0c121c]/90 border border-[#1e293b] backdrop-blur-md max-w-xs shadow-xl shadow-black/40">
            <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center justify-center relative overflow-hidden shrink-0">
              <Image
                src="/ultron-logo.png"
                alt="Ultron"
                width={32}
                height={32}
                className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"
              />
            </div>
            <div>
              <div className="text-[10px] font-mono tracking-widest text-slate-400 font-bold uppercase">
                ULTRON
              </div>
              <p className="text-xs text-slate-300 leading-snug">
                Every mission starts with the right team.
              </p>
            </div>
          </div>

          {/* Top-Right Decorative Callouts */}
          <div className="hidden lg:block absolute -top-2 right-0 text-right">
            <div className="text-[11px] font-mono tracking-wider text-slate-500 uppercase">
              Characters bring life to the workflow
            </div>
            <div className="text-[10px] font-mono text-slate-600 tracking-widest mt-1">
              DIFFERENT SKILLS. ONE DIRECTION. A SMARTER TOMORROW.
            </div>
          </div>

          {/* Main Title Center */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0c121c] border border-[#1e293b] text-slate-300 text-xs font-mono tracking-wider uppercase mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span>ULTRON // MISSION CONTROL</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight leading-tight">
              <span className="text-[#F3F0EA]">SIX SPECIALISTS.</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-fuchsia-400">
                ONE SHARED MISSION.
              </span>
            </h2>

            <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
              Assign the right AI agents, share the goal, and let Ultron coordinate
              the work.
              <br className="hidden sm:inline" />
              From idea to execution — together.
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* AGENT SELECTOR CARDS (ROW OF 6) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {AGENTS.map((agent, index) => {
            const isSelected = selectedIndex === index;
            return (
              <button
                key={agent.id}
                onClick={() => setSelectedIndex(index)}
                aria-pressed={isSelected}
                className={`group relative p-3 rounded-2xl border text-left transition-all duration-200 flex items-center gap-3 ${
                  isSelected
                    ? "bg-[#111827] border-sky-400 shadow-[0_0_24px_rgba(56,189,248,0.22)] -translate-y-0.5"
                    : "bg-[#0b1017]/80 border-[#1e293b] hover:border-slate-500 hover:bg-[#0f1622] hover:-translate-y-0.5"
                }`}
              >
                {/* Character Thumbnail */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden shrink-0 border transition-colors ${
                    isSelected
                      ? "border-sky-400/60 bg-[#0c1422]"
                      : "border-[#1e293b] bg-[#070b12] group-hover:border-slate-600"
                  }`}
                >
                  <SpritePortrait
                    character={agent.characterName}
                    scale={1.8}
                    className="object-contain transform translate-y-1"
                  />
                </div>

                {/* Agent Details */}
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-mono tracking-wider text-slate-400 font-bold uppercase truncate">
                    {agent.role}
                  </div>
                  <div className="font-display font-bold text-sm text-white truncate">
                    {agent.name}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[9px] font-mono text-emerald-400 font-medium tracking-wider uppercase">
                      READY
                    </span>
                  </div>
                </div>

                {/* Subtle active highlight bar at the bottom */}
                {isSelected && (
                  <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* MAIN WORKSPACE CONSOLE */}
        {/* Left: Stepper | Center: Profile & Character | Right: Live Status */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch mb-8">
          {/* ------------------------------------------------------------ */}
          {/* 1. LEFT VERTICAL STEPPER (Col 1-2 on desktop) */}
          {/* ------------------------------------------------------------ */}
          <div className="hidden lg:flex lg:col-span-2 flex-col justify-between py-6 px-3 bg-[#090d14]/70 border border-[#1e293b] rounded-2xl relative">
            <div className="text-[10px] font-mono tracking-widest text-slate-500 uppercase px-2 mb-4">
              PIPELINE
            </div>

            <div className="relative flex flex-col space-y-6 flex-1 justify-around">
              {/* Vertical connecting line */}
              <div className="absolute left-[17px] top-4 bottom-4 w-[2px] bg-[#1e293b] -z-0" />

              {STAGES.map((stage) => {
                const isActive = selectedAgent.stepIndex === STAGES.indexOf(stage);
                return (
                  <button
                    key={stage.step}
                    onClick={() => handleSelectStage(stage.agentId)}
                    className="flex items-center gap-3 text-left group z-10 focus:outline-none"
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                        isActive
                          ? "bg-sky-500 text-black shadow-[0_0_18px_rgba(56,189,248,0.5)] ring-4 ring-sky-500/20 scale-105"
                          : "bg-[#0c121c] border border-[#1e293b] text-slate-400 group-hover:border-slate-500 group-hover:text-slate-200"
                      }`}
                    >
                      {stage.step}
                    </div>
                    <div>
                      <div
                        className={`text-xs font-medium transition-colors ${
                          isActive
                            ? "text-white font-bold"
                            : "text-slate-400 group-hover:text-slate-200"
                        }`}
                      >
                        {stage.label}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#1e293b]/60 px-2 text-[10px] font-mono text-slate-500">
              CYCLE // 01
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* 2. CENTER AGENT PROFILE & CHARACTER (Col 3-8 on desktop) */}
          {/* ------------------------------------------------------------ */}
          <div className="lg:col-span-6 bg-[#0c121c]/95 border border-[#1e293b] rounded-2xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between shadow-2xl">
            {/* Top Badge Row */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-0.5 rounded-md bg-[#070a0e] border border-[#1e293b] font-mono text-xs text-sky-400 font-semibold">
                  {selectedAgent.number} / 06
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-sky-950/60 border border-sky-500/30 font-mono text-xs text-sky-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                  AGENT PROFILE
                </span>
              </div>

              {/* Title & Role */}
              <h3 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                {selectedAgent.title}
              </h3>
              <p className="text-sky-400 font-mono text-xs sm:text-sm font-semibold mt-1">
                {selectedAgent.roleStatement}
              </p>

              {/* Description */}
              <p className="mt-3 text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                {selectedAgent.description}
              </p>

              {/* Quote Box */}
              <div className="mt-4 p-3.5 rounded-xl bg-[#080d15]/90 border border-[#1e293b]/80 relative">
                <p className="text-xs text-slate-300 italic">
                  &ldquo;{selectedAgent.quote}&rdquo;{" "}
                  <span className="text-slate-400 font-mono not-italic ml-1">
                    — {selectedAgent.quoteAuthor}
                  </span>
                </p>
              </div>
            </div>

            {/* Middle Section: Capabilities & Character Visual */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center mt-6">
              {/* Capabilities (Left side of center card) */}
              <div className="sm:col-span-7 space-y-2">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">
                  SPECIALIST CAPABILITIES
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedAgent.capabilities.map((cap, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-[#080d15] border border-[#1e293b] text-xs font-mono text-slate-300 flex items-center gap-1.5 hover:border-sky-500/50 transition-colors"
                    >
                      <Zap className="w-3 h-3 text-sky-400 shrink-0" />
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              {/* Character Visual + Speech Bubble (Right side of center card) */}
              <div className="sm:col-span-5 flex flex-col items-center justify-center relative pt-4 sm:pt-0">
                {/* Speech Bubble */}
                <div className="relative mb-2 px-3 py-1.5 rounded-xl bg-[#121c2c] border border-sky-400/40 text-xs font-medium text-sky-200 shadow-lg shadow-sky-500/10 animate-fade-in text-center max-w-[180px]">
                  {selectedAgent.speech}
                  {/* Bubble arrow */}
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#121c2c] border-r border-b border-sky-400/40 rotate-45" />
                </div>

                {/* Character Frame */}
                <div className="relative w-36 h-40 sm:w-40 sm:h-44 rounded-2xl bg-gradient-to-b from-[#0f1725] to-[#080d14] border border-[#1e293b] flex items-center justify-center overflow-hidden shadow-inner group">
                  {/* Ambient backdrop glow */}
                  <div className="absolute w-24 h-24 bg-sky-500/15 rounded-full blur-xl pointer-events-none" />

                  {/* Pixel Character Canvas */}
                  <div className="relative z-10 transform transition-transform duration-300 hover:scale-105">
                    <SpritePortrait
                      character={selectedAgent.characterName}
                      scale={3.6}
                      className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
                    />
                  </div>

                  {/* Frame edge detail */}
                  <div className="absolute bottom-1 right-2 text-[9px] font-mono text-slate-600">
                    ID // {selectedAgent.id.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* 3. RIGHT LIVE STATUS & STATS CONSOLE (Col 9-12 on desktop) */}
          {/* ------------------------------------------------------------ */}
          <div className="lg:col-span-4 bg-[#0c121c]/95 border border-[#1e293b] rounded-2xl p-6 backdrop-blur-xl flex flex-col justify-between shadow-2xl">
            {/* Top Status Indicator */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono tracking-widest text-slate-400 uppercase font-bold">
                  LIVE STATUS
                </span>
                <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE
                </span>
              </div>

              {/* Terminal Logs Output */}
              <div className="p-4 rounded-xl bg-[#06090e] border border-[#1e293b] font-mono text-xs text-slate-300 space-y-2 mb-4 shadow-inner">
                {selectedAgent.terminalLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={
                      log.includes("✓")
                        ? "text-emerald-400 font-semibold"
                        : log.includes("Ready")
                        ? "text-sky-300 font-medium"
                        : "text-slate-400"
                    }
                  >
                    {log}
                  </div>
                ))}

                {/* Animated Frequency Waveform Bars */}
                <div className="pt-2 flex items-center gap-1">
                  {[4, 8, 12, 16, 10, 14, 8, 12, 16, 12, 8, 14, 16, 10, 6, 12, 14, 8].map(
                    (height, i) => (
                      <span
                        key={i}
                        className="w-1 bg-sky-400/80 rounded-full transition-all duration-300"
                        style={{
                          height: `${height}px`,
                          animation: `pulse 1.2s ease-in-out ${i * 0.08}s infinite alternate`,
                        }}
                      />
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Agent Metrics */}
            <div className="pt-4 border-t border-[#1e293b]">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3 font-bold">
                AGENT STATS
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-[#080d15] border border-[#1e293b]">
                  <div className="text-base sm:text-lg font-mono font-bold text-white">
                    {selectedAgent.stats.missions}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">
                    Missions
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#080d15] border border-[#1e293b]">
                  <div className="text-base sm:text-lg font-mono font-bold text-emerald-400">
                    {selectedAgent.stats.successRate}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">
                    Success Rate
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#080d15] border border-[#1e293b]">
                  <div className="text-base sm:text-lg font-mono font-bold text-sky-400">
                    {selectedAgent.stats.avgResponse}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">
                    Avg. Response
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BOTTOM INTERACTIVE MISSION PROMPT BAR */}
        {/* ============================================================ */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0a0f18]/90 border border-[#1e293b] backdrop-blur-md shadow-xl mb-6">
          {/* Input Box */}
          <div className="flex items-center gap-3 bg-[#06090e] border border-[#1e293b] rounded-xl px-4 py-2.5 focus-within:border-sky-400 focus-within:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all">
            <Zap className="w-4 h-4 text-sky-400 shrink-0" />
            <input
              type="text"
              value={missionInput}
              onChange={(e) => setMissionInput(e.target.value)}
              placeholder="Describe your mission..."
              className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-sans"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleGenerate();
              }}
            />
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="shrink-0 px-4 py-2 rounded-lg bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:from-sky-400 hover:to-purple-500 text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-sky-500/20 transition-all active:scale-95 disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isGenerating ? "Generating..." : "Generate with AI"}</span>
            </button>
          </div>

          {/* Example Missions & Navigation Controls */}
          <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Example Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mr-1">
                EXAMPLE MISSIONS:
              </span>
              {EXAMPLE_MISSIONS.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setMissionInput(ex)}
                  className="px-2.5 py-1 rounded-lg bg-[#080d15] hover:bg-[#121c2c] border border-[#1e293b] hover:border-sky-500/40 text-xs font-mono text-slate-300 transition-colors"
                >
                  {ex}
                </button>
              ))}
            </div>

            {/* Back / Next Controls */}
            <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
              <button
                onClick={handleBack}
                className="px-4 py-1.5 rounded-xl border border-[#1e293b] hover:border-slate-500 bg-[#080d15] text-xs font-mono text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-semibold text-xs font-mono transition-all flex items-center gap-1.5 shadow-lg shadow-sky-500/30 active:scale-95"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BOTTOM STATEMENT & ULTRON BRANDING */}
        {/* ============================================================ */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left border-t border-[#1e293b]/60 pt-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-950/60 border border-red-500/30 flex items-center justify-center overflow-hidden shrink-0">
              <Image
                src="/ultron-logo.png"
                alt="Ultron"
                width={24}
                height={24}
                className="w-5 h-5 object-contain"
              />
            </div>
            <div>
              <div className="text-[11px] font-mono tracking-widest text-slate-300 font-bold uppercase">
                ULTRON
              </div>
              <div className="text-[10px] font-mono text-slate-500">
                GIVE AI THE WORK. KEEP THE CONTROL.
              </div>
            </div>
          </div>

          <div className="inline-block px-5 py-2 rounded-full bg-[#0c121c] border border-[#1e293b] shadow-md">
            <p className="font-mono text-xs sm:text-sm text-slate-300">
              They don&apos;t just answer.{" "}
              <span className="text-[#C92F36] font-bold">They work together.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
