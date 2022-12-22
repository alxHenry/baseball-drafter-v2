import type { StoreSet } from "../stores/store";

import { getCurrentPickingTeamId } from "../selectors/draftSelectors";

export type DraftPlayerAction = (playerId: string) => void;
export const getDraftPlayerToTeamAction = (set: StoreSet): DraftPlayerAction => {
  return (playerId) => {
    set((state) => {
      const { teamsById } = state.teamsSlice;
      const { battersById } = state.playersSlice;
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
        playersSlice: {
          ...state.playersSlice,
          battersById: {
            ...battersById,
            [playerId]: {
              ...battersById[playerId],
              draftedByTeamId: draftingTeamId,
            },
          },
        },
      };
    });
  };
};
