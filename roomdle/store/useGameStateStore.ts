import { FURNITURE_ORIENTATIONS, GAMEBOARD_HEIGHT, GAMEBOARD_WIDTH, NUM_PIECES_PER_PUZZLE } from "@/game/game.consts";
import { FurniturePlacement, HighlightColor, TileCoordinates } from "@/game/game.types";
import { compareTileCoordinates, getColor, getPriorityColor } from "@/game/game.utils";
import { create } from "zustand";

type GameStateStore = {
  boardSolution: number[][],
  furnitureSolution: FurniturePlacement[],

  tileColorMap: HighlightColor[][],
  furnitureColorMap: HighlightColor[],

  furnitureTileMap: number[][],
  furniturePlacementMap: FurniturePlacement[],
  
  setPuzzle: (board: number[][], furniture: FurniturePlacement[]) => void,

  updateTileColorMap: () => void,
  updateFurnitureColorMap: () => void,

  addFurniture: (placement: FurniturePlacement, tiles: TileCoordinates[]) => void,
  removeFurniture: (id: number) => void,
  clearFurniture: () => void,
  clearIncorrectFurniture: () => void,

  fullReset: () => void
};

export const useGameStateStore = create<GameStateStore>((set) => ({
  boardSolution: Array.from({ length: GAMEBOARD_HEIGHT }, () =>
    Array.from({ length: GAMEBOARD_WIDTH }, () => (-1))
  ),
  furnitureSolution: Array.from({ length: NUM_PIECES_PER_PUZZLE }, () => ({
    id: -1,
    origin: { x: 0, y: 0 }
  })),

  tileColorMap: Array.from({ length: GAMEBOARD_HEIGHT }, () =>
    Array.from({ length: GAMEBOARD_WIDTH }, () => ("gray"))
  ),
  furnitureColorMap: Array.from({ length: FURNITURE_ORIENTATIONS.length }, () => "gray"),

  furnitureTileMap: Array.from({ length: GAMEBOARD_HEIGHT }, () =>
    Array.from({ length: GAMEBOARD_WIDTH }, () => (-1))
  ),
  furniturePlacementMap: [],

  setPuzzle: (board, furniture) =>
    set({
      boardSolution: board,
      furnitureSolution: furniture
    }),

  updateTileColorMap: () =>
    set((state) => ({
      tileColorMap: state.tileColorMap.map((row, y) =>
        row.map((oldColor, x) => {
          const newColor = getColor(state.furnitureTileMap[y][x], state.boardSolution[y][x]);
          return getPriorityColor(oldColor, newColor);
        })
      ),
    })),
  updateFurnitureColorMap: () =>
    set((state) => {
      const newColor: HighlightColor[] = Array.from({ length: FURNITURE_ORIENTATIONS.length }, () => "gray");

      state.furniturePlacementMap.forEach((f) => {
        const matchingSolutionPiece = state.furnitureSolution.find((s) => (s.id === f.id));
        if (matchingSolutionPiece) {
          if (compareTileCoordinates(matchingSolutionPiece.origin, f.origin)) {
            newColor[f.id - 1] = "green";
          } else {
            newColor[f.id - 1] = "yellow";
          }
        } else {
          newColor[f.id - 1] = "black";
        }
      });
      
      return {
        furnitureColorMap: state.furnitureColorMap.map((oldColor, i) =>
          getPriorityColor(oldColor, newColor[i])
        ),
      }
    }),

  addFurniture: (placement, tiles) =>
    set((state) => {
      if (
        // If there is already a maximum number of placed pieces
        state.furniturePlacementMap.length === NUM_PIECES_PER_PUZZLE ||
        // If the piece is already placed
        state.furniturePlacementMap.find((furniture) => (furniture.id === placement.id))
      ) { return state; }

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
    }),
  clearIncorrectFurniture: () =>
    set((state) => {
      const newPlacementMap = state.furniturePlacementMap.filter((f) => (state.furnitureColorMap[f.id - 1] === "green"));
      
      const newTileMap = state.furnitureTileMap.map((row) => (
        row.map((tile) => (newPlacementMap.find((t) => (t.id === tile)) ? tile : -1))
      ));

      return {
        furniturePlacementMap: newPlacementMap,
        furnitureTileMap: newTileMap
      }
    }),

  fullReset: () =>
    set({
      tileColorMap: Array.from({ length: GAMEBOARD_HEIGHT }, () =>
        Array.from({ length: GAMEBOARD_WIDTH }, () => ("gray"))
      ),
      furnitureColorMap: Array.from({ length: FURNITURE_ORIENTATIONS.length }, () => "gray"),

      furnitureTileMap: Array.from({ length: GAMEBOARD_HEIGHT }, () =>
        Array.from({ length: GAMEBOARD_WIDTH }, () => (-1))
      ),
      furniturePlacementMap: [],
    }),
}));