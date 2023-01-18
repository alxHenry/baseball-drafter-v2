import type { PositionId } from "./setupSlice";
import type { StoreGet, StoreSet } from "./store";

// Weird typescript workaround, but allows us to quickly type narrow a generic StatId, which is ideal
// if we're doing the type narrow in a selector that runs every state update. The values do not matter.
const batterStats = { avg: false, rbi: false, r: false, sb: false, hr: false };
export type BatterStatId = keyof typeof batterStats;
export function isBatterStat(statId: StatId): statId is BatterStatId {
  return batterStats.hasOwnProperty(statId);
}

const pitcherStats = { w: false, sv: false, era: false, whip: false, so: false };
export type PitcherStatId = keyof typeof pitcherStats;
export function isPitcherStat(statId: StatId): statId is PitcherStatId {
  return pitcherStats.hasOwnProperty(statId);
}

const requiredStats = { worth: false, aWorth: false };
export type RequiredStatId = keyof typeof requiredStats;
export function isRequiredStat(statId: StatId): statId is RequiredStatId {
  return requiredStats.hasOwnProperty(statId);
}

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
}

export const getPlayersSliceDefinitions = (set: StoreSet, get: StoreGet): PlayersSlice => ({
  playersById: {},
});
