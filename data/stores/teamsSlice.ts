import { DraftPlayerAction, getDraftPlayerToTeamAction } from "../actions/teamsActions";
import { StatId } from "./playersSlice";

import type { StoreGet, StoreSet } from "./store";
import { DEFAULT_TEAMS_COUNT, generateTeams, transformTeamNamesToFullTeams } from "./teamsUtils";

export interface Team {
  readonly name: string;
  readonly id: string;
  readonly playerIds: string[];
}
export type TeamsById = Record<string, Team>;
export type TeamTotalStats = Partial<Record<StatId, number>>;

export interface TeamsSlice {
  // Properties
  readonly teamsById: TeamsById;
  readonly setupTeamNames: string[];
  readonly teamTotalStatsById: Record<string, TeamTotalStats>;

  // Methods
  readonly draftPlayer: DraftPlayerAction;
  readonly modifySetupTeam: (index: number, newName: string) => void;
  readonly changeSetupTeamCount: (desiredTeamCount: number) => void;
  readonly finalizeSetupTeams: () => void;
}

export const getTeamsSliceDefinitions = (set: StoreSet, get: StoreGet): TeamsSlice => ({
  teamsById: {},
  setupTeamNames: generateTeams(DEFAULT_TEAMS_COUNT),
  teamTotalStatsById: {},

  draftPlayer: getDraftPlayerToTeamAction(set, get),
  modifySetupTeam: (index, newName) => {
    set((state) => ({
      teamsSlice: {
        ...state.teamsSlice,
        setupTeamNames: [
          ...state.teamsSlice.setupTeamNames.slice(0, index),
          newName,
          ...state.teamsSlice.setupTeamNames.slice(index + 1),
        ],
      },
    }));
  },
  changeSetupTeamCount: (desiredTeamCount) => {
    set((state) => {
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
          teamsSlice: {
            ...state.teamsSlice,
            setupTeamNames: setupTeamNames.slice(0, desiredTeamCount),
          },
        };
      }
    });
  },
  finalizeSetupTeams: () => {
    set((state) => {
      const { setupTeamNames } = state.teamsSlice;
      const fullTeamObjects = transformTeamNamesToFullTeams(setupTeamNames);

      return {
        teamsSlice: {
          ...state.teamsSlice,
          teamsById: fullTeamObjects,
        },
        draftSlice: {
          ...state.draftSlice,
          currentPickTeamId: Object.keys(fullTeamObjects)[0],
        },
      };
    });
  },
});
