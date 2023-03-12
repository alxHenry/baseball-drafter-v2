import { Player } from "../../../../data/stores/playersSlice";
import { isBatterEligiblePosition, PositionId } from "../../../../data/types/positions";

export type TeamLineup = Partial<Record<PositionId, Player>>;

interface GenerateOptimalLineupArgs {
  readonly players: Player[];
  readonly positionRequirements: Record<PositionId, number>;
}

// ChatGPT wrote this - incredible
export const generateOptimalLineup = ({ players, positionRequirements }: GenerateOptimalLineupArgs): TeamLineup => {
  // Create an array of available players for each position
  const playersByPosition: Partial<Record<PositionId, Player[]>> = {};
  Object.keys(positionRequirements).forEach((positionId) => {
    const availablePlayers = players.filter((player) => player.position.includes(positionId as PositionId));
    playersByPosition[positionId as PositionId] = availablePlayers;
  });

  // Sort players by value (higher is better)
  players.sort((a, b) => b.stats.worth.abs - a.stats.worth.abs);

  // Create a copy of the position requirements object, which we will modify as we fill positions in the lineup
  const remainingRequirements = { ...positionRequirements };

  // Create an object to store the selected lineup
  let selectedLineup: TeamLineup = {};

  // Find all possible permutations of players for each position
  Object.keys(remainingRequirements).forEach((positionId) => {
    const numRequired = remainingRequirements[positionId as PositionId];
    const availablePlayers = playersByPosition[positionId as PositionId];

    const positionPermutations = getPermutations(availablePlayers, numRequired);

    // Find the combination of players that results in the highest total value
    let bestValue = 0;
    let bestLineup: TeamLineup = {};

    positionPermutations.forEach((permutation) => {
      const lineup: TeamLineup = { ...selectedLineup };
      permutation.forEach((player, index) => {
        lineup[positionId as PositionId] = player;
        if (index === permutation.length - 1) {
          // This is the last position in the permutation, so calculate the total value of the lineup
          const lineupValue = Object.values(lineup).reduce((total, player) => total + (player?.value || 0), 0);
          if (lineupValue > bestValue) {
            bestValue = lineupValue;
            bestLineup = lineup;
          }
        }
      });
    });

    // Update the selected lineup and remaining requirements based on the best lineup for this position
    selectedLineup = bestLineup;
    Object.keys(selectedLineup).forEach((positionId) => {
      remainingRequirements[positionId as PositionId] -=
        positionId === positionId && selectedLineup[positionId as PositionId] !== undefined ? 1 : 0;
    });
  });

  return selectedLineup;
};

// Helper function to generate all permutations of a given length for a given array of items
const getPermutations = <T>(items: T[], length: number): T[][] => {
  if (length === 1) {
    return items.map((item) => [item]);
  }

  const permutations: T[][] = [];
  items.forEach((item, index) => {
    const remainingItems = items.slice(0, index).concat(items.slice(index + 1));
    const subPermutations = getPermutations(remainingItems, length - 1);
    subPermutations.forEach((permutation) => {
      permutations.push([item].concat(permutation));
    });
  });

  return permutations;
};
