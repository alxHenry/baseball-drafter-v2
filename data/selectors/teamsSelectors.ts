import type { TeamsStore } from "../stores/teamsStore";

export const getCurrentPickingTeamId = ({ currentPickTeamId }: TeamsStore) => {
  if (currentPickTeamId == null) {
    throw new Error("Reading the current picking team id before the draft has been setup.");
  }
  return currentPickTeamId;
};

export const getCurrentPickingTeamName = ({ currentPickTeamId, teamsById }: TeamsStore) => {
  if (currentPickTeamId == null) {
    throw new Error("Reading the current picking team name before the draft has been setup.");
  }
  return teamsById[currentPickTeamId].name;
};

export const getCurrentPickingTeamsPlayers = ({ currentPickTeamId, teamsById }: TeamsStore) => {
  if (currentPickTeamId == null) {
    throw new Error("Reading the current picking teams players before the draft has been setup.");
  }
  return teamsById[currentPickTeamId].playerIds;
};
