import { useMemo } from "react";
import { RotoRankings, useDerivedRotoRankings } from "../../../../data/state/useDerivedRotoRankings";

export interface TeamRotoRankings {
  readonly id: string;
  readonly name: string;
  readonly rotoRankings: RotoRankings;
}

export const useRotoRankingsTableData = () => {
  const rotoRankingsById = useDerivedRotoRankings();

  return useMemo(() => {
    const teamRotoRankings: TeamRotoRankings[] = Object.entries(rotoRankingsById).map(([teamId, rankingsByStatId]) => {
      return {
        id: teamId,
        name: "TODO",
        rotoRankings: rankingsByStatId,
      };
    }, []);
    return { nodes: teamRotoRankings };
  }, [rotoRankingsById]);
};
