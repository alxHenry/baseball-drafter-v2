import type { Store, StoreGet, StoreSet } from "../stores/store";

import { getCurrentPickingTeamId } from "../selectors/draftSelectors";

// TODO: Find a way to break up this action in zustand, it does way too much. Maybe have functions
// that operate on the state and return the new state after their operation? Then it gets set at the end.
export type DraftPlayerAction = (playerId: string) => void;
export const getDraftPlayerToTeamAction = (set: StoreSet, get: StoreGet): DraftPlayerAction => {
  return (playerId) => {
    set((state) => {
      const { teamsById, teamTotalStatsById } = state.teamsSlice;
      const { playersById } = state.playersSlice;
      const draftingTeamId = getCurrentPickingTeamId(state);
      const player = playersById[playerId];

      // Tabulate stats
      const teamTotalStats = teamTotalStatsById[draftingTeamId] ?? {};
      const newTotalStats = { ...teamTotalStats };
      Object.values(player.stats).forEach((stat) => {
        newTotalStats[stat.id] = (newTotalStats[stat.id] ?? 0) + stat.abs;
      });

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
          teamTotalStatsById: {
            ...teamTotalStatsById,
            [draftingTeamId]: newTotalStats,
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
    });
  };
};
