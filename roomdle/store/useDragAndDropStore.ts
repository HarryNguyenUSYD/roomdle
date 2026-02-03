import { FurnitureOrientation } from "@/game/game.types";
import { create } from "zustand";

type DragAndDropStore = {
  isDragging: boolean,
  draggingFurniture: FurnitureOrientation | null,

  setIsDragging: (val: boolean) => void,
  setDraggingFurniture: (orientation: FurnitureOrientation | null) => void,
};

export const useDragAndDropStore = create<DragAndDropStore>((set) => ({
  isDragging: false,
  draggingFurniture: null,
  placedFurnitures: [],
  
  setIsDragging: (val) => set({ isDragging: val }),
  setDraggingFurniture: (orientation) => set({ draggingFurniture: orientation })
}));