"use client";

import { useGameStateStore } from "@/store/useGameStateStore";
import { useSessionStatisticsStore } from "@/store/useSessionStatisticsStore";
import { useSettingsStore } from "@/store/useSettingsStore";

export default function SubmitButton() {
  const {
    updateTileColorMap,
    updateFurnitureColorMap,
    clearFurniture,
    clearIncorrectFurniture
  } = useGameStateStore();

  const {
    incrementAttempt
  } = useSessionStatisticsStore();

  const {
    clearBoardAfterSubmit,
    onlyClearIncorrectFurniture,
  } = useSettingsStore();

  return (
    <button
      className="w-32 lg:w-50 h-auto py-1 cursor-pointer bg-blue-700 border-2 rounded-full border-white"
      onClick={() => {
        updateTileColorMap();
        updateFurnitureColorMap();
        incrementAttempt();
        if (clearBoardAfterSubmit) { 
          if (onlyClearIncorrectFurniture) {
            clearIncorrectFurniture();
          } else {
            clearFurniture();
          }
        }
      }}
    >
      <p className="text-md lg:text-2xl">Submit</p>
    </button>
  )
}