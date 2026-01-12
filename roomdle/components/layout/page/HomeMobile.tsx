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

export default function HomeMobile() {
  return (
    <ContextWrapper>
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#03091b] gap-5">
        <Title />
        <Gameboard />
        <StreakStat />
        <div className="w-full h-auto flex flex-row justify-center items-center gap-10">
          <div className="w-full h-full flex flex-col justify-center items-end gap-5">
            <StatisticsButton />
            <SettingsButton />
          </div>
          <div className="w-full h-full flex flex-col justify-center items-start gap-5">
            <HistoryButton />
            <SubmitButton />
          </div>
        </div>
        <FurnitureBar />
      </div>
    </ContextWrapper>
  )
}