"use client";

import Furniture from "@/components/ui/furniture/Furniture";
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
    <div className="w-[65vw] h-[20vh]">
      <div className="relative w-full h-full px-20 bg-amber-700 flex flex-row justify-start items-center gap-20 overflow-x-auto">
        {Array.from({ length: 20 }).map((_, i) => <Furniture key={`furniture_${i}`} />)}
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
        className="w-30 h-8 rounded-t-2xl bg-amber-700 text-white text-md"
        onClick={() => setIsActive(!isActive)}
      >
        Furniture Bar
      </button>
      {isActive && (
        <div className="relative w-full h-full px-10 py-10 bg-amber-700 grid grid-cols-2 gap-10 overflow-y-auto">
          {Array.from({ length: 20 }).map((_, i) => <Furniture key={`furniture_${i}`} />)}
        </div>
      )}
    </div>
  )
}