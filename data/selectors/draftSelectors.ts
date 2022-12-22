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
}: Store) => {
  if (currentPickTeamId == null) {
    throw new Error("Reading the current picking teams players before the draft has been setup.");
  }
  return teamsById[currentPickTeamId].playerIds;
};
