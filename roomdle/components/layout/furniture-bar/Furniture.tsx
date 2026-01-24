"use client";

import { FURNITURE_SPRITE_DIR, PIXELS_PER_UNIT } from "@/game/game.consts";
import { FurnitureOrientation, HighlightColor } from "@/game/game.types";
import Image from "next/image";
import { getFurnitureSprite } from "./furniture.utils";
import { motion, useAnimation, useMotionValueEvent } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useFurnitureContext } from "./furniture.context";

type FurnitureProps = {
  orientation: FurnitureOrientation,
  color: HighlightColor
}

type Point = { x: number; y: number }
type Size = { width: number, height: number }

export default function Furniture({ orientation, color } : FurnitureProps) {
  const furnitureContext = useFurnitureContext();
  
  const [dragging, setDragging] = useState(false);
  const [point, setPoint] = useState<Point | null>(null);
  const [homePoint, setHomePoint] = useState<Point | null>(null);
  const [renderedSize, setRenderedSize] = useState<Size | null>(null);

  const ref = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();

  useMotionValueEvent(furnitureContext.scrollY, "change", () => {
    const rect = ref.current?.getBoundingClientRect();

    if (rect) {
      setHomePoint({
        x: rect.left,
        y: rect.top,
      });
    }
  });

  useEffect(() => {
    const rect = ref.current?.getBoundingClientRect();

    if (rect) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHomePoint({
        x: rect.left,
        y: rect.top,
      });
    }
  }, [furnitureContext.scrollY]);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(entries => {
      const rect = entries[0].contentRect;

      setRenderedSize({
        width: rect.width,
        height: rect.height,
      });
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  if (!furnitureContext) { return null; }

  return (
    <>
      <motion.div
        className="relative w-auto h-auto hover:brightness-125 duration-100 flex-none
          cursor-grab select-none"
        style={{
          gridColumn: `span ${orientation.width}`,
          gridRow: `span ${orientation.height}`
        }}
        ref={ref}
        drag
        dragMomentum={false}
        animate={controls}
        onDragStart={() => {
          setDragging(true);
          controls.start({
            opacity: 0,
            transition: { duration: 0 }
          });
        }}
        onDrag={(_, info) => {
          setPoint(info.point)
        }}
        onDragEnd={() => {
          setDragging(false);
          controls.start({
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
              x: { duration: 0 },
              y: { duration: 0 },
              opacity: { delay: 0.25, duration: 0.25, ease: "linear" }
            }
          });
        }}
      >
        <Image
          src={FURNITURE_SPRITE_DIR + getFurnitureSprite(orientation, color)}
          width={orientation.width * PIXELS_PER_UNIT}
          height={orientation.height * PIXELS_PER_UNIT}
          alt={`Furniture with ID ${orientation.id}, positions ${orientation.positions}`}
          className="w-full h-full object-contain pixel-art"
          draggable={false}
        />
      </motion.div>
      {(point && renderedSize) && createPortal(
        <motion.div
          className="fixed z-9999 pointer-events-none"
          style={{
            // center under pointer (change if you want top-left anchoring)
            width: renderedSize.width,
            height: renderedSize.height,
          }}
          animate={dragging ? "onDrag" : "onDragEnd"}
          variants={{
            onDrag: {
              left: Math.round(point.x) - renderedSize.width / 4,
              top: Math.round(point.y) - renderedSize.height / 4,
              opacity: 1,
              transition: { duration: 0 }
            },
            onDragEnd: {
              left: homePoint?.x,
              top: homePoint?.y,
              opacity: 0,
              transition: {
                left: { duration: 0.5, ease: "easeOut"},
                top: { duration: 0.5, ease: "easeOut"},
                opacity: { delay: 0.25, duration: 0.25, ease: "linear" }
              }
            }
          }}
        >
          <Image
            src={FURNITURE_SPRITE_DIR + getFurnitureSprite(orientation, color)}
            width={orientation.width * PIXELS_PER_UNIT}
            height={orientation.height * PIXELS_PER_UNIT}
            alt={`Furniture with ID ${orientation.id}, positions ${orientation.positions}`}
            className="w-full h-full object-contain pixel-art"
            draggable={false}
          />
        </motion.div>,
        document.body
      )}
    </>
  )
}