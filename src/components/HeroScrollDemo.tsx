"use client";

import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import {
  Zap,
  Activity,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";

export function HeroScrollDemo() {
  return (
    <section id="living-office" className="relative w-full bg-crew-bg overflow-hidden pt-2">
      {/* Top Ambient Glow */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-crew-blue/10 via-transparent to-transparent pointer-events-none" />

      {/* 3D Container Scroll Tablet */}
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center text-center px-4 max-w-4xl mx-auto mb-2">
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none mb-3 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
              WATCH THE{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-crew-blue via-sky-300 to-cyan-300 drop-shadow-[0_0_35px_rgba(56,189,248,0.6)]">
                WORK HAPPEN.
              </span>
            </h2>

            <p className="text-slate-300 font-sans text-xs sm:text-base max-w-2xl leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              Ultron turns invisible AI execution into a living workspace. Every agent has a role, a location, a task and a current state.
            </p>
          </div>
        }
      >
        {/* Tablet Screen Content: Live Pixel Office Workspace */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#181622] border border-white/10 group">
          {/* Live Pixel Office Base Image */}
          <Image
            src="/live-office.png"
            alt="Ultron Live Office Workspace"
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-contain sm:object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
            priority
          />

          {/* Subtle Corner Scanlines Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E293B10_1px,transparent_1px),linear-gradient(to_bottom,#1E293B10_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

          {/* Top HUD: Sleek Status Pill */}
          <div className="absolute top-3 inset-x-3 sm:top-4 sm:inset-x-4 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0B0E14]/85 backdrop-blur-xl border border-crew-blue/30 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] font-mono text-white font-bold tracking-wider">
                LIVE OFFICE // 6 AGENTS ACTIVE
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <div className="px-2.5 py-1 rounded-md bg-[#0B0E14]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-cyan-300">
                SPRINT 04
              </div>
              <div className="px-2.5 py-1 rounded-md bg-[#0B0E14]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-emerald-400">
                1 VERIFIED
              </div>
            </div>
          </div>

          {/* Bottom Sleek Statement Chip */}
          <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 flex justify-center pointer-events-none">
            <div className="px-4 py-1.5 rounded-full bg-[#0B0E14]/90 backdrop-blur-xl border border-white/15 text-center shadow-lg">
              <span className="text-[11px] font-mono text-slate-200">
                Your AI workforce isn&apos;t a chat history.{" "}
                <span className="text-crew-blue font-bold">It&apos;s an operating team.</span>
              </span>
            </div>
          </div>
        </div>
      </ContainerScroll>

      {/* ================================================== */}
      {/* FUTURISTIC LIGHT GATE DIVIDER (Arrow with no text) */}
      {/* ================================================== */}
      <div className="relative w-full flex flex-col items-center justify-center -mt-10 pb-8 overflow-hidden">
        {/* Ambient Light Blooms */}
        <div className="absolute top-1/2 -translate-y-1/2 w-[600px] h-20 bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -translate-y-1/2 w-[280px] h-10 bg-sky-400/35 blur-xl pointer-events-none" />

        {/* Horizontal Laser / Light Gate Beam with sleek downward chevron arrow */}
        <div className="relative w-full max-w-5xl flex items-center justify-center px-6">
          {/* Left beam */}
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-sky-400/80 to-sky-400 shadow-[0_0_15px_#38bdf8]" />

          {/* Central Downward Chevron Arrow */}
          <div className="relative px-3 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-cyan-300 drop-shadow-[0_0_12px_#38bdf8] animate-bounce"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {/* Right beam */}
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-sky-400/80 to-sky-400 shadow-[0_0_15px_#38bdf8]" />
        </div>
      </div>
    </section>
  );
}

export default HeroScrollDemo;
