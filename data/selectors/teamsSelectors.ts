import type { Store } from "../stores/store";

export const getCurrentPickingTeamId = ({ draftSlice: { currentPickTeamId } }: Store) => {
  if (currentPickTeamId == null) {
    throw new Error("Reading the current picking team id before the draft has been setup.");
  }
  return currentPickTeamId;
};

export const getCurrentPickingTeamName = ({ draftSlice: { currentPickTeamId }, teamsSlice: { teamsById } }: Store) => {
  if (currentPickTeamId == null) {
    throw new Error("Reading the current picking team name before the draft has been setup.");
  }
  return teamsById[currentPickTeamId].name;
};

export const getCurrentPickingTeamsPlayers = ({
  draftSlice: { currentPickTeamId },
  teamsSlice: { teamsById },
  playersSlice: { battersById },
}: Store) => {
  if (currentPickTeamId == null) {
    throw new Error("Reading the current picking teams players before the draft has been setup.");
  }
  const playerIds = teamsById[currentPickTeamId].playerIds;
  return playerIds.map((playerId) => battersById[playerId]);
};

export const getTeamsPlayersSelector = (teamId: string) => (store: Store) => {
  const {
    teamsSlice: { teamsById },
    playersSlice: { battersById },
  } = store;

  const playerIds = teamsById[teamId].playerIds;
  return playerIds.map((playerId) => battersById[playerId]);
};

// Note: This will re-render everytime unless a custom comparison method is passed due to creating a new object everytime
export const getTeamsPositionNeedsSelector = (teamId: string) => (store: Store) => {
  const {
    setupSlice: { positionCounts },
  } = store;

  const requiredPositionCounts = { ...positionCounts };
  const teamsPlayers = getTeamsPlayersSelector(teamId)(store);

  Object.values(teamsPlayers).forEach((player) => {
    requiredPositionCounts[player.position]--; // TODO: This will not work for palyers with multiple positions and will need to be changed
  });

  return requiredPositionCounts;
};
