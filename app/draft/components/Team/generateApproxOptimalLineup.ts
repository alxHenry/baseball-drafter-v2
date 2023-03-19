import { Player } from "../../../../data/stores/playersSlice";
import { PositionId } from "../../../../data/types/positions";

const positionToPriority: Record<string, number> = {
  C: 1,
  "3B": 2,
  OF: 3,
  "2B": 4,
  SS: 5,
  MI: 6,
  "1B": 7,
  CI: 8,
  IF: 9,
  UT: 10,
  DH: 11,
  SP: 12,
  RP: 13,
  P: 14,
};

export type TeamLineup = Partial<Record<PositionId, Player[]>>;

interface GenerateApproxOptimalLineup {
  readonly players: Player[];
  readonly positionRequirements: Record<PositionId, number>;
}

// TODO: Wouldn't hurt to break this beast apart and add some unit tests.
export const generateApproxOptimalLineup = ({
  players: playersOrig,
  positionRequirements,
}: GenerateApproxOptimalLineup): TeamLineup => {
  const players = [...playersOrig];
  const finalLineup = Object.keys(positionRequirements).reduce<TeamLineup>((agg, position) => {
    agg[position as PositionId] = [];
    return agg;
  }, {});
  const placedPlayers = new Set<string>();
  const remainingRequirements = structuredClone(positionRequirements);

  const worthSortedPlayers = players.sort((a, b) => b.stats.worth.abs - a.stats.worth.abs);
  const positionsToFillPrioritySorted = Object.entries(remainingRequirements)
    .flatMap(([pos, count]) => {
      if (count === 0) {
        return [];
      }
      return pos;
    })
    .sort((a, b) => positionToPriority[a] - positionToPriority[b]);

  const playersWithSingleEligibility: Player[] = [];
  const playersWithMultiEligibility: Player[] = [];
  worthSortedPlayers.forEach((player) => {
    if (player.position.length <= 1) {
      playersWithSingleEligibility.push(player);
    } else {
      playersWithMultiEligibility.push(player);
    }
  });
  const positionToSoleEligibilityPlayers = playersWithSingleEligibility.reduce<Record<string, Player[]>>(
    playersToPositionEligibilityRecordReducer,
    {}
  );
  const positionToMultiEligiblePlayers = playersWithMultiEligibility.reduce<Record<string, Player[]>>(
    playersToPositionEligibilityRecordReducer,
    {}
  );

  // First place single eligiblity players. This guarantees placement for high value single position guys.
  positionsToFillPrioritySorted.forEach((positionToFill) => {
    // Highest valued player will always be first
    const eligiblePlayers = positionToSoleEligibilityPlayers[positionToFill] ?? [];
    for (let i = 0; i < eligiblePlayers.length && remainingRequirements[positionToFill as PositionId] > 0; i++) {
      const eligiblePlayer = eligiblePlayers[i];
      if (placedPlayers.has(eligiblePlayer.id)) {
        continue;
      }

      // We should never have a conflict where a higher value player needs to replace a lower value
      // because of the sort and each player only having one position eligibility

      appendPlayerToLineup(eligiblePlayer, positionToFill, finalLineup, placedPlayers, remainingRequirements);
    }
  });

  // Now place multi eligiblility players and handle conflicts
  positionsToFillPrioritySorted.forEach((positionToFill) => {
    // Highest valued player will always be first
    const eligiblePlayers = positionToMultiEligiblePlayers[positionToFill] ?? [];
    eligiblePlayers.forEach((eligiblePlayer) => {
      if (placedPlayers.has(eligiblePlayer.id)) {
        return;
      }

      // Place players until requried count is met
      if (remainingRequirements[positionToFill as PositionId] > 0) {
        appendPlayerToLineup(eligiblePlayer, positionToFill, finalLineup, placedPlayers, remainingRequirements);
        return;
      }

      // Handle conflicts where spots are filled with lower valued players. A conflict with a lower value multi eligible player
      // wouldn't be an issue because that player will get evaluated to be placed at their future position.
      // Because of this, we don't actually have to do any further swapping.
      const currentlyPlacedPlayers = finalLineup[positionToFill as PositionId]!;
      const firstIndexOfLowerValuedPlayer = currentlyPlacedPlayers.findIndex(
        (player) => player.stats.worth.abs < eligiblePlayer.stats.worth.abs
      );
      if (firstIndexOfLowerValuedPlayer > 0) {
        replacePlayerInLineup(
          eligiblePlayer,
          positionToFill,
          firstIndexOfLowerValuedPlayer,
          finalLineup,
          placedPlayers
        );
        return;
      }
    });
  });

  return finalLineup;
};

const appendPlayerToLineup = (
  player: Player,
  position: string,
  finalLineup: TeamLineup,
  placedPlayers: Set<string>,
  remainingRequirements: Record<PositionId, number>
) => {
  finalLineup[position as PositionId]!.push(player);
  placedPlayers.add(player.id);
  remainingRequirements[position as PositionId]--;
};

const replacePlayerInLineup = (
  player: Player,
  position: string,
  replaceIndex: number,
  finalLineup: TeamLineup,
  placedPlayers: Set<string>
) => {
  const playerToReplace = finalLineup[position as PositionId]![replaceIndex];
  finalLineup[position as PositionId]!.splice(replaceIndex, 1, player);
  placedPlayers.delete(playerToReplace.id);
  placedPlayers.add(player.id);
};

const playersToPositionEligibilityRecordReducer = (agg: Record<string, Player[]>, player: Player) => {
  player.position.forEach((positionId) => {
    agg[positionId] = agg[positionId] ?? [];
    agg[positionId].push(player);
  });
  return agg;
};
