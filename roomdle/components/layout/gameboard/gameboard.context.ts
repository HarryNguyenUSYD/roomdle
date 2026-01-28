"use client";

import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { TileCoordinates } from "./gameboard.types";

type GameboardContextType = {
  hoveredTile: TileCoordinates | null,
  setHoveredTile: Dispatch<SetStateAction<TileCoordinates | null>>
}

export const GameboardContext = createContext<GameboardContextType | null>(null);

export function useGameboardContext() {
  const ctx = useContext(GameboardContext);

  if (ctx === null) {
    throw new Error("Gameboard.Element must be used inside <Gameboard>");
  }

  return ctx;
}