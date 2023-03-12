import { useMemo } from "react";
import { useTeamLineupData } from "./useTeamLineupData";

export const useTeamDisplayTableData = () => {
  const lineup = useTeamLineupData();

  return useMemo(() => {
    const players = Object.entries(lineup).map(([positionId, player]) => {});

    return { nodes: [] };
  }, []);
};
