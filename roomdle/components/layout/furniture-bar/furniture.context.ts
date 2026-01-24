"use client";

import { MotionValue } from "motion";
import { createContext, useContext } from "react";

type FurnitureContextProps = {
  scrollY: MotionValue<number>
}

export const FurnitureContext = createContext<FurnitureContextProps | null>(null);

export function useFurnitureContext() {
  const ctx = useContext(FurnitureContext);

  if (ctx === null) {
    throw new Error("Furniture.Element must be used inside <Furniture>");
  }

  return ctx;
}