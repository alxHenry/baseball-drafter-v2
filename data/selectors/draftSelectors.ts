import type { Store } from "../stores/store";

export const getCurrentPickingTeamId = ({ draftSlice: { currentPickTeamId } }: Store) => {
  if (currentPickTeamId == null) {
    throw new Error("Reading the current picking team id before the draft has been setup.");
  }
  return currentPickTeamId;
};
