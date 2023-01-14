import { statConfigsById } from "../../app/utils/statConfigsById";
import { BatterStatId, PitcherStatId, RequiredStatId, StatId } from "./playersSlice";
import type { StoreGet, StoreSet } from "./store";

export type TableDisplayMode = "All" | "Batters" | "Pitchers";
export type StatConfigById = Partial<Record<StatId, StatConfig>>;
type BatterStatById = Partial<Record<BatterStatId, StatConfig>>;
type PitcherStatById = Partial<Record<PitcherStatId, StatConfig>>;
type RequiredStatById = Record<RequiredStatId, StatConfig>;

export type StatConfig = {
  readonly id: StatId;
  readonly display: string;
  readonly isHigherBetter: boolean;
  readonly isDisplayed: boolean;
};

const generateStatConfigById = <T>(statIds: StatId[]): T => {
  return statIds.reduce((agg, statId) => {
    agg[statId] = statConfigsById[statId];
    return agg;
  }, {} as any); // TODO: Could improve this typing with some fancy typescript
};
const defaultBatterStatsById = generateStatConfigById<BatterStatById>(["avg", "rbi", "r", "sb", "hr"]);
const defaultPitcherStatsById = generateStatConfigById<PitcherStatById>(["w", "sv", "era", "whip", "so"]);
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
