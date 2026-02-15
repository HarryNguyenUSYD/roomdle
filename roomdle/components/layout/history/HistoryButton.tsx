"use client";

import Menu from "@/components/ui/menu/Menu";
import MenuButton from "@/components/ui/menu/MenuButton";
import useMenu from "@/hooks/useMenu";

export default function HistoryButton() {
  const { isActive, handleSetInactive, handleSetActive } = useMenu();

  return (
    <>
      {isActive && (
        <Menu handleSetInactive={handleSetInactive}>
          <div className="w-full h-auto">

          </div>
        </Menu>
      )}
      <MenuButton onClick={handleSetActive}>
        <p className="text-md lg:text-2xl">History</p>
      </MenuButton>
    </>
  )
}