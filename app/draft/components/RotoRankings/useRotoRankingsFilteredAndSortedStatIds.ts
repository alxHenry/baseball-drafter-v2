import { useMemo } from "react";
import { useStore } from "../../../../data/stores/store";
import { TOTAL_KEY } from "../../../../data/types/rotoRankings";
import {
  BatterStatId,
  isBatterStat,
  isPitcherStat,
  PitcherStatId,
  RequiredStatId,
  StatId,
} from "../../../../data/types/stats";

export const useRotoRankingsFilteredAndSortedStatIds = () => {
  const batterStats = useStore((state) => state.draftSlice.batterStatConfigsById);
  const pitcherStats = useStore((state) => state.draftSlice.pitcherStatConfigsById);
  const requiredStats = useStore((state) => state.draftSlice.requiredStatConfigsById);

  return useMemo(() => {
    const statIds = [
      ...Object.keys(batterStats),
      ...Object.keys(pitcherStats),
      ...Object.keys(requiredStats),
      TOTAL_KEY,
    ];

    const sortedAndFiltered = statIds
      .reduce<string[]>((agg, statId) => {
        const isDisplayedBatterStat =
          batterStats[statId as BatterStatId] != null &&
          batterStats[statId as BatterStatId]?.isDisplayed === true &&
          batterStats[statId as BatterStatId]?.isSelectable === true;
        const isDisplayedPitcherStat =
          pitcherStats[statId as PitcherStatId] != null &&
          pitcherStats[statId as PitcherStatId]?.isDisplayed === true &&
          pitcherStats[statId as PitcherStatId]?.isSelectable === true;
        // TODO: Support worth and aWorth
        const isDisplayedRequiredStat =
          requiredStats[statId as RequiredStatId] != null &&
          requiredStats[statId as RequiredStatId]?.isDisplayed === true; // Worth and aWorth are not selectable, but we still want them included
        const isRotoTotalStat = statId === TOTAL_KEY;

        if (isDisplayedBatterStat || isDisplayedPitcherStat || isDisplayedRequiredStat || isRotoTotalStat) {
          agg.push(statId);
        }
        return agg;
      }, [])
      .sort((a, b) => {
        const aSortValue = isBatterStat(a as StatId) === true ? 0 : isPitcherStat(a as StatId) === true ? 1 : 2;
        const bSortValue = isBatterStat(b as StatId) === true ? 0 : isPitcherStat(b as StatId) === true ? 1 : 2;
        return aSortValue - bSortValue;
      });

    // Transform to set to add constant time lookup
    return new Set(sortedAndFiltered);
  }, [batterStats, pitcherStats, requiredStats]);
};
