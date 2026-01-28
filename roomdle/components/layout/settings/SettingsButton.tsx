"use client";

import Menu from "@/components/ui/menu/Menu";
import MenuButton from "@/components/ui/menu/MenuButton";
import { useSettingsContext } from "@/contexts/SettingsContext";
import useMenu from "@/hooks/useMenu";

export default function SettingsButton() {
  const { isActive, handleSetInactive, handleSetActive } = useMenu();

  const settingsContext = useSettingsContext();

  return (
    <>
      {isActive && (
        <Menu handleSetInactive={handleSetInactive}>
          <p className="text-md lg:text-2xl">Settings</p>
          <div className="w-[80%] border border-white"></div>
          <div className="w-full flex flex-row justify-between items-center">
            <p className="text-md lg:text-2xl">High Contrast:</p>
            <button
              className="text-md lg:text-2xl cursor-pointer hover:brightness-75"
              onClick={() => settingsContext.setSettings(prev => ({
                ...prev,
                highContrast: !settingsContext.settings.highContrast
              }))}
            >
              {settingsContext.settings.highContrast ? "ON" : "OFF"}
            </button>
          </div>
          <div className="w-full flex flex-row justify-between items-center">
            <p className="text-md lg:text-2xl">Grab Furniture Pieces at the center:</p>
            <button
              className="text-md lg:text-2xl cursor-pointer hover:brightness-75"
              onClick={() => settingsContext.setSettings(prev => ({
                ...prev,
                grabAtCenter: !settingsContext.settings.grabAtCenter
              }))}
            >
              {settingsContext.settings.grabAtCenter ? "ON" : "OFF"}
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