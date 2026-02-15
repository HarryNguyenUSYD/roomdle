"use client";

import { useGameboardContext } from "./gameboard.context";
import { GameboardTileState } from "./gameboard.types";
import Image from "next/image";
import { getHighContrastIcon, getHighlightWithColor } from "./gameboard.utils";
import { useMemo, useRef } from "react";
import { useDebugStore } from "@/store/useDebugStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useDragAndDropStore } from "@/store/useDragAndDropStore";

export default function GameboardTile({ x, y, neighbors, color, solution, predictionId, dragHovered }: GameboardTileState) {
  const gameboardContext = useGameboardContext();

  const {
    isDebugging,
    isShowingCoordinates,
    isShowingSolution,
    isShowingPrediction
  } = useDebugStore();

  const {
    isDragging
  } = useDragAndDropStore();

  const highContrast = useSettingsStore((s) => s.highContrast);

  const ref = useRef<HTMLDivElement>(null);
  
  const highlightImage = useMemo(() => (getHighlightWithColor(color, neighbors)), [color, neighbors]);
  const highContrastIcon = useMemo(() => (getHighContrastIcon(color)), [color]);

  if (!gameboardContext) { return null; }
  
  return (
    <div
      className={`relative w-full h-full duration-100 select-none
        ${dragHovered ? "brightness-500" : (!isDragging && "hover:brightness-150")}`}
      ref={ref}
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
        {highContrast && <Image
          src={`/roomdle-highlight/roomdle-highlight${highContrastIcon}.png`}
          width={25}
          height={25}
          className={`absolute w-full h-full pixel-art`}
          alt="Gameboard High Contrast Icon"
          draggable={false}
        />}
        {
          isDebugging &&
          isShowingCoordinates &&
          <p className="text-xl text-black text-center z-10">{`(${x}, ${y})`}</p>
        }
        {
          isDebugging &&
          isShowingSolution &&
          <p className="text-xl text-black text-center z-10">{`(${solution})`}</p>
        }
        {
          isDebugging &&
          isShowingPrediction &&
          <p className="text-xl text-black text-center z-10">{`(${predictionId})`}</p>
        }
      </div>
    </div>
  )
}