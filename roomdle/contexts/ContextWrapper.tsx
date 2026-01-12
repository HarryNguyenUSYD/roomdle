import { useState } from "react";
import { DebugContext, DebugSettings } from "./DebugContext";
import { Settings, SettingsContext } from "./SettingsContext";

export default function ContextWrapper({ children }: { children?: React.ReactNode }) {
  const [debugSettings, setDebugSettings] = useState<DebugSettings>({
    isDebugging: true,
    isShowingCoordinates: false,
    isShowingSolution: false
  });

  const [settings, setSettings] = useState<Settings>({
    highContrast: true
  });

  return (
    <DebugContext.Provider value={{settings: debugSettings, setSettings: setDebugSettings}}>
      <SettingsContext.Provider value={{settings: settings, setSettings: setSettings}}>
        {children}
      </SettingsContext.Provider>
    </DebugContext.Provider>
  )
}