"use client";

import Furniture from "@/components/layout/furniture-bar/Furniture";
import { FURNITURE_ORIENTATIONS } from "@/game/game.consts";
import { useScroll } from "motion/react";
import { useRef, useState } from "react";
import { FurnitureContext } from "./furniture.context";

export default function FurnitureBar() {
  return (
    <>
      <div className="hidden lg:block">
        <FurnitureBarDesktop />
      </div>

      <div className="block lg:hidden">
        <FurnitureBarMobile />
      </div>
    </>
  )
}

function FurnitureBarDesktop() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    container: ref,
  });
  
  return (
    <FurnitureContext.Provider value={{ scrollY: scrollY }}>
      <div className="relative w-[65vw] h-[25vh] border-4 bg-gray-800 overflow-x-hidden overflow-y-auto" ref={ref}>
        <div className="relative w-auto h-full grid grid-cols-9 grid-flow-row-dense z-10">
          {FURNITURE_ORIENTATIONS.map((orientation, i) => (
            <Furniture
              key={`furniture_${i}`}
              orientation={orientation}
              color="gray"
            />
          ))}
        </div>
      </div>
    </FurnitureContext.Provider>
  )
}

function FurnitureBarMobile() {
  const [isActive, setIsActive] = useState(false);
  const { scrollY } = useScroll();
    
  return (
    <FurnitureContext.Provider value={{ scrollY: scrollY }}>
      <div
        className="fixed left-0 w-full h-[50vh] flex flex-col justify-start items-center"
        style={{ bottom: isActive ? "0" : "calc(-50vh + 2rem)" }}
        >
        <button
          className="w-30 h-8 rounded-t-2xl bg-gray-800 text-white text-md"
          onClick={() => setIsActive(!isActive)}
          >
          Furniture Bar
        </button>
        {isActive && (
          <div className="relative w-full h-auto px-10 py-10 bg-gray-800 overflow-y-auto">
            <div className="relative w-full h-auto grid grid-cols-5 grid-flow-row-dense z-10">
              {FURNITURE_ORIENTATIONS.map((orientation, i) => (
                <Furniture
                  key={`furniture_${i}`}
                  orientation={orientation}
                  color="gray"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </FurnitureContext.Provider>
  )
}