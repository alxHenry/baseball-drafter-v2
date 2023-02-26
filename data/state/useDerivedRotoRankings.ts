import { useMemo } from "react";
import { useRotoRankingsFilteredAndSortedStatIds } from "../../app/draft/components/RotoRankings/useRotoRankingsFilteredAndSortedStatIds";
import { useStore } from "../stores/store";
import { TOTAL_KEY } from "../types/rotoRankings";
import { StatId } from "../types/stats";

export type RotoTuple = [number, number]; // [rank, total value]
export type RotoRankings = Partial<Record<StatId, RotoTuple>>;

// We don't want this in a store selector because it's too expensive to re-run every render. Maybe we could reintroduce re-reselect to zustand and that would
// make it possible as a selector. Instead of that, I'm pulling it into a memoized hook that will not rerun if the store reference values don't change.
export const useDerivedRotoRankings = () => {
  const teamTotalStatsById = useStore((state) => state.teamsSlice.teamTotalStatsById);
  const teamsById = useStore((state) => state.teamsSlice.teamsById);

  const rotoRankingEligibleStats = useRotoRankingsFilteredAndSortedStatIds();

  return useMemo(() => {
    const teamIds = Object.keys(teamsById);
    const rotoRankingsByTeamIdWithTotal = teamIds.reduce<Record<string, RotoRankings>>((agg, teamId) => {
      agg[teamId] = {};
      return agg;
    }, {});

    const rotoTotalTuples: [string, number][] = [];
    let iter = 0;

    rotoRankingEligibleStats.forEach((stat) => {
      const statId = stat as StatId;
      if (statId === TOTAL_KEY) {
        // Totals have already been tabulated through each indivudal stat. We'll tabulate total ranks after this loop
        return;
      }

      const totalTeamTuples: [string, number][] = teamIds.map((teamId) => {
        return [teamId, teamTotalStatsById[teamId][statId]!];
      });

      // TODO: This fails to properly calculate ties
      totalTeamTuples.sort((a, b) => a[1] - b[1]);
      totalTeamTuples.forEach(([teamId, value], index) => {
        const statRank = index + 1;
        // TODO: Handle stats where lower is better.
        rotoRankingsByTeamIdWithTotal[teamId][statId] = [statRank, value];

        // Tabulate roto score totals for team
        const newTeamTotal = rotoRankingsByTeamIdWithTotal[teamId][TOTAL_KEY] ?? [-1, 0];
        newTeamTotal[1] += statRank;
        rotoRankingsByTeamIdWithTotal[teamId][TOTAL_KEY] = newTeamTotal;

        // -2 because we skip Total
        if (iter === rotoRankingEligibleStats.size - 2) {
          // this is the last stat and we now save the team totals off
          rotoTotalTuples.push([teamId, newTeamTotal[1]]);
        }
      });

      iter++;
    });

    // Now sort the totals tuple and save off ranks to our object of truth
    rotoTotalTuples.sort((a, b) => a[1] - b[1]);
    rotoTotalTuples.forEach(([teamId, _total], index) => {
      const totalRank = rotoTotalTuples.length - index;
      rotoRankingsByTeamIdWithTotal[teamId][TOTAL_KEY]![0] = totalRank;
    });

    return rotoRankingsByTeamIdWithTotal;
  }, [rotoRankingEligibleStats, teamTotalStatsById, teamsById]);
};
