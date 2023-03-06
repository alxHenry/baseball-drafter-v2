import { PositionId } from "../types/positions";
import { StatById } from "../types/stats";
import type { StoreGet, StoreSet } from "./store";

export type ServerPlayerById = Record<string, ServerPlayer>;
export interface ServerPlayer {
  id: string;
  name: string;
  position: PositionId[];
  team: string;
  stats: StatById;
}

export type PlayersById = Record<string, Player>;
export interface Player extends ServerPlayer {
  draftedByTeamId: string | null;
}

export interface PlayersSlice {
  playersById: PlayersById;

  // Methods
  hydratePlayers: (players: PlayersById) => void;
}

export const getPlayersSliceDefinitions = (set: StoreSet, get: StoreGet): PlayersSlice => ({
  playersById: {},
  hydratePlayers: (players) => {
    set((state) => {
      return {
        playersSlice: {
          ...state.playersSlice,
          playersById: players,
        },
      };
    });
  },
});
