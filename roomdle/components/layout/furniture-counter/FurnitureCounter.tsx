"use client";

import { NUM_PIECES_PER_PUZZLE } from "@/game/game.consts";
import { useGameStateStore } from "@/store/useGameStateStore"

export default function FurnitureCounter() {
  const {
    furniturePlacementMap
  } = useGameStateStore();

  return (
    <div className="w-auto h-auto">
      <p className="text-md lg:text-2xl">
        {`${furniturePlacementMap.length} / ${NUM_PIECES_PER_PUZZLE} pieces placed`}
      </p>
    </div>
  )
}