"use client";

import { FURNITURE_SPRITE_DIR, GAMEBOARD_HEIGHT, GAMEBOARD_WIDTH, PIXELS_PER_UNIT } from "@/game/game.consts";
import { FurnitureOrientation, HighlightColor } from "@/game/game.types";
import Image from "next/image";
import { getFurnitureSprite, isInRect } from "./furniture.utils";
import { motion, useAnimation } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useFurnitureContext } from "./furniture.context";
import { useDragAndDropStore } from "@/store/useDragAndDropStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useBoardRectStore } from "@/store/useBoardRectStore";
import { useGameStateStore } from "@/store/useGameStateStore";

type Point = { x: number; y: number }
type Size = { width: number, height: number }

type FurnitureProps = {
  orientation: FurnitureOrientation,
  color: HighlightColor
}

export default function Furniture({ orientation, color } : FurnitureProps) {
  const furnitureContext = useFurnitureContext();

  const grabAtCenter = useSettingsStore((s) => s.grabAtCenter);
  
  const [localDragging, setLocalDragging] = useState(false);
  const [point, setPoint] = useState<Point | null>(null);

  const {
    setIsDragging,
    setDraggingFurniture
  } = useDragAndDropStore();

  const {
    top,
    left,
    width,
    height
  } = useBoardRectStore();

  const {
    furniturePlacementMap
  } = useGameStateStore();

  // The position the furniture piece return to after being dropped
  const [homePoint, setHomePoint] = useState<Point | null>(null);

  const [renderedSize, setRenderedSize] = useState<Size | null>(null);

  const ref = useRef<HTMLDivElement>(null);
  const mainControls = useAnimation();
  const placedControls = useAnimation();

  /**
   * Initialise the home point
   */
  useEffect(() => {
    const update = () => {
      const rect = ref.current?.getBoundingClientRect();
  
      if (rect) {
        setHomePoint({
          x: rect.left,
          y: rect.top,
        });
      }
    }

    update();

    const unsubscribe = furnitureContext.scrollY.on("change", update);
    window.addEventListener("resize", update);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", update);
    }
  }, [furnitureContext.scrollY]);

  /**
   * Update the furniture ghost piece when the screen gets resized
   */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      setRenderedSize({
        width: rect.width,
        height: rect.height,
      });
    }

    update();

    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  const placement = useMemo(() => furniturePlacementMap.find((f) => (f.id === orientation.id)), [furniturePlacementMap, orientation.id]);

  if (!furnitureContext) { return null; }

  return (
    <>
      <motion.div
        className="relative w-auto h-auto hover:brightness-125 duration-100 flex-none
          cursor-grab select-none"
        style={{
          gridColumn: `span ${orientation.width}`,
          gridRow: `span ${orientation.height}`,
        }}
        ref={ref}
        drag
        dragMomentum={false}
        animate={mainControls}
        onDragStart={() => {
          setLocalDragging(true);
          setIsDragging(true);
          setDraggingFurniture(orientation);
          mainControls.start({
            opacity: 0.25,
            transition: { duration: 0 }
          });
        }}
        onDrag={(_, info) => {
          setPoint(info.point);
          mainControls.start({
            x: 0,
            y: 0,
            transition: { duration: 0 }
          });
        }}
        onDragEnd={() => {
          setLocalDragging(false);
          setIsDragging(false);
          mainControls.start({
            x: 0,
            y: 0,
            opacity: placement ? 0 : 1,
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
      {(point && renderedSize && homePoint) && createPortal(
        <motion.div
          className="fixed z-9999 pointer-events-none"
          style={{
            width: renderedSize.width,
            height: renderedSize.height,
          }}
          animate={localDragging ? "onDrag" : "onDragEnd"}
          variants={{
            onDrag: {
              left: (grabAtCenter ?
                Math.round(point.x) - renderedSize.width / 2 :
                Math.round(point.x) - renderedSize.width / (orientation.width * 2)
              ),
              top: (grabAtCenter ?
                Math.round(point.y) - renderedSize.height / 2 :
                Math.round(point.y) - renderedSize.height / (orientation.height * 2)
              ),
              width: (
                isInRect(
                  Math.round(point.x),
                  Math.round(point.y),
                  top, left, width, height, 50
                ) ? (width / GAMEBOARD_WIDTH) * orientation.width : renderedSize.width
              ),
              height: (
                isInRect(
                  Math.round(point.x),
                  Math.round(point.y),
                  top, left, width, height, 50
                ) ? (height / GAMEBOARD_HEIGHT) * orientation.height : renderedSize.height
              ),
              transition: {
                left: { duration: 0 },
                top: { duration: 0 },
                width: { duration: 0.25 },
                height: { duration: 0.25 },
              }
            },
            onDragEnd: {
              left: placement ? left + (width / GAMEBOARD_WIDTH) * placement.origin.x : homePoint.x,
              top: placement ? top + (height / GAMEBOARD_HEIGHT) * placement.origin.y : homePoint.y,
              width: placement ? (width / GAMEBOARD_WIDTH) * orientation.width : renderedSize.width,
              height: placement ? (height / GAMEBOARD_HEIGHT) * orientation.height : renderedSize.height,
              opacity: 0,
              transition: {
                left: { duration: 0.5, ease: "easeOut"},
                top: { duration: 0.5, ease: "easeOut"},
                opacity: { delay: 0, duration: 0.5, ease: "linear" },
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
      {(placement && homePoint) && createPortal(
        <motion.div
          className="fixed z-9999 hover:brightness-125 duration-100 flex-none cursor-grab select-none"
          style={{
            width: (width / GAMEBOARD_WIDTH) * orientation.width,
            height: (height / GAMEBOARD_HEIGHT) * orientation.height,
            left: left + (width / GAMEBOARD_WIDTH) * placement.origin.x,
            top: top + (height / GAMEBOARD_HEIGHT) * placement.origin.y,
          }}
          drag
          dragMomentum={false}
          animate={placedControls}
          onDragStart={() => {
            setLocalDragging(true);
            setIsDragging(true);
            setDraggingFurniture(orientation);
            // placedControls.start({
            //   opacity: 0.25,
            //   transition: { duration: 0 }
            // });
          }}
          onDrag={(_, info) => {
            setPoint(info.point);
            placedControls.start({
              left: left + (width / GAMEBOARD_WIDTH) * placement.origin.x,
              top: top + (height / GAMEBOARD_HEIGHT) * placement.origin.y,
              transition: { duration: 0 }
            });
          }}
          onDragEnd={() => {
            setLocalDragging(false);
            setIsDragging(false);
            // placedControls.start({
            //   left: homePoint.x,
            //   top: homePoint.y,
            //   opacity: 1,
            //   transition: {
            //     left: { duration: 0.5 },
            //     top: { duration: 0.5 },
            //     opacity: { delay: 0.25, duration: 0.25, ease: "linear" }
            //   }
            // });
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