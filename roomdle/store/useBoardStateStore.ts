import { FURNITURE_ORIENTATIONS, GAMEBOARD_HEIGHT, GAMEBOARD_WIDTH } from "@/game/game.consts";
import { HighlightColor } from "@/game/game.types";
import { getColor, getPriorityColor } from "@/game/game.utils";
import { create } from "zustand";

type BoardStateStore = {
  tileColorMap: HighlightColor[][],
  placementMap: number[][],
  furnitureColorMap: HighlightColor[],

  updateTileColorMap: (prediction: number[][], solution: number[][]) => void,
  resetPlacementMap: () => void,
  updatePlacementMap: (placement: number[][]) => void
  updateFurnitureColorMap: (prediction: number[], solution: number[]) => void
};

export const useBoardStateStore = create<BoardStateStore>((set) => ({
  tileColorMap: Array.from({ length: GAMEBOARD_HEIGHT }, () =>
    Array.from({ length: GAMEBOARD_WIDTH }, () => ("gray"))
  ),
  placementMap: Array.from({ length: GAMEBOARD_HEIGHT }, () =>
    Array.from({ length: GAMEBOARD_WIDTH }, () => (-1))
  ),
  furnitureColorMap: Array.from({ length: FURNITURE_ORIENTATIONS.length }, () => "gray"),

  updateTileColorMap: (prediction, solution) =>
    set((state) => ({
      tileColorMap: state.tileColorMap.map((row, x) =>
        row.map((oldColor, y) => {
          const newColor = getColor(prediction[x][y], solution[x][y]);
          return getPriorityColor(oldColor, newColor);
        })
      ),
    })),
  resetPlacementMap: () =>
    set({ placementMap: Array.from({ length: GAMEBOARD_HEIGHT }, () =>
        Array.from({ length: GAMEBOARD_WIDTH }, () => (-1))
    )}),
  updatePlacementMap: (placement) =>
    set({ placementMap: placement }),
  updateFurnitureColorMap: (prediction, solution) =>
    set((state) => ({
      furnitureColorMap: state.furnitureColorMap.map((oldColor, i) => {
        const newColor = getColor(prediction[i], solution[i]);
        return getPriorityColor(oldColor, newColor);
      }),
    })),
}));