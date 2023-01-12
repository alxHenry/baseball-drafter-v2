import { BatterStatId, PitcherStatId } from "./playersSlice";
import type { StoreGet, StoreSet } from "./store";

export type TableDisplayMode = "All" | "Batters" | "Pitchers";

export interface DraftSlice {
  readonly currentPickTeamId: string | null;
  readonly currentTableDisplayMode: TableDisplayMode;
  readonly showRelativeStatValues: boolean;
  readonly batterStats: BatterStatId[];
  readonly pitcherStats: PitcherStatId[];

  // Methods
  readonly advanceDraft: () => void;
  readonly setStatConfig: (batterStats: BatterStatId[], pitcherStats: PitcherStatId[]) => void;
  readonly setTableDisplayMode: (newMode: TableDisplayMode) => void;
  readonly toggleRelativeStats: () => void;
}

export const getDraftSliceDefinitions = (set: StoreSet, get: StoreGet): DraftSlice => ({
  batterStats: ["avg", "rbi", "r", "sb", "hr"],
  pitcherStats: ["w", "sv", "era", "whip", "so"],
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
  setStatConfig: (batterStats, pitcherStats) => {
    set(({ draftSlice }) => {
      return {
        draftSlice: {
          ...draftSlice,
          batterStats,
          pitcherStats,
        },
      };
    });
  },
  setTableDisplayMode: (newMode) => {
    set(({ draftSlice }) => {
      return {
        draftSlice: {
          ...draftSlice,
          currentTableDisplayMode: newMode,
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
