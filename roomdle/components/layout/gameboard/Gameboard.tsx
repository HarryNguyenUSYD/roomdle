"use client";

import GameboardTile from "./GameboardTile";
import { GameboardContext } from "./gameboard.context";
import { useMemo, useState, useSyncExternalStore } from "react";
import { Puzzle } from "@/game/Puzzle";
import { DEBUG } from "./gameboard.constants";
import GameboardDebug from "./GameboardDebug";
import { DebugContext, DebugSettings } from "@/contexts/DebugContext";

export default function Gameboard() {
  const puzzle = useMemo(() => new Puzzle(), []);
  const puzzleSync = useSyncExternalStore((l) => puzzle.subscribe(l), () => puzzle.getSnapshot(), () => puzzle.getSnapshot());
  
  const [debugSettings, setDebugSettings] = useState<DebugSettings>({
    isDebugging: true,
    isShowingCoordinates: false,
    isShowingSolution: true
  });

  return (
    <GameboardContext.Provider value={true}>
      <DebugContext.Provider value={{settings: debugSettings, setSettings: setDebugSettings}}>
        <div className="size-[80vw] lg:size-[50vh] flex-none grid grid-cols-5 gap-2">
            {puzzleSync.map((rows, x) => (
              rows.map((solution, y) => (
                <Gameboard.Tile
                  key={`gameboard_tile_${x}_${y}`}
                  x={x}
                  y={y}
                  solution={solution}
                  color={"gray"}
                />
              ))
            ))}
        </div>
        {DEBUG && <GameboardDebug puzzle={puzzle} />}
      </DebugContext.Provider>
    </GameboardContext.Provider>
  )
}

Gameboard.Tile = GameboardTile;