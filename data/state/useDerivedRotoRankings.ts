import { useMemo } from "react";
import { StatId } from "../stores/playersSlice";
import { useStore } from "../stores/store";

type RotoTuple = [number, number]; // [rank, total value]
type RotoRankings = Partial<Record<StatId, RotoTuple>>;

// We don't want this in a store selector because it's too expensive to re-run every render. Maybe we could reintroduce re-reselect to zustand and that would
// make it possible as a selector. Instead of that, I'm pulling it into a memoized hook that will not rerun if the store reference values don't change.
export const useDerivedRotoRankings = () => {
  const batterStatsById = useStore((state) => state.draftSlice.batterStatsById);
  const pitcherStatsById = useStore((state) => state.draftSlice.pitcherStatsById);
  const teamTotalStatsById = useStore((state) => state.teamsSlice.teamTotalStatsById);
  const teamsById = useStore((state) => state.teamsSlice.teamsById);

  return useMemo(() => {
    const teamIds = Object.keys(teamsById);
    const rotoRankingsByTeamId = teamIds.reduce<Record<string, RotoRankings>>((agg, teamId) => {
      agg[teamId] = {};
      return agg;
    }, {});

    const statIds = [...Object.keys(batterStatsById), ...Object.keys(pitcherStatsById)];
    statIds.forEach((stat) => {
      const statId = stat as StatId;
      const totalTeamTuples: [string, number][] = teamIds.map((teamId) => {
        return [teamId, teamTotalStatsById[teamId][statId]!];
      });

      totalTeamTuples.sort((a, b) => a[1] - b[1]);
      totalTeamTuples.forEach(([teamId, value], rank) => {
        // TODO: Handle stats where lower is better.
        rotoRankingsByTeamId[teamId][statId] = [rank, value];
      });
    });

    return rotoRankingsByTeamId;
  }, [batterStatsById, pitcherStatsById, teamTotalStatsById, teamsById]);
};
