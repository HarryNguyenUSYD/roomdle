import { HighlightColor } from "@/game/game.types"

export type GameboardTileState = {
  x: number,
  y: number,
  color: HighlightColor,
  neighbors: number,
  solution: number,
  predictionId: number,
  dragHovered: boolean
}

export type GameboardTileHighlight = {
  index: number,
  rotation: "0" | "90" | "180" | "270"
}