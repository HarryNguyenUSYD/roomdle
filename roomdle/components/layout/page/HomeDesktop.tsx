"use client";

import { useState } from "react";
import FurnitureBar from "../furniture-bar/FurnitureBar";
import Gameboard from "../gameboard/Gameboard";
import HistoryButton from "../history/HistoryButton";
import SettingsButton from "../settings/SettingsButton";
import StatisticsButton from "../statistics/StatisticsButton";
import StreakStat from "../streak-stat/StreakStat";
import SubmitButton from "../submit/SubmitButton";
import Title from "../title/Title";
import ContextWrapper from "@/contexts/ContextWrapper";

export default function HomeDesktop() {
  return (
    <ContextWrapper>
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#03091b] gap-20">
        <div className="w-full h-auto flex flex-row justify-center items-center gap-20">
          <div className="w-full h-full flex flex-col justify-center items-end gap-20">
            <Title />
            <StatisticsButton />
            <SettingsButton />
          </div>
          <Gameboard />
          <div className="w-full h-full flex flex-col justify-center items-start gap-20">
            <StreakStat />
            <HistoryButton />
            <SubmitButton />
          </div>
        </div>
        <FurnitureBar />
      </div>
    </ContextWrapper>
  )
}