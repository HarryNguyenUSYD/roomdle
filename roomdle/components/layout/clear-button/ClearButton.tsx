"use client";

import { useGameStateStore } from "@/store/useGameStateStore";
import { useSettingsStore } from "@/store/useSettingsStore";

export default function ClearButton() {
  const {
    clearFurniture,
    clearIncorrectFurniture
  } = useGameStateStore();

  const {
    onlyClearIncorrectFurniture,
  } = useSettingsStore();

  return (
    <button
      className="size-12 lg:size-16 h-auto py-2 cursor-pointer bg-green-700 border-2 rounded-full border-white"
      onClick={() => {
        if (onlyClearIncorrectFurniture) {
          clearIncorrectFurniture();
        } else {
          clearFurniture();
        }
      }}
    >
      <p className="text-md lg:text-xl">Clear</p>
    </button>
  )
}