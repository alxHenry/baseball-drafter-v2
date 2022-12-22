import type { TeamsStore } from "../stores/teamsStore";

export const getCurrentPickingTeam = ({ currentPickTeamId }: TeamsStore) => {
  if (currentPickTeamId == null) {
    throw new Error("Reading the current picking team before the draft has been setup.");
  }
  return currentPickTeamId;
};

export const getCurrentPickingTeamsPlayers = ({ currentPickTeamId, teamsById }: TeamsStore) => {
  if (currentPickTeamId == null) {
    throw new Error("Reading the current picking teams players before the draft has been setup.");
  }
  return teamsById[currentPickTeamId].playerIds;
};
