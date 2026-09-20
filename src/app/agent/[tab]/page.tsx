"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import MissionControlView, { MissionTab } from "@/components/office/mission-control/MissionControlView";

const VALID_TABS: MissionTab[] = [
  "terminal",
  "monitor",
  "tasks",
  "ask-me",
  "triggers",
  "memory",
  "graph",
  "activity",
  "skills",
  "temps",
];

export default function AgentTabPage() {
  const params = useParams();
  const router = useRouter();
  const rawTab = (params?.tab as string) || "terminal";

  const currentTab: MissionTab = VALID_TABS.includes(rawTab as MissionTab)
    ? (rawTab as MissionTab)
    : "terminal";

  return (
    <MissionControlView
      initialTab={currentTab}
      onTabChange={(newTab) => {
        router.push(`/agent/${newTab}`);
      }}
      onExitFocusMode={() => {
        router.push("/office");
      }}
    />
  );
}
