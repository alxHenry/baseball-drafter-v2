import { StatId } from "../stores/playersSlice";
import { Store } from "../stores/store";
import { TeamTotalStats, TeamTotalStatsById } from "../stores/teamsSlice";

export const getStateWithInitializeTeamTotalStatsById = (state: Store): Store => {
  const teamIds = Object.keys(state.teamsSlice.teamsById);
  const statIds = [
    ...Object.keys(state.draftSlice.batterStatsById),
    ...Object.keys(state.draftSlice.pitcherStatsById),
    ...Object.keys(state.draftSlice.requiredStatsById),
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
