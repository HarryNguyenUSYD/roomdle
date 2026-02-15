"use client";

import { FURNITURE_SPRITE_DIR, GAMEBOARD_HEIGHT, GAMEBOARD_WIDTH, PIXELS_PER_UNIT } from "@/game/game.consts";
import { FurnitureOrientation, HighlightColor } from "@/game/game.types";
import Image from "next/image";
import { getFurnitureSprite, isInRect } from "./furniture.utils";
import { AnimatePresence, motion, useAnimation } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
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
  
  const [point, setPoint] = useState<Point | null>(null);
  const [isLocalDragging, setIsLocalDragging] = useState(false);

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
    furniturePlacementMap,
    removeFurniture
  } = useGameStateStore();

  const [renderedSize, setRenderedSize] = useState<Size | null>(null);

  // The position the furniture piece return to after being dropped
  const [homePoint, setHomePoint] = useState<Point | null>(null);

  const ref = useRef<HTMLDivElement>(null);
  const mainControls = useAnimation();
  const cloneControls = useAnimation();

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
          opacity: placement ? "0.25" : "1",
          pointerEvents: placement ? "none" : "auto"
        }}
        ref={ref}
        drag
        dragMomentum={false}
        animate={mainControls}
        onDragStart={() => {
          setIsLocalDragging(true);
          setIsDragging(true);
          setDraggingFurniture(orientation);
          mainControls.set({
            opacity: 0.25
          });
          removeFurniture(orientation.id);
        }}
        onDrag={(_, info) => {
          setPoint(info.point);
          mainControls.set({
            x: 0,
            y: 0
          });
        }}
        onDragEnd={() => {
          setIsLocalDragging(false);
          setIsDragging(false);
          mainControls.start({
            opacity: placement ? 0.25 : 1,
            transition: {
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
      {(point && renderedSize && homePoint) && (
        <motion.div
          className="fixed z-9999 pointer-events-none"
          style={{
            width: renderedSize.width,
            height: renderedSize.height,
            opacity: 0
          }}
          animate={isLocalDragging ? "onDrag" : (placement ? "onPlace" : "onDragEnd")}
          transition={{ duration: 0 }}
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
              opacity: 1,
              transition: {
                left: { duration: 0 },
                top: { duration: 0 },
                width: { duration: 0.25 },
                height: { duration: 0.25 },
                opacity: { duration: 0 }
              }
            },
            onDragEnd: {
              left: homePoint.x,
              top: homePoint.y,
              width: renderedSize.width,
              height: renderedSize.height,
              opacity: 0,
              transition: { duration: 0.5, ease: "easeOut" }
            },
            onPlace: {
              left: placement && (left + (width / GAMEBOARD_WIDTH) * placement.origin.x),
              top: placement && (top + (height / GAMEBOARD_HEIGHT) * placement.origin.y),
              width: (width / GAMEBOARD_WIDTH) * orientation.width,
              height: (height / GAMEBOARD_HEIGHT) * orientation.height,
              opacity: 0,
              transition: { duration: 0 }
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
        </motion.div>
      )}
      <AnimatePresence>
        {(placement) && (
          <motion.div
            className="fixed z-9998 hover:brightness-125 duration-100 flex-none
              cursor-grab select-none pointer-events-auto"
            style={{
              left: left + (width / GAMEBOARD_WIDTH) * placement.origin.x,
              top: top + (height / GAMEBOARD_HEIGHT) * placement.origin.y,
              width: (width / GAMEBOARD_WIDTH) * orientation.width,
              height: (height / GAMEBOARD_HEIGHT) * orientation.height,
            }}
            animate={cloneControls}
            drag
            dragMomentum={false}
            onDragStart={() => {
              setIsLocalDragging(true);
              setIsDragging(true);
              setDraggingFurniture(orientation);
              cloneControls.start({
                opacity: 0.25,
                transition: { duration: 0 }
              });
              removeFurniture(orientation.id);
            }}
            onDrag={(_, info) => {
              setPoint(info.point);
              cloneControls.set({
                x: 0,
                y: 0,
              })
            }}
            onDragEnd={() => {
              setIsLocalDragging(false);
              setIsDragging(false);
            }}
            // variants={{
            //   exit: {
            //     left: homePoint?.x,
            //     top: homePoint?.y,
            //     width: renderedSize?.width,
            //     height: renderedSize?.height,
            //     opacity: 0,
            //     transition: { duration: 0.5, ease: "easeOut" }
            //   },
            //   fastExit: {
            //     x: 0,
            //     y: 0,
            //     opacity: 0,
            //     transition: { duration: 0 }
            //   }
            // }}
            // exit={isDragging ? "fastExit" : "exit"}
            // exit={{
            //   left: homePoint?.x,
            //   top: homePoint?.y,
            //   width: renderedSize?.width,
            //   height: renderedSize?.height,
            //   opacity: 0,
            //   transition: { duration: 0.5, ease: "easeOut" }
            // }}
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
        )}
      </AnimatePresence>
    </>
  )
}