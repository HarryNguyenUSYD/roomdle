"use client";

import { createContext, useContext } from "react";

export const MenuContext = createContext<boolean | null>(null);

export function useMenuContext() {
  const ctx = useContext(MenuContext);

  if (ctx === null) {
    throw new Error("Menu.Element must be used inside <Menu>");
  }

  return ctx;
}