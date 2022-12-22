import type { StoreGet, StoreSet } from "./store";

export type ServerPlayerById = Record<string, ServerPlayer>;
export interface ServerPlayer {
  id: string;
  avg: number;
  name: string;
  hr: number;
}

export type BattersById = Record<string, BatterPlayerRow>;
export interface BatterPlayerRow extends ServerPlayer {
  draftedByTeamId: string | null;
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
