"use client";

import { createContext, useContext } from "react";

export const GameboardContext = createContext<boolean | null>(null);

export function useGameboardContext() {
  const ctx = useContext(GameboardContext);

  if (ctx === null) {
    throw new Error("Gameboard.Element must be used inside <Gameboard>");
  }

  return ctx;
}