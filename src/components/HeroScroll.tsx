"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  ChevronDown,
  ArrowRight,
  AlertTriangle,
  Layers,
  CheckCircle2,
  Workflow,
  Lock,
} from "lucide-react";

export default function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const initialImageRef = useRef<HTMLImageElement | null>(null);
  const [initialReady, setInitialReady] = useState(false);

  // Framer Motion hardware-accelerated scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const prefersReducedMotion = useReducedMotion();

  // Preload first frame immediately for instant first-paint
  useEffect(() => {
    const img = new Image();
    img.src = "/sequence-1/frame-001.jpg";
    img.onload = () => {
      initialImageRef.current = img;
      setInitialReady(true);
    };
    img.onerror = () => {
      img.src = "/sequence-1/ezgif-frame-001.jpg";
      img.onload = () => {
        initialImageRef.current = img;
        setInitialReady(true);
      };
    };
  }, []);

  // Preload 276 frames for Sequence 1 (high-density cinematic scrub)
  const { imagesRef, isLoaded, progress: loadProgress } = useImagePreloader(
    "/sequence-1/",
    276
  );

  const TOTAL_FRAMES = 276;
  const dirtyRef = useRef(true);
  const lastFrameRef = useRef(-1);
  const dimensionsRef = useRef({ width: 1920, height: 1080, scale: 1 });

  // Canvas backing store. The source frames are 1280x720, so rendering at 2-2.5x device pixels
  // (~5000px wide) adds no detail and only burns fill-rate — that was the scroll "hang". Cap it.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const update = () => {
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      const scale = Math.min(window.devicePixelRatio || 1, 1.5, 1920 / width);
      dimensionsRef.current = { width, height, scale };
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      dirtyRef.current = true;
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  // A late-arriving frame or first paint must trigger a redraw.
  useEffect(() => {
    dirtyRef.current = true;
  }, [loadProgress, initialReady]);

  // Render loop: draws ONE sharp frame (no cross-dissolve, no extra lerp — Lenis already smooths the
  // scroll), only when the frame index actually changes, and only while the hero is on screen.
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const usable = (img?: HTMLImageElement | null) =>
      !!img && img.complete && img.naturalWidth > 0;

    const pickImage = (idx: number) => {
      if (usable(imagesRef.current[idx])) return imagesRef.current[idx];
      for (let i = idx - 1; i >= 0; i--) if (usable(imagesRef.current[i])) return imagesRef.current[i];
      return usable(initialImageRef.current) ? initialImageRef.current : null;
    };

    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      const idx = prefersReducedMotion
        ? TOTAL_FRAMES - 1
        : Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(scrollYProgress.get() * (TOTAL_FRAMES - 1))));
      if (idx === lastFrameRef.current && !dirtyRef.current) return;

      const img = pickImage(idx);
      if (!img) return;
      const { width, height, scale } = dimensionsRef.current;
      // cover the pinned viewport, with downwards shift on the opening character frame
      const k = Math.max(width / img.naturalWidth, height / img.naturalHeight);
      const w = img.naturalWidth * k;
      const h = img.naturalHeight * k;
      const topShift = Math.round(180 * Math.max(0, 1 - idx / 120));
      const x = (width - w) / 2;
      const y = (height - h) / 2 + topShift;
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      ctx.fillStyle = "#080B10";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, x, y, w, h);
      lastFrameRef.current = idx;
      dirtyRef.current = false;
    };

    const start = () => { if (!raf) raf = requestAnimationFrame(draw); };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { dirtyRef.current = true; start(); } else stop(); },
      { rootMargin: "100px" }
    );
    io.observe(container);
    return () => { io.disconnect(); stop(); };
  }, [prefersReducedMotion, scrollYProgress, imagesRef]);

  // Framer Motion Checkpoint Opacities & Transforms
  // CHECKPOINT 0: HERO (Visible immediately at scroll 0, fades as user scrolls past 0.20)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.16, 0.24], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.24], [0, -25]);

  // CHECKPOINT 1: THE PROBLEM (Visible from 0.28 to 0.58)
  const problemOpacity = useTransform(scrollYProgress, [0.28, 0.35, 0.52, 0.58], [0, 1, 1, 0]);
  const problemY = useTransform(scrollYProgress, [0.28, 0.35, 0.52, 0.58], [24, 0, 0, -24]);

  // CHECKPOINT 2: AUTONOMOUS EXECUTION (Visible from 0.64 to 0.94)
  const execOpacity = useTransform(scrollYProgress, [0.64, 0.70, 0.88, 0.94], [0, 1, 1, 0]);
  const execY = useTransform(scrollYProgress, [0.64, 0.70, 0.88, 0.94], [24, 0, 0, -24]);

  const scrollPromptOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-[400vh] bg-crew-bg"
    >
      {/* Pinned Sticky Viewport */}
      <div className="sticky top-[var(--nav-height)] h-[calc(100vh-var(--nav-height))] w-full overflow-hidden isolate flex items-center justify-center">
        {/* Full-width Native Canvas with Hardware Acceleration */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full select-none pointer-events-none"
        />

        {/* Scanline Grid Effect Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E293B10_1px,transparent_1px),linear-gradient(to_bottom,#1E293B10_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        {/* Top & Bottom Cinematic Edge Vignette */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-64 sm:h-80 bg-gradient-to-t from-crew-bg via-crew-bg/75 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-radial-vignette opacity-50 pointer-events-none" />

        {/* Preload Progress Indicator */}
        {!isLoaded && !initialReady && (
          <div className="absolute bottom-8 left-8 z-30 flex items-center gap-3 bg-crew-surface/90 px-4 py-2.5 rounded-xl border border-crew-border">
            <div className="w-4 h-4 border-2 border-crew-blue border-t-transparent rounded-full animate-spin" />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono tracking-widest text-slate-400">
                SYNCHRONIZING FRAMES
              </span>
              <div className="w-32 h-1 bg-crew-border rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-crew-blue transition-all duration-200"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
            </div>
            <span className="text-xs font-mono text-crew-blue font-bold">
              {loadProgress}%
            </span>
          </div>
        )}

        {/* ================================================== */}
        {/* ================================================== */}
        {/* SECTION 01 — HERO (Visible from start, clean text without card background) */}
        {/* ================================================== */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute inset-0 flex flex-col items-center justify-end text-center px-4 sm:px-6 pb-6 sm:pb-8 pointer-events-none z-20"
        >
          <div className="flex flex-col items-center max-w-3xl w-full">
            <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
              GIVE AI{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-crew-blue to-cyan-300 drop-shadow-[0_0_35px_rgba(56,189,248,0.6)]">
                THE WORK.
              </span>{" "}
              <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-orange-400 drop-shadow-[0_0_35px_rgba(244,63,94,0.5)]">
                KEEP THE CONTROL.
              </span>
            </h1>

            <p className="mt-2.5 text-slate-200 font-sans text-xs sm:text-sm md:text-base max-w-xl leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              One brief becomes a coordinated AI team — while you stay in full control.
            </p>

            {/* CTA */}
            <div className="mt-4 flex items-center justify-center pointer-events-auto">
              <a
                href="/start"
                className="px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-crew-blue via-sky-400 to-crew-purple text-crew-bg font-bold font-display text-xs sm:text-sm tracking-wider shadow-[0_0_30px_rgba(56,189,248,0.6)] hover:scale-105 hover:shadow-[0_0_40px_rgba(56,189,248,0.8)] transition-all flex items-center gap-2"
              >
                <span>START BUILDING</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Bottom subtle prompt */}
          <motion.div
            style={{ opacity: scrollPromptOpacity }}
            className="flex flex-col items-center gap-1 text-slate-400 font-mono text-[10px] tracking-widest mt-3"
          >
            <span>SCROLL TO EXPLORE MISSION</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce text-crew-blue" />
          </motion.div>
        </motion.div>

        {/* ================================================== */}
        {/* SECTION 02 — THE PROBLEM (Scroll 0.28 to 0.58) */}
        {/* ================================================== */}
        <motion.div
          style={{ opacity: problemOpacity, y: problemY }}
          className="absolute inset-0 flex flex-col items-center justify-end text-center px-4 sm:px-6 pb-6 sm:pb-8 pointer-events-none z-20"
        >
          <div className="max-w-5xl w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-[11px] font-mono tracking-widest uppercase mb-2 shadow-[0_0_20px_rgba(239,68,68,0.25)]">
              <AlertTriangle className="w-3.5 h-3.5" />
              THE PROBLEM
            </div>

            <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight mb-1.5 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
              AI IS EVERYWHERE.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-300 drop-shadow-[0_0_30px_rgba(239,68,68,0.5)]">
                THE WORKFLOW ISN&apos;T.
              </span>
            </h2>

            <p className="text-slate-300 font-sans text-xs sm:text-sm max-w-xl mx-auto mb-3 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Scattered across chats, tabs, and tools — you still have to coordinate every step.
            </p>

            {/* 4 Glassmorphic Problem Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-left mb-3 pointer-events-auto">
              <div className="p-3 rounded-xl bg-[#0B0E14]/90 border border-white/10 hover:border-red-500/30 transition-colors shadow-lg">
                <span className="text-xs font-mono font-bold text-red-400 block mb-1">
                  &ldquo;One task at a time.&rdquo;
                </span>
                <p className="text-xs text-slate-300 font-sans leading-snug">
                  AI tools wait for the next prompt instead of continuing the mission.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#0B0E14]/90 border border-white/10 hover:border-amber-500/30 transition-colors shadow-lg">
                <span className="text-xs font-mono font-bold text-amber-400 block mb-1">
                  &ldquo;Disconnected tools.&rdquo;
                </span>
                <p className="text-xs text-slate-300 font-sans leading-snug">
                  Research, coding, design, and testing live in different places.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#0B0E14]/90 border border-white/10 hover:border-crew-blue/30 transition-colors shadow-lg">
                <span className="text-xs font-mono font-bold text-crew-blue block mb-1">
                  &ldquo;Zero visibility.&rdquo;
                </span>
                <p className="text-xs text-slate-300 font-sans leading-snug">
                  Hard to know what is running, what is blocked, or needs attention.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#0B0E14]/90 border border-white/10 hover:border-purple-500/30 transition-colors shadow-lg">
                <span className="text-xs font-mono font-bold text-purple-400 block mb-1">
                  &ldquo;Uncontrolled actions.&rdquo;
                </span>
                <p className="text-xs text-slate-300 font-sans leading-snug">
                  Giving AI access without clear permissions creates risk.
                </p>
              </div>
            </div>

            <div className="inline-block px-3.5 py-1 rounded-full bg-[#0B0E14]/80 border border-crew-border font-mono text-[11px] text-white">
              Ultron turns scattered AI tools into <span className="text-crew-blue font-bold">one coordinated workforce</span>.
            </div>
          </div>
        </motion.div>

        {/* ================================================== */}
        {/* SECTION 04 — AUTONOMOUS EXECUTION (Scroll 0.64 to 0.94) */}
        {/* ================================================== */}
        <motion.div
          style={{ opacity: execOpacity, y: execY }}
          className="absolute inset-0 flex flex-col items-center justify-end text-center px-4 sm:px-6 pb-6 sm:pb-8 pointer-events-none z-20"
        >
          <div className="max-w-5xl w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crew-blue/10 border border-crew-blue/40 text-crew-blue text-[11px] font-mono tracking-widest uppercase mb-2 shadow-neon-blue">
              <Workflow className="w-3.5 h-3.5" />
              AUTONOMOUS EXECUTION
            </div>

            <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight mb-1.5 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
              YOU GIVE THE OUTCOME.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-crew-blue via-sky-300 to-crew-purple drop-shadow-[0_0_30px_rgba(56,189,248,0.6)]">
                THE CREW RUNS THE MISSION.
              </span>
            </h2>

            <p className="text-slate-300 font-sans text-xs sm:text-sm max-w-xl mx-auto mb-3 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Converts a single brief into tasks executed across specialized agents.
            </p>

            {/* 6 Story Steps in Glassmorphism */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-left mb-3 pointer-events-auto">
              <div className="p-2.5 sm:p-3 rounded-xl bg-[#0B0E14]/90 border border-crew-blue/30 shadow-md">
                <span className="text-[10px] font-mono text-crew-blue font-bold block">01 // BRIEF</span>
                <span className="text-xs font-display font-bold text-white block mt-0.5">
                  &ldquo;Build a landing page.&rdquo;
                </span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl bg-[#0B0E14]/90 border border-white/10 shadow-md">
                <span className="text-[10px] font-mono text-slate-400 font-bold block">02 // PLAN</span>
                <span className="text-xs text-slate-300 font-sans block mt-0.5">
                  Lead creates the plan.
                </span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl bg-[#0B0E14]/90 border border-white/10 shadow-md">
                <span className="text-[10px] font-mono text-slate-400 font-bold block">03 // DELEGATE</span>
                <span className="text-xs text-slate-300 font-sans block mt-0.5">
                  Agents receive work.
                </span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl bg-[#0B0E14]/90 border border-white/10 shadow-md">
                <span className="text-[10px] font-mono text-slate-400 font-bold block">04 // EXECUTE</span>
                <span className="text-xs text-slate-300 font-sans block mt-0.5">
                  Runs in background.
                </span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl bg-[#0B0E14]/90 border border-white/10 shadow-md">
                <span className="text-[10px] font-mono text-slate-400 font-bold block">05 // VERIFY</span>
                <span className="text-xs text-slate-300 font-sans block mt-0.5">
                  Outputs checked first.
                </span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl bg-[#0B0E14]/90 border border-emerald-500/30 shadow-md">
                <span className="text-[10px] font-mono text-emerald-400 font-bold block">06 // SHIP</span>
                <span className="text-xs text-slate-200 font-sans block mt-0.5">
                  Assembled into result.
                </span>
              </div>
            </div>

            <div className="inline-block px-3.5 py-1 rounded-full bg-[#0B0E14]/80 border border-crew-border font-mono text-[11px] text-slate-300">
              Your laptop can close. <span className="text-crew-blue font-bold">The mission doesn&apos;t have to.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
