import { statConfigsById } from "../../app/utils/statConfigsById";
import { BatterStatId, isBatterStat, isPitcherStat, PitcherStatId, RequiredStatId, StatId } from "./playersSlice";
import type { StoreGet, StoreSet } from "./store";
import { TeamTotalStats } from "./teamsSlice";

export type TableDisplayMode = "All" | "Batters" | "Pitchers";
export type StatConfigById = Record<StatId, StatConfig>;
export type BatterStatById = Partial<Record<BatterStatId, StatConfig>>;
export type PitcherStatById = Partial<Record<PitcherStatId, StatConfig>>;
export type RequiredStatById = Record<RequiredStatId, StatConfig>;

export type Calculator = (statsById: TeamTotalStats) => number;
export type StatConfig = {
  readonly id: StatId;
  readonly display: string;
  readonly isHigherBetter: boolean;
  readonly isDisplayed: boolean;
  readonly calculator?: Calculator;
};

export const getStatConfig = (
  statId: StatId,
  batterStatsById: BatterStatById,
  pitcherStatsById: PitcherStatById,
  requiredStatsById: RequiredStatById
) => {
  // TODO: Improve typings. We know it must be one of these and shouldn't have to use '!'
  if (isBatterStat(statId)) {
    return batterStatsById[statId]!;
  } else if (isPitcherStat(statId)) {
    return pitcherStatsById[statId]!;
  } else {
    return requiredStatsById[statId]!;
  }
};

const generateStatConfigById = <T>(statIds: StatId[]): T => {
  return statIds.reduce((agg, statId) => {
    agg[statId] = statConfigsById[statId];
    return agg;
  }, {} as any); // TODO: Could improve this typing with some fancy typescript
};
const defaultBatterStatsById = generateStatConfigById<BatterStatById>(["avg", "rbi", "r", "sb", "hr", "ab", "h"]);
const defaultPitcherStatsById = generateStatConfigById<PitcherStatById>([
  "w",
  "sv",
  "era",
  "whip",
  "so",
  "hAllowed",
  "bbAllowed",
  "er",
  "ip",
]);
const requiredStatsById = generateStatConfigById<RequiredStatById>(["worth", "aWorth"]);

export interface DraftSlice {
  readonly currentPickTeamId: string | null;
  readonly currentTableDisplayMode: TableDisplayMode;
  readonly showRelativeStatValues: boolean;
  readonly batterStatsById: BatterStatById;
  readonly pitcherStatsById: PitcherStatById;
  readonly requiredStatsById: RequiredStatById;

  // Methods
  readonly advanceDraft: () => void;
  readonly setStatConfig: (batterStats: BatterStatById, pitcherStats: PitcherStatById) => void;
  readonly setTableDisplayMode: (newMode: TableDisplayMode) => void;
  readonly toggleRelativeStats: () => void;
}

export const getDraftSliceDefinitions = (set: StoreSet, get: StoreGet): DraftSlice => ({
  batterStatsById: defaultBatterStatsById,
  pitcherStatsById: defaultPitcherStatsById,
  requiredStatsById,
  currentPickTeamId: null,
  currentTableDisplayMode: "All",
  showRelativeStatValues: false,

  advanceDraft: () => {
    set(({ teamsSlice: { teamsById }, draftSlice }) => {
      const { currentPickTeamId } = draftSlice;
      const draftOrderKeys = Object.keys(teamsById);
      const currentPickIndex = draftOrderKeys.findIndex((key) => key === currentPickTeamId);
      const nextTeam = draftOrderKeys[(currentPickIndex + 1) % draftOrderKeys.length];

      return {
        draftSlice: {
          ...draftSlice,
          currentPickTeamId: nextTeam,
        },
      };
    });
  },
  setStatConfig: (batterStatsById, pitcherStatsById) => {
    set(({ draftSlice }) => {
      return {
        draftSlice: {
          ...draftSlice,
          batterStatsById,
          pitcherStatsById,
        },
      };
    });
  },
  setTableDisplayMode: (newMode) => {
    set(({ draftSlice, tableSlice }) => {
      return {
        draftSlice: {
          ...draftSlice,
          currentTableDisplayMode: newMode,
        },
        tableSlice: {
          ...tableSlice,
          // Reset sort state to prevent error where the table tries to remain sorted when switching between player types
          currentSortKey: "NONE",
          isSortReversed: false,
        },
      };
    });
  },
  toggleRelativeStats: () => {
    set(({ draftSlice }) => {
      return {
        draftSlice: {
          ...draftSlice,
          showRelativeStatValues: !draftSlice.showRelativeStatValues,
        },
      };
    });
  },
});
