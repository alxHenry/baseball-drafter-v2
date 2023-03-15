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

  const memo: Record<string, number> = {};
  let globalMaxValue = 0;
  let optimalLineup: TeamLineup;
  let calls = 0;

  const pickNextPlayer = (
    players: Player[],
    positionRequirements: Record<PositionId, number>,
    lineupBuilder: TeamLineup
  ) => {
    const key = JSON.stringify([playersStringify(players), positionRequirements]); // This stringification could be much more efficient, but I don't think that will save us
    if (memo[key] != null) {
      return;
    }

    calls++;

    // Base case
    if (players.length === 0) {
      const value = calculateLineupValue(lineupBuilder);
      if (value > globalMaxValue) {
        globalMaxValue = value;
        optimalLineup = structuredClone(lineupBuilder);
      }
      memo[key] = value;
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

        pickNextPlayer(playersWithoutPlayer, positionRequirementsDecremented, chosenLineup);
        chosenLineup[position]?.pop(); // Unchoose to reset our state for the next call
        pickNextPlayer(playersWithoutPlayer, { ...positionRequirements }, { ...lineupBuilder });
      }
    }
  };
  pickNextPlayer(players, positionRequirements, emptyLineup);

  console.log("Lineup generation call count: ", calls);
  return optimalLineup!;
};

const calculateLineupValue = (lineup: TeamLineup): number => {
  return Object.values(lineup).reduce((sum, players) => {
    players.forEach((player) => {
      sum += player.stats.aWorth.abs; // Worth is more likely to be negative, so use adjusted worth
    });
    return sum;
  }, 0);
};

const playersStringify = (players: Player[]) => {
  return players.map((player) => player.id).join(",");
};
