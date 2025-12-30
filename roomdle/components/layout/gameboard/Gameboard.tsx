"use client";

import GameboardTile from "./GameboardTile";
import { GAMEBOARD_HEIGHT, GAMEBOARD_WIDTH } from "./gameboard.constants";
import { GameboardContext } from "./gameboard.context";

export default function Gameboard() {
  return (
    <GameboardContext.Provider value={true}>
      <div className="size-[80vw] lg:size-[50vh] flex-none grid grid-cols-5 gap-2">
          {Array.from({ length: GAMEBOARD_HEIGHT }).map((_, x) => (
            Array.from({ length: GAMEBOARD_WIDTH }).map((_, y) => (
              <Gameboard.Tile key={`gameboard_tile_${x}_${y}`} x={x} y={y} />
            ))
          ))}
      </div>
    </GameboardContext.Provider>
  )
}

Gameboard.Tile = GameboardTile;