import type { StoreSet } from "../stores/store";

import { getCurrentPickingTeamId } from "../selectors/draftSelectors";

export type DraftPlayerAction = (playerId: string) => void;
export const getDraftPlayerToTeamAction = (set: StoreSet): DraftPlayerAction => {
  return (playerId) => {
    set((state) => {
      const { teamsById } = state.teamsSlice;

      const draftingTeamId = getCurrentPickingTeamId(state);
      return {
        teamsSlice: {
          ...state.teamsSlice,
          teamsById: {
            ...teamsById,
            [draftingTeamId]: {
              ...teamsById[draftingTeamId],
              playerIds: [...teamsById[draftingTeamId].playerIds, playerId],
            },
          },
        },
      };
    });
  };
};
