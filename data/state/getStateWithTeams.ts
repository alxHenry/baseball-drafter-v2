import { Store } from "../stores/store";
import { transformTeamNamesToFullTeams } from "../stores/teamsUtils";

export const getStateWithTeams = (state: Store): Store => {
  const fullTeamObjects = transformTeamNamesToFullTeams(state.teamsSlice.setupTeamNames);

  return {
    ...state,
    teamsSlice: {
      ...state.teamsSlice,
      teamsById: fullTeamObjects,
    },
    draftSlice: {
      ...state.draftSlice,
      currentPickTeamId: Object.keys(fullTeamObjects)[0],
    },
  };
};
