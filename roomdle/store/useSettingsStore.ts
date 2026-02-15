import { create } from "zustand";

type SettingsStore = {
  highContrast: boolean,
  grabAtCenter: boolean,
  clearBoardAfterSubmit: boolean,
  onlyClearIncorrectFurniture: boolean,

  setHighContrast: (val: boolean) => void,
  setGrabAtCenter: (val: boolean) => void,
  setClearBoardAfterSubmit: (val: boolean) => void,
  setOnlyClearIncorrectFurniture: (val: boolean) => void,
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  highContrast: false,
  grabAtCenter: false,
  clearBoardAfterSubmit: true,
  onlyClearIncorrectFurniture: true,

  setHighContrast: (val) => set({ highContrast: val }),
  setGrabAtCenter: (val) => set({ grabAtCenter: val }),
  setClearBoardAfterSubmit: (val) => set({ clearBoardAfterSubmit: val }),
  setOnlyClearIncorrectFurniture: (val) => set({ onlyClearIncorrectFurniture: val }),
}));