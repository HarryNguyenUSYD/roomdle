"use client";

import { useGameboardContext } from "./gameboard.context";
import { useDebugContext } from "@/contexts/DebugContext";
import { GameboardTileState } from "./gameboard.types";
import Image from "next/image";
import { compareTileCoordinates, getHighContrastIcon, getHighlightImage } from "./gameboard.utils";
import { useEffect, useMemo, useRef } from "react";
import { SPECIAL_OFFSET, YELLOW_OFFSET } from "./gameboard.highlight";
import { useSettingsContext } from "@/contexts/SettingsContext";
import { useDragAndDropContext } from "@/contexts/DragAndDropContext";

export default function GameboardTile({ x, y, neighbors, color, solution, dragHovered }: GameboardTileState) {
  const gameboardContext = useGameboardContext();
  const dragAndDropContext = useDragAndDropContext();
  const debugContext = useDebugContext();
  const settingsContext = useSettingsContext();

  const ref = useRef<HTMLDivElement | null>(null);
  
  const highlightImage = useMemo(() => {
    if (color === "black" || color === "gray") {
      return null;
    }
    
    const highlight = getHighlightImage(neighbors);
    if (highlight.index >= SPECIAL_OFFSET) {
      return { index: highlight.index, rotation: highlight.rotation };
    } else if (color === "green") {
      return { index: highlight.index, rotation: highlight.rotation };
    } else if (color === "yellow") {
      return { index: highlight.index + YELLOW_OFFSET, rotation: highlight.rotation }
    }
  }, [color, neighbors]);

  const highContrastIcon = useMemo(() => (getHighContrastIcon(color)), [color]);

  useEffect(() => {
    const el = ref.current;
    const handleSet = gameboardContext.setHoveredTile;
    if (!el || !handleSet) return;

    const onEnter = () => {
      if (dragAndDropContext.draggedFurniture) {
        handleSet({ x, y });
      }
    };

    el.addEventListener("pointerenter", onEnter);

    return () => {
      el.removeEventListener("pointerenter", onEnter);
    };
  }, [dragAndDropContext.draggedFurniture, gameboardContext.setHoveredTile, x, y]);

  if (!gameboardContext || !debugContext || !settingsContext) { return null; }
  
  return (
    <div
      className="relative w-full h-full hover:brightness-150 duration-100 select-none"
      ref={ref}
      style={{
        border: dragHovered ? "2px solid white" : "none"
      }}
    >
      <div
        className={`w-full h-full flex flex-col justify-center items-center`}>
        <Image
          src={`/roomdle-grid/roomdle-grid${((x + y) % 2) + 1}.png`}
          width={25}
          height={25}
          className={`absolute w-full h-full ${(color === "black") && "brightness-50"} pixel-art`}
          alt="Gameboard Tile"
        />
        {highlightImage && <Image
          src={`/roomdle-highlight/roomdle-highlight${highlightImage.index}.png`}
          style={{ rotate: highlightImage.rotation + "deg"}}
          width={25}
          height={25}
          className={`absolute w-full h-full pixel-art`}
          alt="Gameboard Highlight Tile"
          draggable={false}
        />}
        {settingsContext.settings.highContrast && <Image
          src={`/roomdle-highlight/roomdle-highlight${highContrastIcon}.png`}
          width={25}
          height={25}
          className={`absolute w-full h-full pixel-art`}
          alt="Gameboard High Contrast Icon"
          draggable={false}
        />}
        {
          debugContext.settings.isDebugging &&
          debugContext.settings.isShowingCoordinates &&
          <p className="text-xl text-black text-center z-10">{`(${x}, ${y})`}</p>
        }
        {
          debugContext.settings.isDebugging &&
          debugContext.settings.isShowingSolution &&
          <p className="text-xl text-black text-center z-10">{`(${solution})`}</p>
        }
      </div>
    </div>
  )
}