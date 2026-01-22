"use client";

import GameboardTile from "./GameboardTile";
import { GameboardContext } from "./gameboard.context";
import { useMemo, useState, useSyncExternalStore } from "react";
import { Puzzle } from "@/game/Puzzle";
import { DEBUG } from "./gameboard.constants";
import GameboardDebug from "./GameboardDebug";
import { getColor, getNeighbors } from "./gameboard.utils";
import { HighlightColor } from "@/game/game.types";

export default function Gameboard() {
  const puzzle = useMemo(() => new Puzzle(), []);
  const puzzleSync = useSyncExternalStore((l) => puzzle.subscribe(l), () => puzzle.getSnapshot(), () => puzzle.getSnapshot());
  const [predictionMap, setPredictionMap] = useState<number[][]>(Array.from({ length: puzzleSync.length }, () =>
    Array.from({ length: puzzleSync[0].length }, () => (15))
  ));  

  const colorMap = useMemo(() => {
    const out: HighlightColor[][] = []
    for (let y = 0; y < puzzleSync.length; y++) {
      const row: HighlightColor[] = [];
      for (let x = 0; x < puzzleSync[0].length; x++) {
        row.push(getColor(predictionMap[x][y], puzzleSync[x][y]));
      }

      out.push(row);
    }

    return out;
  }, [predictionMap, puzzleSync]);

  return (
    <GameboardContext.Provider value={true}>
      <div
        className={`relative size-[80vw] lg:size-[50vh] flex-none grid`}
        style={{ gridTemplateColumns: `repeat(${puzzleSync.length}, minmax(0, 1fr))` }}
      >
        {puzzleSync.map((rows, y) => (
          rows.map((solution, x) => (
            <Gameboard.Tile
              key={`gameboard_tile_${x}_${y}`}
              x={x}
              y={y}
              neighbors={getNeighbors(colorMap, [x, y])}
              color={getColor(predictionMap[x][y], solution)}
              solution={solution}
            />
          ))
        ))}
      </div>
      {DEBUG && <GameboardDebug puzzle={puzzle} />}
    </GameboardContext.Provider>
  )
}

Gameboard.Tile = GameboardTile;