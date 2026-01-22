"use client";

import { FURNITURE_SPRITE_DIR, PIXELS_PER_UNIT } from "@/game/game.consts";
import { FurnitureOrientation, HighlightColor } from "@/game/game.types";
import Image from "next/image";
import { useMemo } from "react";

type FurnitureProps = {
  orientation: FurnitureOrientation,
  color: HighlightColor
}

export default function Furniture({ orientation, color } : FurnitureProps) {
  const sprite = useMemo(() => {
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
  }, [color, orientation.sprites.graySrc, orientation.sprites.greenSrc, orientation.sprites.yellowSrc]);

  return (
    <div
      className="w-auto h-auto hover:brightness-125 duration-100 cursor-pointer flex-none"
      style={{
        gridColumn: `span ${orientation.width}`,
        gridRow: `span ${orientation.height}`
      }}
    >
      <Image
        src={FURNITURE_SPRITE_DIR + sprite}
        width={orientation.width * PIXELS_PER_UNIT}
        height={orientation.height * PIXELS_PER_UNIT}
        alt={`Furniture with ID ${orientation.id}, positions ${orientation.positions}`}
        className="w-full h-full object-contain pixel-art"
      />
    </div>
  )
}