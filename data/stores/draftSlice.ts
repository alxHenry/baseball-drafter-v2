import {
  BatterStatConfigsById,
  defaultBatterStatConfigsById,
  defaultPitcherStatConfigsById,
  PitcherStatConfigsById,
  RequiredStatConfigsById,
  requiredStatConfigsById,
} from "../types/statConfig";
import type { StoreGet, StoreSet } from "./store";

export type TableDisplayMode = "All" | "Batters" | "Pitchers";

export interface DraftSlice {
  readonly currentPickTeamId: string | null;
  readonly currentTableDisplayMode: TableDisplayMode;
  readonly showRelativeStatValues: boolean;
  readonly batterStatConfigsById: BatterStatConfigsById;
  readonly pitcherStatConfigsById: PitcherStatConfigsById;
  readonly requiredStatConfigsById: RequiredStatConfigsById;

  // Methods
  readonly advanceDraft: () => void;
  readonly setStatConfig: (batterStats: BatterStatConfigsById, pitcherStats: PitcherStatConfigsById) => void;
  readonly setTableDisplayMode: (newMode: TableDisplayMode) => void;
  readonly toggleRelativeStats: () => void;
}

export const getDraftSliceDefinitions = (set: StoreSet, get: StoreGet): DraftSlice => ({
  batterStatConfigsById: defaultBatterStatConfigsById,
  pitcherStatConfigsById: defaultPitcherStatConfigsById,
  requiredStatConfigsById: requiredStatConfigsById,
  currentPickTeamId: null,
  currentTableDisplayMode: "All",
  showRelativeStatValues: true,

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
          batterStatConfigsById: batterStatsById,
          pitcherStatConfigsById: pitcherStatsById,
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
