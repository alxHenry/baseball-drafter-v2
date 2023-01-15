import { getCurrentPickingTeamId } from "../selectors/teamsSelectors";
import { Store } from "../stores/store";

export const getStateWithTabulatedTotalStats = (state: Store, playerId: string) => {
  const { teamTotalStatsById } = state.teamsSlice;
  const { playersById } = state.playersSlice;
  const draftingTeamId = getCurrentPickingTeamId(state);
  const player = playersById[playerId];

  // Tabulate stats
  const teamTotalStats = teamTotalStatsById[draftingTeamId];
  const newTotalStats = { ...teamTotalStats };
  Object.values(player.stats).forEach((stat) => {
    newTotalStats[stat.id] = (newTotalStats[stat.id] ?? 0) + stat.abs;
  });

  return {
    ...state,
    teamsSlice: {
      ...state.teamsSlice,
      teamTotalStatsById: {
        ...teamTotalStatsById,
        [draftingTeamId]: newTotalStats,
      },
    },
  };
};
