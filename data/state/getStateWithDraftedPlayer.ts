import { getCurrentPickingTeamId } from "../selectors/teamsSelectors";
import { Store } from "../stores/store";

export const getStateWithDraftedPlayer = (state: Store, playerId: string) => {
  const draftingTeamId = getCurrentPickingTeamId(state);
  const {
    teamsSlice: { teamsById },
    playersSlice: { playersById },
  } = state;

  return {
    ...state,
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
      playersById: {
        ...playersById,
        [playerId]: {
          ...playersById[playerId],
          draftedByTeamId: draftingTeamId,
        },
      },
    },
  };
};
