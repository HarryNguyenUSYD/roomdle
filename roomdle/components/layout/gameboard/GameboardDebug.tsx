"use client";

import { useGameboardContext } from "./gameboard.context";
import Menu from "@/components/ui/menu/Menu";
import MenuButton from "@/components/ui/menu/MenuButton";
import useMenu from "@/hooks/useMenu";
import { useDebugContext } from "@/contexts/DebugContext";
import { Puzzle } from "@/game/Puzzle";
import { useEffect } from "react";

type GameboardDebugProps = { puzzle: Puzzle }

export default function GameboardDebug({ puzzle }: GameboardDebugProps) {
  const gameboardContext = useGameboardContext();
  const debugContext = useDebugContext();
  
  const { isActive, handleSetInactive, handleSetActive } = useMenu();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      e.preventDefault();
      if (debugContext.settings.isDebugging && e.key === " ") {
        puzzle.generateRandomPuzzle();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [debugContext.settings.isDebugging, puzzle]);

  if (!gameboardContext || !debugContext) { return null; }

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
              onClick={() => debugContext.setSettings(prev => ({
                ...prev,
                isDebugging: !debugContext.settings.isDebugging
              }))}
            >
              {debugContext.settings.isDebugging ? "ON" : "OFF"}
            </button>
          </div>
          <div className="w-[50%] border border-white"></div>
          <div className="w-full flex flex-row justify-between items-center">
            <p className="text-md lg:text-2xl">Show Coordinates:</p>
            <button
              className="text-md lg:text-2xl cursor-pointer hover:brightness-75"
              onClick={() => debugContext.setSettings(prev => ({
                ...prev,
                isShowingCoordinates: !debugContext.settings.isShowingCoordinates
              }))}
            >
              {debugContext.settings.isShowingCoordinates ? "ON" : "OFF"}
            </button>
          </div>
          <div className="w-full flex flex-row justify-between items-center">
            <p className="text-md lg:text-2xl">Show Solution:</p>
            <button
              className="text-md lg:text-2xl cursor-pointer hover:brightness-75"
              onClick={() => debugContext.setSettings(prev => ({
                ...prev,
                isShowingSolution: !debugContext.settings.isShowingSolution
              }))}
            >
              {debugContext.settings.isShowingSolution ? "ON" : "OFF"}
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