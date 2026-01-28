"use client";

import { FURNITURE_SPRITE_DIR, PIXELS_PER_UNIT } from "@/game/game.consts";
import { FurnitureOrientation, HighlightColor } from "@/game/game.types";
import Image from "next/image";
import { getFurnitureSprite } from "./furniture.utils";
import { motion, useAnimation, useMotionValueEvent } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useFurnitureContext } from "./furniture.context";
import { useSettingsContext } from "@/contexts/SettingsContext";
import { useDragAndDropContext } from "@/contexts/DragAndDropContext";

type Point = { x: number; y: number }
type Size = { width: number, height: number }

type FurnitureProps = {
  orientation: FurnitureOrientation,
  color: HighlightColor
}

export default function Furniture({ orientation, color } : FurnitureProps) {
  const furnitureContext = useFurnitureContext();
  const settingsContext = useSettingsContext();
  const dragAndDropContext = useDragAndDropContext();
  
  const [dragging, setDragging] = useState(false);
  const [point, setPoint] = useState<Point | null>(null);

  // The position the furniture piece return to after being dropped
  const [homePoint, setHomePoint] = useState<Point | null>(null);

  const [renderedSize, setRenderedSize] = useState<Size | null>(null);

  const ref = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();

  /**
   * Update the home point when the FurnitureBar is scrolled
   */
  useMotionValueEvent(furnitureContext.scrollY, "change", () => {
    const rect = ref.current?.getBoundingClientRect();

    if (rect) {
      setHomePoint({
        x: rect.left,
        y: rect.top,
      });
    }
  });

  /**
   * Initialise the home point
   */
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

  /**
   * Update the furniture ghost piece when the screen gets resized
   */
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

  if (!furnitureContext || !dragAndDropContext) { return null; }

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
          dragAndDropContext.setDraggedFurniture(orientation);
          controls.start({
            opacity: 0.25,
            transition: { duration: 0 }
          });
        }}
        onDrag={(_, info) => {
          setPoint(info.point);
          controls.start({
            x: 0,
            y: 0,
            transition: { duration: 0 }
          });
        }}
        onDragEnd={() => {
          setDragging(false);
          dragAndDropContext.setDraggedFurniture(null);
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
            width: renderedSize.width,
            height: renderedSize.height,
          }}
          animate={dragging ? "onDrag" : "onDragEnd"}
          variants={{
            onDrag: {
              left: (settingsContext.settings.grabAtCenter ?
                Math.round(point.x) - renderedSize.width / 2 :
                Math.round(point.x) - renderedSize.width / (orientation.width * 2)
              ),
              top: (settingsContext.settings.grabAtCenter ?
                Math.round(point.y) - renderedSize.height / 2 :
                Math.round(point.y) - renderedSize.height / (orientation.height * 2)
              ),
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