import { TeamsStore } from "../stores/teamsStore";

export const getMyTeam = (state: TeamsStore) => {
  const { teamsById, userTeamId } = state;

  const myTeam = teamsById[userTeamId];
  if (myTeam == null) {
    throw new Error(`Selecting a non-existant teamId from store. TeamId: ${userTeamId}`);
  }

  return teamsById[userTeamId];
};

export const getMyTeamPlayers = (state: TeamsStore) => {
  const myTeam = getMyTeam(state);
  return myTeam.playerIds;
};
