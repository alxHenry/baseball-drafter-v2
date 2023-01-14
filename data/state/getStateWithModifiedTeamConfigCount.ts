import { Store } from "../stores/store";
import { generateTeams } from "../stores/teamsUtils";

export const getStateWithModifiedTeamConfigCount = (state: Store, desiredTeamCount: number) => {
  const { setupTeamNames } = state.teamsSlice;

  const currentTeamsCount = setupTeamNames.length;
  if (currentTeamsCount === desiredTeamCount) {
    return state;
  } else if (currentTeamsCount < desiredTeamCount) {
    const teamsToGenerateCount = desiredTeamCount - currentTeamsCount;
    return {
      teamsSlice: {
        ...state.teamsSlice,
        setupTeamNames: [...setupTeamNames, ...generateTeams(teamsToGenerateCount, currentTeamsCount)],
      },
    };
  } else {
    return {
      ...state,
      teamsSlice: {
        ...state.teamsSlice,
        setupTeamNames: setupTeamNames.slice(0, desiredTeamCount),
      },
    };
  }
};
