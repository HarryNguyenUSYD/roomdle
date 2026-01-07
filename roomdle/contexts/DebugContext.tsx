"use client";

import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type DebugSettings = {
  isDebugging: boolean,
  isShowingCoordinates: boolean,
  isShowingSolution: boolean
}

export type DebugContextValue = {
  settings: DebugSettings,
  setSettings: Dispatch<SetStateAction<DebugSettings>>
};

export const DebugContext = createContext<DebugContextValue | null>(null);

export function useDebugContext() {
  const ctx = useContext(DebugContext);

  if (ctx === null) {
    throw new Error("Invalid useDebugContext call.");
  }

  return ctx;
}