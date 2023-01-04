import type { PositionId } from "./setupSlice";
import type { StoreGet, StoreSet } from "./store";

export type StatId = "avg" | "hr";
export type StatById = Record<StatId, Stat>;
export interface Stat {
  id: StatId;
  display: string;
  abs: number; // Absolute value - i.e. 5 HRs
  rel: number; // Relative value - i.e. 8.5 z-scores above average HRs
  isHigherBetter: boolean;
}

export type ServerPlayerById = Record<string, ServerPlayer>;
export interface ServerPlayer {
  id: string;
  name: string;
  position: PositionId;
  team: string;
  stats: StatById;
}

export type BattersById = Record<string, Player>;
export interface Player extends ServerPlayer {
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
