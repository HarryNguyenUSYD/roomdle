import { create } from "zustand";

type DebugStore = {
  isDebugging: boolean,
  isShowingCoordinates: boolean,
  isShowingSolution: boolean,
  isShowingPrediction: boolean,

  setIsDebugging: (val: boolean) => void,
  setIsShowingCoordinates: (val: boolean) => void,
  setIsShowingSolution: (val: boolean) => void,
  setIsShowingPrediction: (val: boolean) => void,
}

export const useDebugStore = create<DebugStore>((set) => ({
  isDebugging: true,
  isShowingCoordinates: false,
  isShowingSolution: false,
  isShowingPrediction: true,

  setIsDebugging: (val) => set({ isDebugging: val }),
  setIsShowingCoordinates: (val) => set({ isShowingCoordinates: val }),
  setIsShowingSolution: (val) => set({ isShowingSolution: val }),
  setIsShowingPrediction: (val) => set({ isShowingPrediction: val })
}));