import { getCurrentPickingTeamId } from "../selectors/draftSelectors";
import type { StoreGet, StoreSet } from "./store";
import { DEFAULT_TEAMS_COUNT, generateTeams, transformTeamNamesToFullTeams } from "./teamsUtils";

export interface Team {
  readonly name: string;
  readonly id: string;
  readonly playerIds: string[];
}
export type TeamsById = Record<string, Team>;

export interface TeamsSlice {
  // Properties
  readonly teamsById: TeamsById;
  readonly setupTeamNames: string[];

  // Methods
  readonly draftPlayer: (playerId: string) => void;
  readonly modifySetupTeam: (index: number, newName: string) => void;
  readonly changeSetupTeamCount: (desiredTeamCount: number) => void;
  readonly finalizeSetupTeams: () => void;
}

export const getTeamsSliceDefinitions = (set: StoreSet, get: StoreGet): TeamsSlice => ({
  teamsById: {},
  setupTeamNames: generateTeams(DEFAULT_TEAMS_COUNT),

  draftPlayer: (playerId) =>
    set((state) => {
      const { teamsById } = state.teamsSlice;

      const draftingTeamId = getCurrentPickingTeamId(state);
      return {
        teamsSlice: {
          ...state.teamsSlice,
          teamsById: {
            ...teamsById,
            [draftingTeamId]: {
              ...teamsById[draftingTeamId],
              playerIds: [...teamsById[draftingTeamId].playerIds, playerId],
            },
          },
        },
      };
    }),
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
