"use client";

import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type Settings = {
  highContrast: boolean
}

export type SettingsContextValue = {
  settings: Settings,
  setSettings: Dispatch<SetStateAction<Settings>>
};

export const SettingsContext = createContext<SettingsContextValue | null>(null);

export function useSettingsContext() {
  const ctx = useContext(SettingsContext);

  if (ctx === null) {
    throw new Error("Invalid useSettingsContext call.");
  }

  return ctx;
}