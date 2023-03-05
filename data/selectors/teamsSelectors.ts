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

export const getTeamsPlayersSelector = (teamId: string) => (store: Store) => {
  const {
    teamsSlice: { teamsById },
    playersSlice: { playersById },
  } = store;

  const playerIds = teamsById[teamId].playerIds;
  return playerIds.map((playerId) => playersById[playerId]);
};

// Note: This will re-render everytime unless a custom comparison method is passed due to creating a new object everytime
export const getTeamsPositionNeedsSelector = (teamId: string) => (store: Store) => {
  const {
    setupSlice: { positionCounts },
  } = store;

  const requiredPositionCounts = { ...positionCounts };
  const teamsPlayers = getTeamsPlayersSelector(teamId)(store);

  // TODO: getTeamNeeds supporting multiple positions, requires algorithm to fill the roster
  Object.values(teamsPlayers).forEach((player) => {
    requiredPositionCounts[player.position]--; // TODO: This will not work for palyers with multiple positions and will need to be changed
  });

  return requiredPositionCounts;
};

export const getTeamIds = (store: Store) => {
  const {
    teamsSlice: { teamsById },
  } = store;
  return Object.keys(teamsById);
};

export const getTeamIdAndNameTuple = (store: Store) => {
  const {
    teamsSlice: { teamsById },
  } = store;
  return Object.values(teamsById).map((team) => [team.id, team.name]);
};

export const getTeamNames = (store: Store) => {
  const {
    teamsSlice: { teamsById },
  } = store;
  return Object.values(teamsById).map((team) => team.name);
};

export const getIdsToTeamNames = (store: Store) => {
  const {
    teamsSlice: { teamsById },
  } = store;
  return Object.values(teamsById).reduce<Record<string, string>>((agg, team) => {
    agg[team.id] = team.name;
    return agg;
  }, {});
};

export const getTeamNameSelector = (teamId: string) => (store: Store) => {
  return store.teamsSlice.teamsById[teamId].name;
};

export const getTeamStatsSelector = (teamId: string) => (store: Store) => {
  return store.teamsSlice.teamTotalStatsById[teamId];
};
