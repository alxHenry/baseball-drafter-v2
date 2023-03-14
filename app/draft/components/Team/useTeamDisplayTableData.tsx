import { useMemo } from "react";
import { Player } from "../../../../data/stores/playersSlice";
import { PositionId } from "../../../../data/types/positions";
import { useOptimalTeamLineupData } from "./useOptimalTeamLineupData";

export interface TeamTableRowData {
  readonly id: string;
  readonly positionId: PositionId;
  readonly player: Player;
}

export const useTeamDisplayTableData = () => {
  const lineup = useOptimalTeamLineupData();

  return useMemo(() => {
    const players = Object.entries(lineup).flatMap(([positionId, players]) => {
      const playerRows = players.map((player) => ({
        id: player.id,
        positionId: positionId,
        player,
      }));
      return playerRows;
    });

    return { nodes: players };
  }, [lineup]);
};
