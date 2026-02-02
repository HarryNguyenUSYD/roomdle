"use client";

import GameboardTile from "./GameboardTile";
import { GameboardContext } from "./gameboard.context";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Puzzle } from "@/game/Puzzle";
import { DEBUG } from "./gameboard.constants";
import GameboardDebug from "./GameboardDebug";
import { compareTileCoordinates, getNeighbors, getPlacementFromOrientation, getTileFromPointer, isTileInPlacement, isValidPlacement } from "./gameboard.utils";
import { FurniturePlacement, TileCoordinates } from "./gameboard.types";
import { useBoardStateStore } from "@/store/useBoardStateStore";
import { useDragAndDropStore } from "@/store/useDragAndDropStore";

export default function Gameboard() {
  const ref = useRef<HTMLDivElement>(null);
  const puzzle = useMemo(() => new Puzzle(), []);
  const puzzleSync = useSyncExternalStore((l) => puzzle.subscribe(l), () => puzzle.getSnapshot(), () => puzzle.getSnapshot());
  
  const tileColorMap = useBoardStateStore((s) => s.tileColorMap);
  const placementMap = useBoardStateStore((s) => s.placementMap);

  const updateTileColorMap = useBoardStateStore((s) => s.updateTileColorMap);

  const draggingFurniture = useDragAndDropStore((s) => (s.draggingFurniture));

  useEffect(() => {
    updateTileColorMap(placementMap, puzzleSync);
  }, [placementMap, puzzleSync, updateTileColorMap]);
  
  // Drag and Drop support
  const hoveredTileRef = useRef<TileCoordinates | null>(null)
  const [hoveredTile, setHoveredTile] = useState<TileCoordinates | null>(null);

  const hoveredPlacement: FurniturePlacement | null = useMemo(() => {
    if (hoveredTile && draggingFurniture) {
      const placement = getPlacementFromOrientation(hoveredTile, draggingFurniture)
      if (isValidPlacement(placement, placementMap)) {
        return placement;
      }
    }

    return null;
  }, [draggingFurniture, hoveredTile, placementMap]);

  useEffect(() => {
    const updateHover = () => {
      if (!draggingFurniture) {
        setHoveredTile(null);
      } else {
        setHoveredTile(prev => (!compareTileCoordinates(prev, hoveredTileRef.current) ? hoveredTileRef.current : prev));
      }
      
      requestAnimationFrame(updateHover);
    }

    requestAnimationFrame(updateHover);
  }, [draggingFurniture]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (draggingFurniture && ref.current) {
        hoveredTileRef.current = getTileFromPointer(e, ref.current.getBoundingClientRect());
      }
    };
        
    window.addEventListener("pointermove", onMove);
    
    return () => {
      window.removeEventListener("pointermove", onMove);
    };
  }, [draggingFurniture]);

  return (
    <GameboardContext.Provider value={true}>
      <div
        ref={ref}
        className={`relative size-[80vw] lg:size-[50vh] flex-none grid touch-none`}
        style={{ gridTemplateColumns: `repeat(${puzzleSync.length}, minmax(0, 1fr))` }}
      >
        {puzzleSync.map((rows, y) => (
          rows.map((solution, x) => (
            <Gameboard.Tile
              key={`gameboard_tile_${x}_${y}`}
              x={x}
              y={y}
              neighbors={getNeighbors(tileColorMap, [x, y])}
              color={tileColorMap[x][y]}
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