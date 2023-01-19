import { getCurrentPickingTeamId } from "../selectors/teamsSelectors";
import { Calculator, getStatConfig } from "../stores/draftSlice";
import { StatId } from "../stores/playersSlice";
import { Store } from "../stores/store";

export const getStateWithTabulatedTotalStats = (state: Store, playerId: string) => {
  const { batterStatsById, pitcherStatsById, requiredStatsById } = state.draftSlice;
  const { teamTotalStatsById } = state.teamsSlice;
  const { playersById } = state.playersSlice;
  const draftingTeamId = getCurrentPickingTeamId(state);
  const player = playersById[playerId];

  const teamTotalStats = teamTotalStatsById[draftingTeamId];
  const newTotalStats = { ...teamTotalStats };

  const statsToCalculateAfterSumming: [StatId, Calculator][] = [];
  Object.values(player.stats).forEach((stat) => {
    const { calculator } = getStatConfig(stat.id, batterStatsById, pitcherStatsById, requiredStatsById);
    if (calculator != null) {
      statsToCalculateAfterSumming.push([stat.id, calculator]);
      return;
    }
    newTotalStats[stat.id] = (newTotalStats[stat.id] ?? 0) + stat.abs;
  });
  statsToCalculateAfterSumming.forEach(([statId, calculator]) => {
    newTotalStats[statId] = calculator(newTotalStats);
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
