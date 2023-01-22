import { Store } from "../stores/store";
import { isBatterStat, isPitcherStat, isRequiredStat, StatId } from "../types/stats";

export const getStatDisplay = (statId: StatId) => (store: Store) => {
  const {
    draftSlice: {
      batterStatConfigsById: batterStatsById,
      pitcherStatConfigsById: pitcherStatsById,
      requiredStatConfigsById: requiredStatsById,
    },
  } = store;

  if (isBatterStat(statId)) {
    return batterStatsById[statId]?.display ?? "";
  } else if (isPitcherStat(statId)) {
    return pitcherStatsById[statId]?.display ?? "";
  } else if (isRequiredStat(statId)) {
    return requiredStatsById[statId]?.display ?? "";
  }
  // Should never happen. Would log here in real life prod
  return "";
};

export const getStatIsDisplayed = (statId: StatId) => (store: Store) => {
  const {
    draftSlice: {
      batterStatConfigsById: batterStatsById,
      pitcherStatConfigsById: pitcherStatsById,
      requiredStatConfigsById: requiredStatsById,
    },
  } = store;

  if (isBatterStat(statId)) {
    return batterStatsById[statId]?.isDisplayed ?? false;
  } else if (isPitcherStat(statId)) {
    return pitcherStatsById[statId]?.isDisplayed ?? false;
  } else if (isRequiredStat(statId)) {
    return requiredStatsById[statId]?.isDisplayed ?? false;
  }
  // Should never happen. Would log here in real life prod
  return false;
};
