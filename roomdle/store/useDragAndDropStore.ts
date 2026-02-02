import { FurnitureOrientation } from "@/game/game.types";
import { create } from "zustand";

type DragAndDropStore = {
  boardRect: DOMRect | null,
  draggingFurniture: FurnitureOrientation | null,
  placedFurnitures: number[],

  setBoardRect: (rect: DOMRect) => void,
  setDraggingFurniture: (orientation: FurnitureOrientation | null) => void,
  resetPlacedFurnitures: () => void,
  addPlacedFurniture: (id: number) => void,
  removePlacedFurniture: (id: number) => void
};

export const useDragAndDropStore = create<DragAndDropStore>((set) => ({
  boardRect: null,
  draggingFurniture: null,
  placedFurnitures: [],
  
  setBoardRect: (rect) => set({ boardRect: rect }),
  setDraggingFurniture: (orientation) => set({ draggingFurniture: orientation }),
  resetPlacedFurnitures: () => set({ placedFurnitures: [] }),
  addPlacedFurniture: (id) => set((state) => ({ placedFurnitures: [ ...state.placedFurnitures, id ] })),
  removePlacedFurniture: (id) =>
    set((state) => ({
      placedFurnitures: state.placedFurnitures.filter((item) => item !== id),
    })),
}));