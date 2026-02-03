"use client";

import GameboardTile from "./GameboardTile";
import { GameboardContext } from "./gameboard.context";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Puzzle } from "@/game/Puzzle";
import { DEBUG } from "./gameboard.constants";
import GameboardDebug from "./GameboardDebug";
import { compareTileCoordinates, getNeighbors, getPlacementFromOrientation, getTileFromPointer, isTileInPlacement, isValidPlacement } from "./gameboard.utils";
import { useGameStateStore } from "@/store/useGameStateStore";
import { useDragAndDropStore } from "@/store/useDragAndDropStore";
import { useBoardRectStore } from "@/store/useBoardRectStore";
import { TileCoordinates } from "@/game/game.types";

export default function Gameboard() {
  const ref = useRef<HTMLDivElement>(null);
  const puzzle = useMemo(() => new Puzzle(), []);
  const puzzleSync = useSyncExternalStore((l) => puzzle.subscribe(l), () => puzzle.getSnapshot(), () => puzzle.getSnapshot());

  const {
    isDragging,
    draggingFurniture,
  } = useDragAndDropStore();

  const {
    tileColorMap,
    furniturePlacementMap,
    furnitureTileMap,
    updateTileColorMap,
    addFurniture,
    removeFurniture,
  } = useGameStateStore();

  useEffect(() => {
    updateTileColorMap(puzzleSync);
  }, [puzzleSync, updateTileColorMap]);
  
  // Drag and Drop support
  const [originTile, setOriginTiles] = useState<TileCoordinates | null>(null);
  const [hoveredTiles, setHoveredTiles] = useState<TileCoordinates[] | null>(null);

  useEffect(() => {
    if (originTile && draggingFurniture) {
      const placement = getPlacementFromOrientation(originTile, draggingFurniture)
      if (isValidPlacement(placement, furnitureTileMap)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHoveredTiles(placement);
      }
    } else {
      setHoveredTiles(null);
    }
  }, [originTile, draggingFurniture, furnitureTileMap]);

  useEffect(() => {
    if (!isDragging && draggingFurniture && originTile && hoveredTiles) {
      addFurniture({ id: draggingFurniture.id, origin: originTile }, hoveredTiles);
    }
  }, [addFurniture, draggingFurniture, hoveredTiles, isDragging, originTile]);

  /**
   * Updating the hovered tile every animation frame for hovering effect
   */
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      requestAnimationFrame(() => {
        if (!isDragging || !ref.current) {
          setOriginTiles(null);
        } else {
          const tile = getTileFromPointer(e, ref.current.getBoundingClientRect());
          setOriginTiles(prev => (!compareTileCoordinates(prev, tile) ? tile : prev));
        }
      })
    };
        
    window.addEventListener("pointermove", onMove);
    
    return () => {
      window.removeEventListener("pointermove", onMove);
    };
  }, [isDragging]);

  /**
   * Update the rect of the board when the screen gets resized
   */
  const setRect = useBoardRectStore((s) => s.setRect);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        if (rect.width !== 0 || rect.height !== 0) {
          setRect(rect);
        }
      });
    };

    window.addEventListener("resize", update);

    update();
    
    return () => {
      window.removeEventListener("resize", update);
    }
  }, [setRect]);

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
              predictionId={furnitureTileMap[x][y]}
              dragHovered={hoveredTiles ? isTileInPlacement({ x, y }, hoveredTiles) : false}
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