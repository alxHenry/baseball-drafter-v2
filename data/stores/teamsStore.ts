import type { DraftSlice } from "./draftSlice";

import create from "zustand";
import { MY_INITIAL_TEAM, MY_MOCK_TEAM_ID } from "../mock";
import { getCurrentPickingTeamId } from "../selectors/draftSelectors";
import { getDraftSliceDefinitions } from "./draftSlice";
import { DEFAULT_TEAMS_COUNT, generateTeams, transformTeamNamesToFullTeams } from "./teamsUtils";

export type TeamsById = Record<string, Team>;

export interface TeamsStore {
  // Properties
  readonly teamsById: TeamsById;
  readonly setupTeamNames: string[];

  // Methods
  readonly draftPlayer: (playerId: string) => void;
  readonly modifySetupTeam: (index: number, newName: string) => void;
  readonly changeSetupTeamCount: (desiredTeamCount: number) => void;
  readonly finalizeSetupTeams: () => void;

  // Slices
  readonly draftSlice: DraftSlice;
}

export interface Team {
  readonly name: string;
  readonly id: string;
  readonly playerIds: string[];
}

export type StoreSet = (
  partial: TeamsStore | Partial<TeamsStore> | ((state: TeamsStore) => TeamsStore | Partial<TeamsStore>),
  replace?: boolean | undefined
) => void;

export const useTeamsStore = create<TeamsStore>((set: StoreSet) => ({
  teamsById: { [MY_MOCK_TEAM_ID]: MY_INITIAL_TEAM },
  setupTeamNames: generateTeams(DEFAULT_TEAMS_COUNT),

  draftPlayer: (playerId) =>
    set((state) => {
      const draftingTeamId = getCurrentPickingTeamId(state);
      return {
        teamsById: {
          ...state.teamsById,
          [draftingTeamId]: {
            ...state.teamsById[draftingTeamId],
            playerIds: [...state.teamsById[draftingTeamId].playerIds, playerId],
          },
        },
      };
    }),
  modifySetupTeam: (index, newName) => {
    set((state) => ({
      setupTeamNames: [...state.setupTeamNames.slice(0, index), newName, ...state.setupTeamNames.slice(index + 1)],
    }));
  },
  changeSetupTeamCount: (desiredTeamCount) => {
    set((state) => {
      const currentTeamsCount = state.setupTeamNames.length;
      if (currentTeamsCount === desiredTeamCount) {
        return state;
      } else if (currentTeamsCount < desiredTeamCount) {
        const teamsToGenerateCount = desiredTeamCount - currentTeamsCount;
        return {
          setupTeamNames: [...state.setupTeamNames, ...generateTeams(teamsToGenerateCount, currentTeamsCount)],
        };
      } else {
        return {
          setupTeamNames: state.setupTeamNames.slice(0, desiredTeamCount),
        };
      }
    });
  },
  finalizeSetupTeams: () => {
    set((state) => {
      const fullTeamObjects = transformTeamNamesToFullTeams(state.setupTeamNames);

      return {
        teamsById: fullTeamObjects,
        draftSlice: {
          ...state.draftSlice,
          currentPickTeamId: Object.keys(fullTeamObjects)[0],
        },
      };
    });
  },

  draftSlice: getDraftSliceDefinitions(set),
}));
