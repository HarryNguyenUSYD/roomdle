import { FurnitureOrientation, HighlightColor, TileCoordinates } from "@/game/game.types";
import { EMPTY_TILE, HIGHLIGHT_ORITENTATIONS, SPECIAL_OFFSET, YELLOW_OFFSET } from "./gameboard.highlight";
import { GAMEBOARD_HEIGHT, GAMEBOARD_WIDTH } from "@/game/game.consts";
import { GameboardTileHighlight } from "./gameboard.types";

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

/**
 * Return the list of coordinates taken by a furniture piece placed at `pos`. The coordinates may or may not be valid,
 * and should be checked first with `isValidPlacement()`
 * @param pos The position to place
 * @param orientation the orientation of the piece
 */
export function getPlacementFromOrientation(pos: TileCoordinates, orientation: FurnitureOrientation): TileCoordinates[] {
  const out = [];
  for (let i = 0; i < orientation.positions.length; i++) {
    const offset = orientation.positions[i];
    out.push({
      x: pos.x + offset[0],
      y: pos.y + offset[1]
    });
  }

  return out;
}

/**
 * Returns `true` if `placement` is valid. Otherwise, return `false`.
 * @param placement the furniture piece placement
 * @param map the map
 * @returns 
 */
export function isValidPlacement(placement: TileCoordinates[], map: number[][]) {
  let out = true;

  for (let i = 0; i < placement.length; i++) {
    const tile = placement[i];
    if (
      tile.x < 0 ||
      tile.x >= map[0].length ||
      tile.y < 0 ||
      tile.y >= map.length ||
      map[tile.x][tile.y] !== -1
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
export function isTileInPlacement(tile: TileCoordinates, placement: TileCoordinates[]) {
  return Boolean(placement.find((pTile) => (pTile.x === tile.x && pTile.y === tile.y)));
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

export function getHighlightFromNeighbors(neighbors: number): GameboardTileHighlight {
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

export function getHighlightWithColor(color: HighlightColor, neighbors: number): GameboardTileHighlight | null {
  if (color === "black" || color === "gray") {
    return null;
  }
  
  const highlight = getHighlightFromNeighbors(neighbors);
  if (highlight.index >= SPECIAL_OFFSET || color === "green") {
    return { index: highlight.index, rotation: highlight.rotation };
  } else if (color === "yellow") {
    return { index: highlight.index + YELLOW_OFFSET, rotation: highlight.rotation }
  } else {
    return null;
  }
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

export function getTileFromPointer(event: PointerEvent, rect: DOMRect): TileCoordinates | null {
  if (
    event.clientX - rect.left < 0 ||
    event.clientX - rect.left > rect.width ||
    event.clientY - rect.top < 0 ||
    event.clientY - rect.top > rect.height
  ) { return null; }

  const x = Math.floor((event.clientX - rect.left) / (rect.width / GAMEBOARD_WIDTH));
  const y = Math.floor((event.clientY - rect.top) / (rect.height / GAMEBOARD_HEIGHT));
  
  return { x, y }
}