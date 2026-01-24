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