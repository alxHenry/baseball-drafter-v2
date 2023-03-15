import { useMemo } from "react";
import { Player } from "../../../../data/stores/playersSlice";
import { PositionId } from "../../../../data/types/positions";
import { useOptimalTeamLineupData } from "./useOptimalTeamLineupData";

export interface TeamTableRowData {
  readonly id: string;
  readonly positionId: PositionId;
  readonly player: Player;
}

let keyIndex = 0;
export const useTeamDisplayTableData = () => {
  const lineup = useOptimalTeamLineupData();

  return useMemo(() => {
    const players = Object.entries(lineup).flatMap(([positionId, players]) => {
      if (players.length === 0) {
        const emptyId = `empty-row-${positionId}-${keyIndex}`;
        return {
          id: emptyId,
          positionId,
          player: { id: emptyId },
        };
      }
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
