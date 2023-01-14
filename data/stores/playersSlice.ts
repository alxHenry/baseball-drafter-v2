import type { PositionId } from "./setupSlice";
import type { StoreGet, StoreSet } from "./store";

export type BatterStatId = "avg" | "rbi" | "r" | "sb" | "hr";
export type PitcherStatId = "w" | "sv" | "era" | "whip" | "so";
export type RequiredStatId = "worth" | "aWorth";
export type StatId = BatterStatId | PitcherStatId | RequiredStatId;

export type StatById = Record<RequiredStatId, Stat> & Partial<Record<StatId, Stat>>; // Need partial because Typescript keys are exhaustive, but we won't have every possible stat!
export interface Stat {
  readonly id: StatId;
  readonly abs: number; // Absolute value - i.e. 5 HRs
  readonly rel: number; // Relative value - i.e. 8.5 z-scores above average HRs
}

export type ServerPlayerById = Record<string, ServerPlayer>;
export interface ServerPlayer {
  id: string;
  name: string;
  position: PositionId;
  team: string;
  stats: StatById;
}

export type PlayersById = Record<string, Player>;
export interface Player extends ServerPlayer {
  draftedByTeamId: string | null;
}

export interface PlayersSlice {
  playersById: PlayersById;

  hydratePlayers: (playersById: PlayersById) => void;
}

export const getPlayersSliceDefinitions = (set: StoreSet, get: StoreGet): PlayersSlice => ({
  playersById: {},

  hydratePlayers: (playersById) => {
    set((state) => ({
      playersSlice: {
        ...state.playersSlice,
        playersById,
      },
    }));
  },
});
