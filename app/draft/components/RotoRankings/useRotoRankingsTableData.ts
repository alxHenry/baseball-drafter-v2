import { useMemo } from "react";
import shallow from "zustand/shallow";
import { getIdsToTeamNames } from "../../../../data/selectors/teamsSelectors";
import { RotoRankings, useDerivedRotoRankings } from "../../../../data/state/useDerivedRotoRankings";
import { useStore } from "../../../../data/stores/store";

export interface TeamRotoRankings {
  readonly id: string;
  readonly name: string;
  readonly rotoRankings: RotoRankings;
}

export const useRotoRankingsTableData = () => {
  const teamIdsToNames = useStore(getIdsToTeamNames, shallow);
  const rotoRankingsById = useDerivedRotoRankings();

  return useMemo(() => {
    const teamRotoRankings: TeamRotoRankings[] = Object.entries(rotoRankingsById).map(([teamId, rankingsByStatId]) => {
      return {
        id: teamId,
        name: teamIdsToNames[teamId],
        rotoRankings: rankingsByStatId,
      };
    }, []);
    return { nodes: teamRotoRankings };
  }, [rotoRankingsById, teamIdsToNames]);
};
