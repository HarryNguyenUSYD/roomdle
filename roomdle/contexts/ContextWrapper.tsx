import { useState } from "react";
import { DebugContext, DebugSettings } from "./DebugContext";
import { Settings, SettingsContext } from "./SettingsContext";
import { DragAndDropContext } from "./DragAndDropContext";
import { FurnitureOrientation } from "@/game/game.types";

export default function ContextWrapper({ children }: { children?: React.ReactNode }) {
  const [debugSettings, setDebugSettings] = useState<DebugSettings>({
    isDebugging: true,
    isShowingCoordinates: false,
    isShowingSolution: false
  });

  const [settings, setSettings] = useState<Settings>({
    highContrast: true,
    grabAtCenter: false,
  });

  const [draggedFurniture, setDraggedFurniture] = useState<FurnitureOrientation | null>(null);

  return (
    <DebugContext.Provider value={{settings: debugSettings, setSettings: setDebugSettings}}>
      <SettingsContext.Provider value={{settings: settings, setSettings: setSettings}}>
        <DragAndDropContext.Provider value={{ draggedFurniture: draggedFurniture, setDraggedFurniture: setDraggedFurniture }}>
          {children}
        </DragAndDropContext.Provider>
      </SettingsContext.Provider>
    </DebugContext.Provider>
  )
}