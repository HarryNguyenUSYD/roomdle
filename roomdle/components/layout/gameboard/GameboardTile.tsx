"use client";

import { useGameboardContext } from "./gameboard.context";
import { useDebugContext } from "@/contexts/DebugContext";
import { GameboardTileState } from "./gameboard.types";

export default function GameboardTile({ x, y, solution, color }: GameboardTileState) {
  const gameboardContext = useGameboardContext();
  const debugContext = useDebugContext();
  if (!gameboardContext || !debugContext) { return null; }

  return (
    <div className="relative w-full h-full group">
      <div className="w-full h-full bg-white group-hover:brightness-75 flex flex-col justify-center items-center">
        {
          debugContext.settings.isDebugging &&
          debugContext.settings.isShowingCoordinates &&
          <p className="text-xl text-black text-center">{`(${x}, ${y})`}</p>
        }
        {
          debugContext.settings.isDebugging &&
          debugContext.settings.isShowingSolution &&
          <p className="text-xl text-black text-center">{`(${solution})`}</p>
        }
      </div>
    </div>
  )
}