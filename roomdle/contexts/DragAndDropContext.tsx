import { FurnitureOrientation } from "@/game/game.types";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

type DragAndDropContextType = {
  draggedFurniture: FurnitureOrientation | null,
  setDraggedFurniture: Dispatch<SetStateAction<FurnitureOrientation | null>>
}

export const DragAndDropContext = createContext<DragAndDropContextType | null>(null);

export function useDragAndDropContext() {
  const ctx = useContext(DragAndDropContext);
  if (!ctx) {
    throw new Error("useDragAndDropContext must be used inside DragAndDropContextProvider");
  }
  return ctx;
}