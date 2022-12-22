import type { StoreGet, StoreSet } from "./store";

export type BattersById = Record<string, BatterPlayerRow>;
export interface BatterPlayerRow {
  id: string;
  avg: number;
  name: string;
  hr: number;
}

export interface PlayersSlice {
  battersById: BattersById;

  hydratePlayers: (battersById: BattersById) => void;
}

export const getPlayersSliceDefinitions = (set: StoreSet, get: StoreGet): PlayersSlice => ({
  battersById: {},

  hydratePlayers: (battersById) => {
    set((state) => ({
      playersSlice: {
        ...state.playersSlice,
        battersById,
      },
    }));
  },
});
