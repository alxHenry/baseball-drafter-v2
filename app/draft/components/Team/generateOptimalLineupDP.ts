// Chat GPT generated a dynamic programming solution as well that is O(NM2^M), where N is the number of players and M is the number of positions.
// Compared to the other solution that is O(n^p), where n is the number of available players for each position, and p is the number of positions in the lineup.
import { Player } from "../../../../data/stores/playersSlice";
import { PositionId } from "../../../../data/types/positions";

export type TeamLineup = Partial<Record<PositionId, Player>>;

interface GenerateOptimalLineupArgs {
  readonly players: Player[];
  readonly positionRequirements: Record<PositionId, number>;
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
  let selectedLineup: TeamLineup = {};
  let i = n;
  let j = p - 1;
  while (i > 0 && j >= 0) {
    const prevJ = selections[i][j];
    if (prevJ !== -1) {
      const positionId = Object.keys(positionRequirements)[j] as PositionId;
      const player = players[i - 1];
      selectedLineup[positionId] = player;
      i--;
      j = prevJ;
    } else {
      j--;
    }
  }

  return selectedLineup;
};
