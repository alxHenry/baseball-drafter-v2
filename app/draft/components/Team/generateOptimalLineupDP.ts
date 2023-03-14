import { Player } from "../../../../data/stores/playersSlice";
import { PositionId } from "../../../../data/types/positions";

type PositionRequirements = Record<PositionId, number>;
export type TeamLineup = Partial<Record<PositionId, Player[]>>;

interface GenerateOptimalLineupArgs {
  readonly players: Player[];
  readonly positionRequirements: PositionRequirements;
}

export const generateOptimalLineupDP = ({ players, positionRequirements }: GenerateOptimalLineupArgs): TeamLineup => {
  const n = players.length;
  const p = Object.keys(positionRequirements).length;
  const k = Math.max(...Object.values(positionRequirements));
  const table: number[][] = Array.from({ length: n + 1 }, () => Array.from({ length: p }, () => 0));
  const selections: number[][] = Array.from({ length: n + 1 }, () => Array.from({ length: p }, () => -1));

  // Fill in the table row by row
  for (let i = 1; i <= n; i++) {
    const player = players[i - 1];
    for (let j = 0; j < p; j++) {
      const positionId = Object.keys(positionRequirements)[j] as PositionId;
      const numSelected = Object.values(selections[i - 1]).filter((s) => s === j).length;
      const remainingRequirements = positionRequirements[positionId] - numSelected;

      let maxValue = table[i - 1][j];
      for (let k = 1; k <= remainingRequirements; k++) {
        if (j - k >= 0) {
          const prevValue = table[i - 1][j - k];
          const currValue = (player.stats.worth.abs || 0) + prevValue;
          if (currValue > maxValue) {
            maxValue = currValue;
            selections[i][j] = j - k;
          }
        }
      }
      table[i][j] = maxValue;
    }
  }

  // Backtrack through the table to determine the selected lineup
  const selectedLineup: TeamLineup = {};
  const playerCounts: PositionRequirements = { ...positionRequirements };
  for (let i = n; i > 0; i--) {
    let j = p - 1;
    while (j >= 0) {
      const prevJ = selections[i][j];
      if (prevJ !== -1) {
        const positionId = Object.keys(positionRequirements)[j] as PositionId;
        const player = players[i - 1];
        if (!selectedLineup[positionId]) {
          selectedLineup[positionId] = [];
        }
        selectedLineup[positionId]!.push(player);
        playerCounts[positionId]--;
        j = prevJ;
      } else {
        j--;
      }
    }
  }

  return selectedLineup;
};
