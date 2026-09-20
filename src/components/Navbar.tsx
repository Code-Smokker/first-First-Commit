"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  Menu,
  X,
  BookOpen,
  Code2,
  ShieldCheck,
  Cpu,
  Layers,
  Terminal,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ShinyButton from "@/components/ui/shiny-button";

interface NavItem {
  key: string;
  label: string;
  href: string;
  isDocs?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { key: "WORKFORCE", label: "WORKFORCE", href: "#roster" },
  { key: "HOW_IT_WORKS", label: "HOW IT WORKS", href: "#zones" },
  { key: "CONTROL", label: "CONTROL", href: "#server-lounge" },
  { key: "ARCHITECTURE", label: "ARCHITECTURE", href: "#architecture" },
  { key: "DOCS", label: "DOCS", href: "#docs", isDocs: true },
  { key: "COMMUNITY", label: "COMMUNITY", href: "#cta" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [activeDocTab, setActiveDocTab] = useState<"quickstart" | "architecture" | "cedar" | "cli">("quickstart");
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDocsOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scroll when docs modal is open
  useEffect(() => {
    if (isDocsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDocsOpen]);

  if (
    pathname?.startsWith("/office") ||
    pathname?.startsWith("/prototype") ||
    pathname?.startsWith("/start")
  ) {
    return null;
  }

  const handleNavClick = (item: NavItem) => {
    if (item.isDocs) {
      setIsDocsOpen(true);
      setMobileMenuOpen(false);
      return;
    }

    setMobileMenuOpen(false);
    const el = document.querySelector(item.href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleStartBuilding = () => {
    setMobileMenuOpen(false);
    setIsDocsOpen(false);
    window.location.href = "/start";
  };

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          "fixed top-0 inset-x-0 z-[100] w-full transition-all duration-300 select-none",
          scrolled
            ? "bg-black/90 backdrop-blur-2xl border-b border-white/[0.12] shadow-[0_12px_36px_rgba(0,0,0,0.9)] py-2.5"
            : "bg-black/75 backdrop-blur-xl border-b border-white/[0.08] py-3.5"
        )}
      >
        {/* Subtle Ambient Shimmer Line Across Bottom Border */}
        <div className="absolute bottom-0 inset-x-0 h-[1px] overflow-hidden pointer-events-none">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-sky-400/30 via-purple-400/25 to-transparent opacity-80" />
          <div className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
        </div>

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Brand / Logo: Big Ultron Logo with glowing aura */}
          <a
            href="#hero"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="relative flex items-center group py-0.5"
            aria-label="Ultron Home"
          >
            <div className="absolute -inset-2 bg-red-600/25 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative h-10 sm:h-11 md:h-12 w-auto flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/ultron-logo.png"
                alt="Ultron"
                className="h-9 sm:h-10 md:h-11 w-auto object-contain filter drop-shadow-[0_0_16px_rgba(239,68,68,0.7)] group-hover:drop-shadow-[0_0_24px_rgba(239,68,68,0.95)] group-hover:scale-105 transition-all duration-300"
              />
            </div>
          </a>

          {/* Clean Text-Only Nav Links (Styled exactly like Screenshot 3: No pills, no chevrons, pure typography) */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => handleNavClick(item)}
                className="relative py-1 font-mono text-[11px] lg:text-xs font-semibold tracking-[0.2em] uppercase text-slate-400 hover:text-white transition-all duration-200 group"
              >
                <span>{item.label}</span>
                {/* Subtle hover underline indicator */}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-sky-400 to-cyan-300 group-hover:w-full transition-all duration-300 ease-out" />
              </button>
            ))}
          </nav>

          {/* Right CTA Button: START BUILDING with High-Contrast Pure White Text & Shine Sheen */}
          <div className="hidden sm:flex items-center gap-3">
            <ShinyButton
              label="START BUILDING →"
              onClick={handleStartBuilding}
              fillColor="#07090E"
              labelColor="#FFFFFF"
              accentColor="#38BDF8"
              accentSoftColor="#818CF8"
              cornerRadius={10}
              className="!py-2.5 !px-5 !text-xs !font-mono !font-bold !tracking-wider !text-white !border-sky-400/50 hover:!border-sky-400 shadow-[0_0_22px_rgba(56,189,248,0.35)] hover:shadow-[0_0_28px_rgba(56,189,248,0.6)]"
            />
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white p-2 rounded-lg bg-black/40 border border-white/10"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Drawer with Pure Black Glassmorphism */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-2xl px-6 py-6 flex flex-col gap-4 font-mono text-sm max-h-[85vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ultron-logo.png" alt="Ultron" className="h-8 w-auto object-contain" />
              <span className="text-[10px] font-mono text-emerald-400 tracking-wider">6 AGENTS ONLINE</span>
            </div>

            <div className="flex flex-col gap-2 py-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item)}
                  className="text-slate-300 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 flex items-center justify-between font-mono text-xs tracking-[0.18em] uppercase text-left transition-colors"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              ))}
            </div>

            <div className="pt-2">
              <ShinyButton
                label="START BUILDING →"
                onClick={handleStartBuilding}
                fillColor="#07090E"
                labelColor="#FFFFFF"
                accentColor="#38BDF8"
                accentSoftColor="#818CF8"
                cornerRadius={10}
                className="w-full !py-3 !text-xs !font-mono !font-bold !tracking-wider !text-white"
              />
            </div>
          </div>
        )}
      </header>

      {/* ================================================== */}
      {/* ULTRON PRODUCT DOCUMENTATION MODAL (Clean, Dark, No Faces) */}
      {/* ================================================== */}
      {isDocsOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
          <div
            className="w-full max-w-4xl max-h-[88vh] bg-[#0A0D13] border border-white/15 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden text-white font-sans"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="h-14 px-5 sm:px-6 bg-[#0E121A] border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-sky-400" />
                <div>
                  <h3 className="font-display font-bold text-sm tracking-wide text-white">
                    Ultron Platform Documentation
                  </h3>
                  <p className="font-mono text-[10px] text-slate-400">
                    Architecture, Cedar Policy Boundaries, and PTY Execution Engine
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDocsOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close Documentation"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Tabs Bar */}
            <div className="px-5 sm:px-6 bg-[#0B0E14] border-b border-white/10 flex items-center gap-2 overflow-x-auto shrink-0 py-2">
              {[
                { id: "quickstart", label: "01 // Quickstart", icon: Sparkles },
                { id: "architecture", label: "02 // Architecture", icon: Layers },
                { id: "cedar", label: "03 // Cedar Policies", icon: ShieldCheck },
                { id: "cli", label: "04 // CLI & MicroVM", icon: Terminal },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeDocTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveDocTab(tab.id as any)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors whitespace-nowrap",
                      isActive
                        ? "bg-sky-500/15 text-sky-300 border border-sky-500/30"
                        : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Modal Content Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 font-mono text-xs space-y-6 text-slate-300 select-text">
              {activeDocTab === "quickstart" && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-display text-sm font-bold text-white mb-1">
                      Welcome to Ultron
                    </h4>
                    <p className="text-slate-400 leading-relaxed font-sans text-xs">
                      Ultron orchestrates 6 autonomous AI agents into a coordinated engineering team. Instead of chatting with single models in silos, you give Ultron a mission brief with a financial ceiling, and the agents execute in parallel microVM sandboxes under strict Cedar governance.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-2">
                    <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider block">
                      Autonomous Workflow Pipeline
                    </span>
                    <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
                      <li><strong className="text-white">Brief:</strong> Define the product outcome and financial budget ceiling (e.g. $5.00 limit).</li>
                      <li><strong className="text-white">Plan:</strong> Lead Agent parses the AST and builds the task dependency DAG.</li>
                      <li><strong className="text-white">Delegate:</strong> Specialists (Code, QA, Design, Research) receive prioritized contracts.</li>
                      <li><strong className="text-white">Execute:</strong> Background execution inside ephemeral AWS microVMs with live PTY logs.</li>
                      <li><strong className="text-white">Verify:</strong> Cryptographic audit against automated tests and Cedar policy rules.</li>
                      <li><strong className="text-white">Ship:</strong> Verified output deployed to production once gates are satisfied.</li>
                    </ol>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-slate-400 font-sans text-xs">
                      Ready to inspect the live floor?
                    </span>
                    <Link
                      href="/office"
                      className="px-4 py-2 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <span>Open Live Office Floor</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              {activeDocTab === "architecture" && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-display text-sm font-bold text-white mb-1">
                      AWS Cloud Infrastructure
                    </h4>
                    <p className="text-slate-400 leading-relaxed font-sans text-xs">
                      Ultron bridges modern LLM models (Claude 3.7 Sonnet, Haiku, GPT-4o) with native AWS services for high-availability enterprise orchestration.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-black/50 border border-white/10">
                      <span className="text-sky-400 font-bold block mb-1">Amazon Bedrock</span>
                      <p className="text-slate-400 font-sans text-[11px]">
                        Multi-model inference with automatic token optimization, model fallbacks, and streaming response pipelines.
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-black/50 border border-white/10">
                      <span className="text-purple-400 font-bold block mb-1">AWS Cedar</span>
                      <p className="text-slate-400 font-sans text-[11px]">
                        Fine-grained authorization engine evaluating every file read, write, and command against policy invariants.
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-black/50 border border-white/10">
                      <span className="text-amber-400 font-bold block mb-1">Amazon OpenSearch</span>
                      <p className="text-slate-400 font-sans text-[11px]">
                        Vector database indexing the repository AST, documentation, and historical mission memories for sub-millisecond retrieval.
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-black/50 border border-white/10">
                      <span className="text-emerald-400 font-bold block mb-1">ECS Fargate & Lambda</span>
                      <p className="text-slate-400 font-sans text-[11px]">
                        Isolated microVM container runners where agents compile, run test suites, and execute bash commands in isolation.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeDocTab === "cedar" && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-display text-sm font-bold text-white mb-1">
                      Cedar Policy Boundaries & Human Gates
                    </h4>
                    <p className="text-slate-400 leading-relaxed font-sans text-xs">
                      Agents are never given unbounded credentials. Every tool call and filesystem mutation is intercepted and verified against declarative Cedar rules.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#06080E] border border-white/10 font-mono text-[11px] text-slate-300 overflow-x-auto">
                    <div className="text-slate-500 mb-2">// Sample Cedar Authorization Policy</div>
                    <pre className="text-emerald-400">
{`permit(
  principal == Ultron::Agent::"engineer",
  action in [Action::"file_write", Action::"git_commit"],
  resource in Ultron::Repository::"auth-service"
) when {
  context.budget_spent < 5.00 &&
  context.is_sandboxed == true
};`}
                    </pre>
                  </div>

                  <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-white text-xs">Hard Financial Circuit Breaker</h5>
                      <p className="text-slate-400 font-sans text-[11px] mt-0.5">
                        If token consumption reaches the user-specified ceiling ($5.00), all active PTY processes are gracefully paused and an approval request is raised to the user.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeDocTab === "cli" && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-display text-sm font-bold text-white mb-1">
                      Interactive CLI & PTY Control
                    </h4>
                    <p className="text-slate-400 leading-relaxed font-sans text-xs">
                      Ultron features a bi-directional streaming terminal allowing you to inject commands, review real-time tool logs, or approve blocked action checkpoints directly.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#06080E] border border-white/10 font-mono text-[11px] space-y-1.5">
                    <div className="text-slate-500">// Terminal Command Palette</div>
                    <div className="text-sky-300">$ ultron run &quot;Migrate auth schema to Cedar policies&quot; --budget 5.00</div>
                    <div className="text-slate-400">[12:44:18] SYSTEM AstDag generated: 4 tasks across 3 pods</div>
                    <div className="text-emerald-400">[12:44:30] TOOL cedar.validate_schema --strict (exit code 0)</div>
                    <div className="text-amber-300">[12:44:35] CHECKPOINT User approval required for production branch</div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="h-14 px-5 sm:px-6 bg-[#0E121A] border-t border-white/10 flex items-center justify-between shrink-0">
              <span className="font-mono text-[11px] text-slate-500">
                Ultron Spec v2.4 // Autonomous Workspaces
              </span>
              <button
                type="button"
                onClick={() => setIsDocsOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-mono text-xs font-semibold transition-colors"
              >
                Close Docs
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
