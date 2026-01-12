import { HIGHLIGHT_ORITENTATIONS } from "./gameboard.highlight";
import { GameboardTileColor, GameboardTileHighlight } from "./gameboard.types";

/**
 * [-1, -1][0, -1][1, -1]
 * [-1,  0][     ][1,  0]
 * [-1,  1][0,  1][1,  1]
 */
export const DIRECTIONS = [
  [0, -1],
  [-1, 0],
  [1,  0],
  [0, 1],
  [-1, -1],
  [1, -1],
  [-1, 1],
  [1, 1]
] as const;

export function getColor(current: number, solution: number): GameboardTileColor {
  if (current === -1) {
    return "gray";
  } else if (solution === -1) {
    return "black";
  } else {
    return (current === solution) ? "green" : "yellow";
  }
}

/**
 * Get the color of the neighboring tiles, return as a number.
 * @param map The color map
 * @param pos The coord of tile being checked
 * @param value The color of that tile
 * @returns 0bXXXXYYYY where X are the cardinal values, Y are the diagonal values (1 if same color, 0 if not)
 */
export function getNeighbors(map: GameboardTileColor[][], pos: number[], value: GameboardTileColor) {
  let out = 0;
  for (let i = 0; i < DIRECTIONS.length; i++) {
    const d = DIRECTIONS[i];
    if (
      pos[0] + d[0] >= 0 &&
      pos[0] + d[0] < map[0].length &&
      pos[1] + d[1] >= 0 &&
      pos[1] + d[1] < map.length
    ) {
      if (map[pos[0] + d[0]][pos[1] + d[1]] === value) {
        out |= (1 << (7 - i));
      }
    }
  }

  return out;
}

export function getHighlightImage(neighbors: number): GameboardTileHighlight {
  const cardinal = (neighbors >> 4) & 0b1111;
  const diagonal = (neighbors >> 0) & 0b1111;

  const firstOutput = HIGHLIGHT_ORITENTATIONS.get(cardinal);
  
  if (!firstOutput) {
    return { index: 30, rotation: "0" }
  }
  
  for (const [key, value] of firstOutput) {
    if ((diagonal & Number(key)) === Number(key)) {
      return value;
    }
  }

  return { index: 30, rotation: "0" }
}

export function getHighContrastIcon(color: GameboardTileColor): number {
  switch (color) {
    case "black":
      return 29;
    case "yellow":
      return 30;
    case "green":
      return 31;
    default:
      return 32;
  }
}