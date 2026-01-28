import { FurnitureOrientation, HighlightColor } from "@/game/game.types";
import { EMPTY_TILE, HIGHLIGHT_ORITENTATIONS } from "./gameboard.highlight";
import { FurniturePlacement, GameboardTileHighlight, TileCoordinates } from "./gameboard.types";

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

export function getColor(current: number, solution: number): HighlightColor {
  if (current === -1) {
    return "gray";
  } else if (solution === -1) {
    return "black";
  } else {
    return (current === solution) ? "green" : "yellow";
  }
}

/**
 * Return the list of coordinates taken by a furniture piece placed at `pos`. The coordinates may or may not be valid,
 * and should be checked first with `isValidPlacement()`
 * @param pos The position to place
 * @param orientation the orientation of the piece
 */
export function getPlacementFromOrientation(pos: TileCoordinates, orientation: FurnitureOrientation): FurniturePlacement {
  const out = [];
  for (let i = 0; i < orientation.positions.length; i++) {
    const offset = orientation.positions[i];
    out.push([pos.x + offset[0], pos.y + offset[1]]);
  }

  return out;
}

/**
 * Returns `true` if `placement` is valid. Otherwise, return `false`.
 * @param placement the furniture piece placement
 * @param map the map
 * @returns 
 */
export function isValidPlacement(placement: FurniturePlacement, map: number[][]) {
  let out = true;

  for (let i = 0; i < placement.length; i++) {
    const tile = placement[i];
    if (
      tile[0] < 0 ||
      tile[0] >= map[0].length ||
      tile[1] < 0 ||
      tile[1] >= map.length ||
      map[tile[0]][tile[1]] !== -1
    ) {
      out &&= false;
    }
  }

  return out;
}

/**
 * Returns `true` if a `tile` is in `placement`. Otherwise `false`.
 * @param tile the tile
 * @param placement the placement
 */
export function isTileInPlacement(tile: TileCoordinates, placement: FurniturePlacement) {
  return Boolean(placement.find((pTile) => (pTile[0] === tile.x && pTile[1] === tile.y)));
}

/**
 * Get the color of the neighboring tiles, return as a number.
 * @param map The color map
 * @param pos The coordinates of the tile being checked
 * @returns 0bXXXXYYYY where X are the cardinal values, Y are the diagonal values (1 if same color, 0 if not)
 */
export function getNeighbors(map: HighlightColor[][], pos: number[]) {
  let out = 0;
  for (let i = 0; i < DIRECTIONS.length; i++) {
    const d = DIRECTIONS[i];
    if (
      pos[0] + d[0] >= 0 &&
      pos[0] + d[0] < map[0].length &&
      pos[1] + d[1] >= 0 &&
      pos[1] + d[1] < map.length
    ) {
      if (map[pos[0] + d[0]][pos[1] + d[1]] === map[pos[0]][pos[1]]) {
        out |= (1 << (DIRECTIONS.length - 1 - i));
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
    return { index: EMPTY_TILE, rotation: "0" }
  }
  
  for (const [key, value] of firstOutput) {
    if ((diagonal & Number(key)) === Number(key)) {
      return value;
    }
  }

  return { index: EMPTY_TILE, rotation: "0" }
}

export function getHighContrastIcon(color: HighlightColor): number {
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

export function compareTileCoordinates(c1: TileCoordinates | null, c2: TileCoordinates | null) {
  if (!c1 || !c2) { return false; }
  else return (c1.x === c2.x && c1.y === c2.y);
}