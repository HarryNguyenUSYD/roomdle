import { create } from "zustand";

type SessionStatisticsStore = {
  attempt: number,

  incrementAttempt: () => void,
  resetAttempt: () => void
}

export const useSessionStatisticsStore = create<SessionStatisticsStore>((set) => ({
  attempt: 0,

  incrementAttempt: () =>
    set((state) => ({
      attempt: state.attempt + 1
    })),
  resetAttempt: () =>
    set({
      attempt: 0
    }),
}));