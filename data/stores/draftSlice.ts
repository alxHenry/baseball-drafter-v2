import { BatterStatId, PitcherStatId } from "./playersSlice";
import type { StoreGet, StoreSet } from "./store";

export interface DraftSlice {
  readonly currentPickTeamId: string | null;
  readonly showRelativeStatValues: boolean;
  readonly batterStats: BatterStatId[];
  readonly pitcherStats: PitcherStatId[];

  // Methods
  readonly advanceDraft: () => void;
  readonly setStatConfig: (batterStats: BatterStatId[], pitcherStats: PitcherStatId[]) => void;
  readonly toggleRelativeStats: () => void;
}

export const getDraftSliceDefinitions = (set: StoreSet, get: StoreGet): DraftSlice => ({
  batterStats: ["avg", "rbi", "r", "sb", "hr"],
  pitcherStats: ["w", "sv", "era", "whip", "so"],
  currentPickTeamId: null,
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
