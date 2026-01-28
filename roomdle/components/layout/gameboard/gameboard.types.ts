import { HighlightColor } from "@/game/game.types"

export type GameboardTileState = {
  x: number,
  y: number,
  color: HighlightColor,
  neighbors: number,
  solution: number,
  dragHovered: boolean
}

export type GameboardTileHighlight = {
  index: number,
  rotation: "0" | "90" | "180" | "270"
}

export type TileCoordinates = {
  x: number,
  y: number
}

export type FurniturePlacement = number[][];