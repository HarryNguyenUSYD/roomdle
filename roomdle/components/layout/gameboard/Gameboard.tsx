"use client";

import GameboardTile from "./GameboardTile";
import { GameboardContext } from "./gameboard.context";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Puzzle } from "@/game/Puzzle";
import { DEBUG } from "./gameboard.constants";
import GameboardDebug from "./GameboardDebug";
import { getColor, getNeighbors, getPlacementFromOrientation, isTileInPlacement, isValidPlacement } from "./gameboard.utils";
import { HighlightColor } from "@/game/game.types";
import { FurniturePlacement, TileCoordinates } from "./gameboard.types";
import { useDragAndDropContext } from "@/contexts/DragAndDropContext";

export default function Gameboard() {
  const ref = useRef<HTMLDivElement | null>(null);
  const puzzle = useMemo(() => new Puzzle(), []);
  const puzzleSync = useSyncExternalStore((l) => puzzle.subscribe(l), () => puzzle.getSnapshot(), () => puzzle.getSnapshot());
  const dragAndDropContext = useDragAndDropContext();
  
  const [predictionTileMap, setPredictionTileMap] = useState<number[][]>(Array.from({ length: puzzleSync.length }, () =>
    Array.from({ length: puzzleSync[0].length }, () => (15))
  ));

  const [currentPredictionMap, setCurrentPredictionMap] = useState<number[][]>(Array.from({ length: puzzleSync.length }, () =>
    Array.from({ length: puzzleSync[0].length }, () => (-1))
  ));

  const colorMap = useMemo(() => {
    const out: HighlightColor[][] = []
    for (let y = 0; y < puzzleSync.length; y++) {
      const row: HighlightColor[] = [];
      for (let x = 0; x < puzzleSync[0].length; x++) {
        row.push(getColor(predictionTileMap[x][y], puzzleSync[x][y]));
      }

      out.push(row);
    }

    return out;
  }, [predictionTileMap, puzzleSync]);
  
  const [hoveredTile, setHoveredTile] = useState<TileCoordinates | null>(null);

  const hoveredPlacement: FurniturePlacement | null = useMemo(() => {
    if (hoveredTile && dragAndDropContext.draggedFurniture) {
      const placement = getPlacementFromOrientation(hoveredTile, dragAndDropContext.draggedFurniture)
      if (isValidPlacement(placement, currentPredictionMap)) {
        return placement;
      }
    }

    return null;
  }, [dragAndDropContext.draggedFurniture, hoveredTile, currentPredictionMap]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onExit = () => {
      setHoveredTile(null);
    };

    el.addEventListener("pointerleave", onExit);

    return () => {
      el.removeEventListener("pointerleave", onExit);
    };
  }, []);
  
  return (
    <GameboardContext.Provider value={{ hoveredTile, setHoveredTile }}>
      <div
        ref={ref}
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
              color={getColor(predictionTileMap[x][y], solution)}
              solution={solution}
              dragHovered={hoveredPlacement ? isTileInPlacement({ x, y }, hoveredPlacement) : false}
            />
          ))
        ))}
      </div>
      {DEBUG && <Gameboard.Debug puzzle={puzzle} />}
    </GameboardContext.Provider>
  )
}

Gameboard.Tile = GameboardTile;
Gameboard.Debug = GameboardDebug;