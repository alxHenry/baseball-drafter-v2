import { useMemo } from "react";
import { TOTAL_KEY, useDerivedRotoRankings } from "../../../../data/state/useDerivedRotoRankings";
import { useStore } from "../../../../data/stores/store";
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
  const rotoRankingsById = useDerivedRotoRankings();

  return useMemo(() => {
    const firstTeam = Object.keys(rotoRankingsById)[0];

    return Object.keys(rotoRankingsById[firstTeam])
      .reduce<string[]>((agg, statId) => {
        const isDisplayedBatterStat =
          batterStats[statId as BatterStatId] != null &&
          batterStats[statId as BatterStatId]?.isDisplayed === true &&
          batterStats[statId as BatterStatId]?.isSelectable === true;
        const isDisplayedPitcherStat =
          pitcherStats[statId as PitcherStatId] != null &&
          pitcherStats[statId as PitcherStatId]?.isDisplayed === true &&
          pitcherStats[statId as PitcherStatId]?.isSelectable === true;
        const isDisplayedRequiredStat =
          requiredStats[statId as RequiredStatId] != null &&
          requiredStats[statId as RequiredStatId]?.isDisplayed === true &&
          requiredStats[statId as RequiredStatId]?.isSelectable === true;
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
  }, [batterStats, pitcherStats, requiredStats, rotoRankingsById]);
};
