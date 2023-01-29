import { Store } from "../stores/store";
import { statConfigsById } from "../types/statConfigsById";
import { isBatterStat, isPitcherStat, StatId } from "../types/stats";

export const getStateWithToggledStat = (state: Store, statId: StatId): Store => {
  const { draftSlice } = state;

  if (isBatterStat(statId)) {
    const isSelected = draftSlice.batterStatConfigsById[statId] != null;
    if (isSelected === false) {
      return {
        ...state,
        draftSlice: {
          ...draftSlice,
          batterStatConfigsById: { ...draftSlice.batterStatConfigsById, [statId]: statConfigsById[statId] },
        },
      };
    } else {
      const batterStatConfigsWithRemovedStat = { ...draftSlice.batterStatConfigsById };
      delete batterStatConfigsWithRemovedStat[statId];
      return {
        ...state,
        draftSlice: {
          ...draftSlice,
          batterStatConfigsById: batterStatConfigsWithRemovedStat,
        },
      };
    }
  }

  if (isPitcherStat(statId)) {
    const isSelected = draftSlice.pitcherStatConfigsById[statId] != null;
    if (isSelected === false) {
      return {
        ...state,
        draftSlice: {
          ...draftSlice,
          pitcherStatConfigsById: { ...draftSlice.pitcherStatConfigsById, [statId]: statConfigsById[statId] },
        },
      };
    } else {
      const pitcherStatConfigsWithRemovedStat = { ...draftSlice.pitcherStatConfigsById };
      delete pitcherStatConfigsWithRemovedStat[statId];
      return {
        ...state,
        draftSlice: {
          ...draftSlice,
          pitcherStatConfigsById: pitcherStatConfigsWithRemovedStat,
        },
      };
    }
  }

  // Shouldn't happen
  return state;
};
