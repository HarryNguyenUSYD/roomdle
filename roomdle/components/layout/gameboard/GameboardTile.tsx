"use client";

import { DEBUG } from "./gameboard.constants";
import { useGameboardContext } from "./gameboard.context";

type GameboardTileProps = {
  x: number,
  y: number
}

export default function GameboardTile({ x, y }: GameboardTileProps) {
  const context = useGameboardContext();
  if (!context) { return null; }

  return (
    <div className="relative w-full h-full group">
      <div className="w-full h-full bg-white group-hover:bg-blue-700 flex justify-center items-center">
        {DEBUG && <p className="text-2xl text-black">{`(${x}, ${y})`}</p>}
      </div>
    </div>
  )
}