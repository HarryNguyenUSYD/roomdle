"use client";

import Menu from "@/components/ui/menu/Menu";
import MenuButton from "@/components/ui/menu/MenuButton";
import useMenu from "@/hooks/useMenu";

export default function SettingsButton() {
  const { isActive, handleSetInactive, handleSetActive } = useMenu();

  return (
    <>
      {isActive && (
        <Menu handleSetInactive={handleSetInactive}>
          <p className="text-md lg:text-2xl">(content goes here...)</p>
        </Menu>
      )}
      <MenuButton onClick={handleSetActive}>
        <p className="text-md lg:text-2xl">Settings</p>
      </MenuButton>
    </>
  )
}