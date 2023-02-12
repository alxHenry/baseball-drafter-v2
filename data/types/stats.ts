// Weird typescript workaround, but allows us to quickly type narrow a generic StatId, which is ideal
// if we're doing the type narrow in a selector that runs every state update. The values do not matter.
const batterStats = {
  "1B": false,
  "2B": false,
  "3B": false,
  AB: false,
  AVG: false,
  BB: false,
  H: false,
  HBP: false,
  HR: false,
  IBB: false,
  OBP: false,
  OPS: false,
  R: false,
  RBI: false,
  SB: false,
  SF: false,
  SLG: false,
  wOBA: false,
};
export type BatterStatId = keyof typeof batterStats;
export function isBatterStat(statId: StatId): statId is BatterStatId {
  return batterStats.hasOwnProperty(statId);
}

const pitcherStats = {
  bbAllowed: false,
  ER: false,
  ERA: false,
  hAllowed: false,
  HLD: false,
  IP: false,
  "K/9": false,
  "K/BB": false,
  QS: false,
  SO: false,
  SV: false,
  SVHLD: false,
  W: false,
  WHIP: false,
};
export type PitcherStatId = keyof typeof pitcherStats;
export function isPitcherStat(statId: StatId): statId is PitcherStatId {
  return pitcherStats.hasOwnProperty(statId);
}

const requiredStats = { aWorth: false, worth: false };
export type RequiredStatId = keyof typeof requiredStats;
export function isRequiredStat(statId: StatId): statId is RequiredStatId {
  return requiredStats.hasOwnProperty(statId);
}

export type StatId = BatterStatId | PitcherStatId | RequiredStatId;

export type StatById = Record<RequiredStatId, Stat> & Partial<Record<StatId, Stat>>; // Need partial because Typescript keys are exhaustive, but we won't have every possible stat!
export interface Stat {
  readonly id: StatId;
  readonly abs: number; // Absolute value - i.e. 5 HRs
  readonly rel?: number; // Relative value - i.e. 8.5 z-scores above average HRs
}

export type TeamTotalStats = Partial<Record<StatId, number>>;
export type TeamTotalStatsById = Record<string, TeamTotalStats>;

export type StatConfigById = Record<StatId, StatConfig>;
export type StatConfig = {
  readonly id: StatId;
  readonly display: string;
  readonly isHigherBetter: boolean;
  readonly isDisplayed: boolean;
  readonly isSelectable: boolean; // Can this be a category the user can select to use
  readonly calculator?: Calculator;
};
export type Calculator = (statsById: TeamTotalStats) => number;
