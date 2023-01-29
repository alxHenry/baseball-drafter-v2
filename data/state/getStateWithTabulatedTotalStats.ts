import { getIsStatSelected } from "../selectors/draftSelectors";
import { getCurrentPickingTeamId } from "../selectors/teamsSelectors";
import { Store } from "../stores/store";
import { getStatConfig } from "../types/statConfig";
import { Calculator, StatId } from "../types/stats";

export const getStateWithTabulatedTotalStats = (state: Store, playerId: string) => {
  const { batterStatConfigsById, pitcherStatConfigsById, requiredStatConfigsById } = state.draftSlice;
  const { teamTotalStatsById } = state.teamsSlice;
  const { playersById } = state.playersSlice;
  const draftingTeamId = getCurrentPickingTeamId(state);
  const player = playersById[playerId];

  const teamTotalStats = teamTotalStatsById[draftingTeamId];
  const newTotalStats = { ...teamTotalStats };

  const statsToCalculateAfterSumming: [StatId, Calculator][] = [];
  Object.values(player.stats).forEach((stat) => {
    const isStatSelected = getIsStatSelected(stat.id)(state);
    if (isStatSelected === false) {
      // TODO: Reconsider thinking about how we determine what stats go where in store. Right now the stat configs selected OR required all go into the state as one field.
      // This makes it hard to tease apart whether something was selected as a cat or it's something we always have.
      return;
    }

    const { calculator } = getStatConfig(
      stat.id,
      batterStatConfigsById,
      pitcherStatConfigsById,
      requiredStatConfigsById
    );
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
