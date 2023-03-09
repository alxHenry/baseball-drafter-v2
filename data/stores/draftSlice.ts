import { getStateWithToggledStat } from "../state/getStateWithToggledStat";
import { ALL_POSITION_KEY, isBatterFilter, TableDisplayMode } from "../types/positions";
import {
  BatterStatConfigsById,
  defaultBatterStatConfigsById,
  defaultPitcherStatConfigsById,
  PitcherStatConfigsById,
  RequiredStatConfigsById,
  requiredStatConfigsById,
} from "../types/statConfig";
import { StatId } from "../types/stats";
import type { StoreGet, StoreSet } from "./store";
import { TableSortKey } from "./tableSlice";

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
  readonly setTableDisplayMode: (newFilter: TableDisplayMode) => void;
  readonly toggleRelativeStats: () => void;
  readonly toggleStatSelection: (stat: StatId) => void;
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
  setTableDisplayMode: (newFilter) => {
    set(({ draftSlice, tableSlice }) => {
      const prevFilter = draftSlice.currentTableDisplayMode;
      const prevSortKey = tableSlice.currentSortKey;

      const oldWasBatterFilter = isBatterFilter(prevFilter);
      const newIsBatterFilter = isBatterFilter(newFilter);

      let newSortKey: TableSortKey = prevSortKey;
      let newIsSortReversed = tableSlice.isSortReversed;
      if (newFilter === ALL_POSITION_KEY || oldWasBatterFilter !== newIsBatterFilter) {
        newSortKey = "aWorth";
        newIsSortReversed = false;
      }

      return {
        draftSlice: {
          ...draftSlice,
          currentTableDisplayMode: newFilter,
        },
        tableSlice: {
          ...tableSlice,
          // Reset sort state to prevent error where the table tries to remain sorted when switching between player types
          currentSortKey: newSortKey,
          isSortReversed: newIsSortReversed,
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
  toggleStatSelection: (stat) => {
    set((store) => {
      return getStateWithToggledStat(store, stat);
    });
  },
});
