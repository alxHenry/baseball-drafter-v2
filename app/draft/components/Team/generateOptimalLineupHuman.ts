import { Player } from "../../../../data/stores/playersSlice";
import { PositionId } from "../../../../data/types/positions";

export type TeamLineup = Partial<Record<PositionId, Player[]>>;

interface GenerateOptimalLineupArgs {
  readonly players: Player[];
  readonly positionRequirements: Record<PositionId, number>;
}

export const generateOptimalLineup = ({
  players: playersOrig,
  positionRequirements,
}: GenerateOptimalLineupArgs): TeamLineup => {
  const players = [...playersOrig];
  players.sort((a, b) => b.stats.worth.abs - a.stats.worth.abs);
  const emptyLineup = Object.keys(positionRequirements).reduce<TeamLineup>((agg, position) => {
    agg[position as PositionId] = [];
    return agg;
  }, {});

  let maxValue = Number.MIN_SAFE_INTEGER;
  let optimalLineup: TeamLineup;
  let calls = 0;
  const generateLineupPermutations = (
    players: Player[],
    positionRequirements: Record<PositionId, number>,
    lineupBuilder: TeamLineup
  ) => {
    calls++;

    // Base case
    if (players.length === 0) {
      const value = calculateLineupValue(lineupBuilder);
      if (value > maxValue) {
        maxValue = value;
        optimalLineup = lineupBuilder;
      }
      return;
    }

    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      const eligiblePositions = player.position; // TODO: Helper to generate for UTIL, CI, MI, etc as well

      for (let position of eligiblePositions) {
        if (positionRequirements[position] === 0) {
          // This player cannot be placed in this position with this lineup, move to next position
          continue;
        }

        // Two choices: Chooser player at this position, or don't
        const playersWithoutPlayer = [...players.slice(0, i), ...players.slice(i + 1)];
        const positionRequirementsDecremented = { ...positionRequirements };
        const chosenLineup = { ...lineupBuilder };

        positionRequirementsDecremented[position]--;
        chosenLineup[position]?.push(player);

        generateLineupPermutations(playersWithoutPlayer, positionRequirementsDecremented, chosenLineup); // Choose
        generateLineupPermutations(playersWithoutPlayer, { ...positionRequirements }, { ...lineupBuilder }); // Don't choose
      }
    }
  };
  generateLineupPermutations(players, positionRequirements, emptyLineup);

  console.log("Lineup generation call count: ", calls);
  return optimalLineup!;
};

const calculateLineupValue = (lineup: TeamLineup): number => {
  return Object.values(lineup).reduce((sum, players) => {
    players.forEach((player) => {
      sum += player.stats.worth.abs;
    });
    return sum;
  }, 0);
};
