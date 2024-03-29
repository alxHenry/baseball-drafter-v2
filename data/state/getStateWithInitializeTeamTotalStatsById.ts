import { Store } from "../stores/store";
import { StatId, TeamTotalStats, TeamTotalStatsById } from "../types/stats";

export const getStateWithInitializeTeamTotalStatsById = (state: Store): Store => {
  const teamIds = Object.keys(state.teamsSlice.teamsById);
  const statIds = [
    ...Object.keys(state.draftSlice.batterStatConfigsById),
    ...Object.keys(state.draftSlice.pitcherStatConfigsById),
    ...Object.keys(state.draftSlice.requiredStatConfigsById),
  ];

  const teamTotalStatsById = teamIds.reduce<TeamTotalStatsById>((agg, teamId) => {
    const totalStatsById = statIds.reduce<TeamTotalStats>((agg, statId) => {
      agg[statId as StatId] = 0;
      return agg;
    }, {});

    agg[teamId] = totalStatsById;
    return agg;
  }, {});

  return {
    ...state,
    teamsSlice: {
      ...state.teamsSlice,
      teamTotalStatsById,
    },
  };
};
