import { Store } from "../stores/store";
import { DEFAULT_TEAM_ID, transformTeamNamesToFullTeams } from "../stores/teamsUtils";

export const getStateWithTeams = (state: Store): Store => {
  const fullTeamObjects = transformTeamNamesToFullTeams(state.teamsSlice.setupTeamNames);
  const firstTeamId = Object.keys(fullTeamObjects)[0] ?? DEFAULT_TEAM_ID;

  return {
    ...state,
    teamsSlice: {
      ...state.teamsSlice,
      teamsById: fullTeamObjects,
      teamDisplaySelectedId: firstTeamId,
    },
    draftSlice: {
      ...state.draftSlice,
      currentPickTeamId: Object.keys(fullTeamObjects)[0],
    },
  };
};
