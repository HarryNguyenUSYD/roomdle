import { create } from "zustand";

type BoardRectStore = {
  top: number,
  left: number,
  width: number,
  height: number,

  setRect: (d: DOMRect) => void
};

export const useBoardRectStore = create<BoardRectStore>((set) => ({
  top: 0,
  left: 0,
  width: 0,
  height: 0,

  setRect: (d) =>
    set({
      top: d.top,
      left: d.left,
      width: d.width,
      height: d.height
    })
}));