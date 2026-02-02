import { create } from "zustand";

type SettingsStore = {
  highContrast: boolean,
  grabAtCenter: boolean,

  setHighContrast: (val: boolean) => void,
  setGrabAtCenter: (val: boolean) => void
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  highContrast: false,
  grabAtCenter: false,

  setHighContrast: (val) => set({ highContrast: val }),
  setGrabAtCenter: (val) => set({ grabAtCenter: val })
}));