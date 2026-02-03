import { FurnitureOrientation, HighlightColor } from "@/game/game.types";

export function getFurnitureSprite(orientation: FurnitureOrientation, color: HighlightColor) {
  switch (color) {
    case "gray":
      return orientation.sprites.graySrc;
    case "green":
      return orientation.sprites.greenSrc;
    case "yellow":
      return orientation.sprites.yellowSrc;
    default:
      return orientation.sprites.graySrc;
  }
}

export function isInRect(x: number, y: number, top: number, left: number, width: number, height: number, offset?: number) {
  return (
    x >= left - (offset ?? 0) &&
    x <= left + width + (offset ?? 0) &&
    y >= top - (offset ?? 0) &&
    y <= top + height + (offset ?? 0)
  )
}