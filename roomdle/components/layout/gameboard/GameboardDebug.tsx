"use client";

import { useGameboardContext } from "./gameboard.context";
import Menu from "@/components/ui/menu/Menu";
import MenuButton from "@/components/ui/menu/MenuButton";
import useMenu from "@/hooks/useMenu";
import { Puzzle } from "@/game/Puzzle";
import { useEffect } from "react";
import { useDebugStore } from "@/store/useDebugStore";

type GameboardDebugProps = { puzzle: Puzzle }

export default function GameboardDebug({ puzzle }: GameboardDebugProps) {
  const gameboardContext = useGameboardContext();

  const {
    isDebugging,
    isShowingCoordinates,
    isShowingSolution,
    
    setIsDebugging,
    setIsShowingCoordinates,
    setIsShowingSolution
  } = useDebugStore();  

  const { isActive, handleSetInactive, handleSetActive } = useMenu();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      e.preventDefault();
      if (isDebugging && e.key === " ") {
        puzzle.generateRandomPuzzle();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isDebugging, puzzle]);

  if (!gameboardContext) { return null; }

  return (
    <>
      {isActive && (
        <Menu handleSetInactive={handleSetInactive}>
          <p className="text-md lg:text-2xl">Debug Menu</p>
          <div className="w-[80%] border border-white"></div>
          <div className="w-full flex flex-row justify-between items-center">
            <p className="text-md lg:text-2xl">Debug Enabled:</p>
            <button
              className="text-md lg:text-2xl cursor-pointer hover:brightness-75"
              onClick={() => setIsDebugging(!isDebugging)}
            >
              {isDebugging ? "ON" : "OFF"}
            </button>
          </div>
          <div className="w-[50%] border border-white"></div>
          <div className="w-full flex flex-row justify-between items-center">
            <p className="text-md lg:text-2xl">Show Coordinates:</p>
            <button
              className="text-md lg:text-2xl cursor-pointer hover:brightness-75"
              onClick={() => setIsShowingCoordinates(!isShowingCoordinates)}
            >
              {isShowingCoordinates ? "ON" : "OFF"}
            </button>
          </div>
          <div className="w-full flex flex-row justify-between items-center">
            <p className="text-md lg:text-2xl">Show Solution:</p>
            <button
              className="text-md lg:text-2xl cursor-pointer hover:brightness-75"
              onClick={() => setIsShowingSolution(!isShowingSolution)}
            >
              {isShowingSolution ? "ON" : "OFF"}
            </button>
          </div>
          <button
            className="w-auto h-auto px-5 py-2 text-md lg:text-2xl border border-white cursor-pointer"
            onClick={() => puzzle.generateRandomPuzzle()}
          >
            Generate random puzzle
          </button>
        </Menu>
      )}
      <div className="fixed top-10 right-10">
        <MenuButton onClick={handleSetActive}>
          <p className="text-md lg:text-2xl">Debug</p>
        </MenuButton>
      </div>
    </>
  )
}