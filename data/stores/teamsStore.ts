import create from "zustand";
import { MY_INITIAL_TEAM, MY_MOCK_TEAM_ID } from "../mock";
import { getCurrentPickingTeamId } from "../selectors/teamsSelectors";

export const DEFAULT_TEAMS_COUNT = 10;
const generateTeams = (numberOfTeams: number, startingIndex: number = 0) => {
  return new Array(numberOfTeams).fill("").map((_, index) => `Team-${startingIndex + index}`);
};

export const transformTeamNamesToFullTeams = (setupTeamNames: string[]) => {
  return setupTeamNames.reduce<TeamsById>((agg, teamName, index) => {
    const teamId = `team-${index}`;
    agg[teamId] = {
      id: teamId,
      name: teamName,
      playerIds: [],
    };

    return agg;
  }, {});
};

type TeamsById = Record<string, Team>;

export interface DraftSlice {
  // Methods
  readonly advanceDraft: () => void;
}

export interface TeamsStore {
  // Properties
  readonly currentPickTeamId: string | null;
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

export const useTeamsStore = create<TeamsStore>((set) => ({
  currentPickTeamId: null,
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
        currentPickTeamId: Object.keys(fullTeamObjects)[0],
      };
    });
  },

  draftSlice: {
    advanceDraft: () => {
      set(({ teamsById, currentPickTeamId }) => {
        const draftOrderKeys = Object.keys(teamsById);
        const currentPickIndex = draftOrderKeys.findIndex((key) => key === currentPickTeamId);
        const nextTeam = draftOrderKeys[(currentPickIndex + 1) % draftOrderKeys.length];

        return {
          currentPickTeamId: nextTeam,
        };
      });
    },
  },
}));
