"use client";

import Menu from "@/components/ui/menu/Menu";
import MenuButton from "@/components/ui/menu/MenuButton";
import useMenu from "@/hooks/useMenu";
import { useSettingsStore } from "@/store/useSettingsStore";

export default function SettingsButton() {
  const { isActive, handleSetInactive, handleSetActive } = useMenu();

  const {
    highContrast,
    grabAtCenter,
    clearBoardAfterSubmit,
    onlyClearIncorrectFurniture,

    setHighContrast,
    setGrabAtCenter,
    setClearBoardAfterSubmit,
    setOnlyClearIncorrectFurniture,
  } = useSettingsStore();

  return (
    <>
      {isActive && (
        <Menu handleSetInactive={handleSetInactive}>
          <p className="text-md lg:text-2xl">Settings</p>
          <div className="w-[80%] border border-white"></div>
          <div className="w-full flex flex-row justify-between items-center">
            <p className="text-md lg:text-xl">High Contrast:</p>
            <button
              className="text-md lg:text-xl cursor-pointer hover:brightness-75"
              onClick={() => setHighContrast(!highContrast)}
            >
              {highContrast ? "ON" : "OFF"}
            </button>
          </div>
          <p className="text-md lg:text-2xl">Advanced</p>
          <div className="w-[80%] border border-white"></div>
          <div className="w-full flex flex-row justify-between items-center">
            <p className="text-md lg:text-xl">Grab Furniture:</p>
            <button
              className="text-md lg:text-xl cursor-pointer hover:brightness-75"
              onClick={() => setGrabAtCenter(!grabAtCenter)}
            >
              {grabAtCenter ? "CENTER" : "CORNER"}
            </button>
          </div>
          <div className="w-full flex flex-row justify-between items-center">
            <p className="text-md lg:text-xl">Clear Board After Submit:</p>
            <button
              className="text-md lg:text-xl cursor-pointer hover:brightness-75"
              onClick={() => setClearBoardAfterSubmit(!clearBoardAfterSubmit)}
            >
              {clearBoardAfterSubmit ? "ON" : "OFF"}
            </button>
          </div>
          <div className="w-full flex flex-row justify-between items-center">
            <p className="text-md lg:text-xl">Only Clear Incorrect Furniture:</p>
            <button
              className="text-md lg:text-xl cursor-pointer hover:brightness-75"
              onClick={() => setOnlyClearIncorrectFurniture(!onlyClearIncorrectFurniture)}
            >
              {onlyClearIncorrectFurniture ? "ON" : "OFF"}
            </button>
          </div>
                    <p className="text-md lg:text-2xl">Settings</p>
          <div className="w-[80%] border border-white"></div>
          <div className="w-full flex flex-row justify-between items-center">
            <p className="text-md lg:text-xl">High Contrast:</p>
            <button
              className="text-md lg:text-xl cursor-pointer hover:brightness-75"
              onClick={() => setHighContrast(!highContrast)}
            >
              {highContrast ? "ON" : "OFF"}
            </button>
          </div>
          <p className="text-md lg:text-2xl">Advanced</p>
          <div className="w-[80%] border border-white"></div>
          <div className="w-full flex flex-row justify-between items-center">
            <p className="text-md lg:text-xl">Grab Furniture:</p>
            <button
              className="text-md lg:text-xl cursor-pointer hover:brightness-75"
              onClick={() => setGrabAtCenter(!grabAtCenter)}
            >
              {grabAtCenter ? "CENTER" : "CORNER"}
            </button>
          </div>
          <div className="w-full flex flex-row justify-between items-center">
            <p className="text-md lg:text-xl">Clear Board After Submit:</p>
            <button
              className="text-md lg:text-xl cursor-pointer hover:brightness-75"
              onClick={() => setClearBoardAfterSubmit(!clearBoardAfterSubmit)}
            >
              {clearBoardAfterSubmit ? "ON" : "OFF"}
            </button>
          </div>
          <div className="w-full flex flex-row justify-between items-center">
            <p className="text-md lg:text-xl">Only Clear Incorrect Furniture:</p>
            <button
              className="text-md lg:text-xl cursor-pointer hover:brightness-75"
              onClick={() => setOnlyClearIncorrectFurniture(!onlyClearIncorrectFurniture)}
            >
              {onlyClearIncorrectFurniture ? "ON" : "OFF"}
            </button>
          </div>
        </Menu>
      )}
      <MenuButton onClick={handleSetActive}>
        <p className="text-md lg:text-2xl">Settings</p>
      </MenuButton>
    </>
  )
}