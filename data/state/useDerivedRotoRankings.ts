import { useMemo } from "react";
import { useStore } from "../stores/store";
import { StatId } from "../types/stats";

export type RotoTuple = [number, number]; // [rank, total value]
export type RotoRankings = Partial<Record<StatId, RotoTuple>>;

export const TOTAL_KEY: StatId = "Total" as StatId;

// We don't want this in a store selector because it's too expensive to re-run every render. Maybe we could reintroduce re-reselect to zustand and that would
// make it possible as a selector. Instead of that, I'm pulling it into a memoized hook that will not rerun if the store reference values don't change.
export const useDerivedRotoRankings = () => {
  const batterStatsById = useStore((state) => state.draftSlice.batterStatConfigsById);
  const pitcherStatsById = useStore((state) => state.draftSlice.pitcherStatConfigsById);
  const teamTotalStatsById = useStore((state) => state.teamsSlice.teamTotalStatsById);
  const teamsById = useStore((state) => state.teamsSlice.teamsById);

  return useMemo(() => {
    const teamIds = Object.keys(teamsById);
    const rotoRankingsByTeamId = teamIds.reduce<Record<string, RotoRankings>>((agg, teamId) => {
      agg[teamId] = {};
      return agg;
    }, {});

    const rotoTotalTuples: [string, number][] = [];
    const statIds = [...Object.keys(batterStatsById), ...Object.keys(pitcherStatsById)];
    statIds.forEach((stat, statIndex) => {
      const statId = stat as StatId;
      const totalTeamTuples: [string, number][] = teamIds.map((teamId) => {
        return [teamId, teamTotalStatsById[teamId][statId]!];
      });

      // TODO: This fails to properly calculate ties
      totalTeamTuples.sort((a, b) => a[1] - b[1]);
      totalTeamTuples.forEach(([teamId, value], index) => {
        const statRank = index + 1;
        // TODO: Handle stats where lower is better.
        rotoRankingsByTeamId[teamId][statId] = [statRank, value];

        // Tabulate roto score totals for team
        const newTeamTotal = rotoRankingsByTeamId[teamId][TOTAL_KEY] ?? [-1, 0];
        newTeamTotal[1] = newTeamTotal[1] + statRank;
        rotoRankingsByTeamId[teamId][TOTAL_KEY] = newTeamTotal;

        if (statIndex === statIds.length - 1) {
          // We now have the team totals and can save them to a tuple
          rotoTotalTuples.push([teamId, newTeamTotal[1]]);
        }
      });
    });

    // Now sort the totals tuple and save off ranks to our object of truth
    rotoTotalTuples.sort((a, b) => a[1] - b[1]);
    rotoTotalTuples.forEach(([teamId, _total], index) => {
      const totalRank = rotoTotalTuples.length - index;
      rotoRankingsByTeamId[teamId][TOTAL_KEY]![0] = totalRank;
    });

    return rotoRankingsByTeamId;
  }, [batterStatsById, pitcherStatsById, teamTotalStatsById, teamsById]);
};
