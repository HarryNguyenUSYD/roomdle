import { FURNITURE_ORIENTATIONS, GAMEBOARD_HEIGHT, GAMEBOARD_WIDTH } from "@/game/game.consts";
import { FurniturePlacement, HighlightColor, TileCoordinates } from "@/game/game.types";
import { getColor, getPriorityColor } from "@/game/game.utils";
import { create } from "zustand";

type GameStateStore = {
  tileColorMap: HighlightColor[][],
  furnitureColorMap: HighlightColor[],

  furnitureTileMap: number[][],
  furniturePlacementMap: FurniturePlacement[],

  updateTileColorMap: (solution: number[][]) => void,
  updateFurnitureColorMap: (prediction: number[], solution: number[]) => void,

  addFurniture: (placement: FurniturePlacement, tiles: TileCoordinates[]) => void,
  removeFurniture: (id: number) => void,
  clearFurniture: () => void,
};

export const useGameStateStore = create<GameStateStore>((set) => ({
  tileColorMap: Array.from({ length: GAMEBOARD_HEIGHT }, () =>
    Array.from({ length: GAMEBOARD_WIDTH }, () => ("gray"))
  ),
  furnitureColorMap: Array.from({ length: FURNITURE_ORIENTATIONS.length }, () => "gray"),

  furnitureTileMap: Array.from({ length: GAMEBOARD_HEIGHT }, () =>
    Array.from({ length: GAMEBOARD_WIDTH }, () => (-1))
  ),
  furniturePlacementMap: [],

  updateTileColorMap: (solution) =>
    set((state) => ({
      tileColorMap: state.tileColorMap.map((row, y) =>
        row.map((oldColor, x) => {
          const newColor = getColor(state.furnitureTileMap[y][x], solution[y][x]);
          return getPriorityColor(oldColor, newColor);
        })
      ),
    })),
  updateFurnitureColorMap: (prediction, solution) =>
    set((state) => ({
      furnitureColorMap: state.furnitureColorMap.map((oldColor, i) => {
        const newColor = getColor(prediction[i], solution[i]);
        return getPriorityColor(oldColor, newColor);
      }),
    })),

  addFurniture: (placement, tiles) =>
    set((state) => {
      const newTileMap = state.furnitureTileMap.map(row => [...row]);

      for (const { x, y } of tiles) {
        newTileMap[y][x] = placement.id;
      }

      return ({
        furniturePlacementMap: [...state.furniturePlacementMap, placement],
        furnitureTileMap: newTileMap
      })
    }),
  removeFurniture: (id) =>
    set((state) => {
      const newTileMap = state.furnitureTileMap.map(row => (
        row.map((val) => (val === id ? -1 : val))
      ));

      return ({
        furniturePlacementMap: state.furniturePlacementMap.filter((p) => (p.id !== id)),
        furnitureTileMap: newTileMap
      })
    }),
  clearFurniture: () =>
    set({
      furniturePlacementMap: [],
      furnitureTileMap: Array.from({ length: GAMEBOARD_HEIGHT }, () =>
        Array.from({ length: GAMEBOARD_WIDTH }, () => (-1))
      ),
    })
}));