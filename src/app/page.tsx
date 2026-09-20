"use client";

import React from "react";
import HeroScroll from "@/components/HeroScroll";
import HeroScrollDemo from "@/components/HeroScrollDemo";
import MissionThread from "@/components/MissionThread";
import AgentRoster from "@/components/AgentRoster";
import ClosingCTA from "@/components/ClosingCTA";
import HeroSection6 from "@/components/ui/hero-section-6";

export default function Home() {
  return (
    <div className="relative w-full bg-crew-bg">
      {/* 01. Hero Sequence: Team Assemble -> Office Materialize */}
      <HeroScroll />

      {/* 02. Zone Reveal 1: The Living Office (Container Scroll Tablet with Light Gate Transition) */}
      <div id="zones">
        <HeroScrollDemo />

        {/* 03. The Mission Thread: Lifecycle of an Autonomous Mission */}
        <MissionThread />
      </div>

      {/* 04. The 6-Agent Roster & Character Cutout Showcase */}
      <AgentRoster />

      {/* 08. Integrated UI Showcase (hero-section-6) */}
      <section className="relative w-full">
        <HeroSection6 />
      </section>

      {/* 09. Closing Lounge Scene, Interactive CLI & Footer */}
      <ClosingCTA />
    </div>
  );
}
