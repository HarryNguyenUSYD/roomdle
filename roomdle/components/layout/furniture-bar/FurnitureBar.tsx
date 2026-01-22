"use client";

import Furniture from "@/components/ui/furniture/Furniture";
import { FURNITURE_ORIENTATIONS } from "@/game/game.consts";
import { useState } from "react";

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
  return (
    <div className="relative w-[65vw] h-[25vh] border-4 bg-gray-800 overflow-x-auto">
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
  )
}

function FurnitureBarMobile() {
  const [isActive, setIsActive] = useState(false);

  return (
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
  )
}