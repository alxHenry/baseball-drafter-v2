import create from "zustand";
import { MY_INITIAL_TEAM, MY_MOCK_TEAM_ID } from "../mock";

export const DEFAULT_TEAMS_COUNT = 10;
const generateTeams = (numberOfTeams: number, startingIndex: number = 0) => {
  return new Array(numberOfTeams).fill("").map((_, index) => `Team-${startingIndex + index}`);
};

type TeamsById = Record<string, Team>;

export interface TeamsStore {
  // Properties
  readonly userTeamId: string;
  readonly teamsById: TeamsById;
  readonly setupTeamNames: string[];

  // Methods
  readonly draftPlayer: (teamId: string, playerId: string) => void;
  readonly modifySetupTeam: (index: number, newName: string) => void;
  readonly changeSetupTeamCount: (desiredTeamCount: number) => void;
}

export interface Team {
  readonly name: string;
  readonly id: string;
  readonly playerIds: string[];
}

export const useTeamsStore = create<TeamsStore>((set) => ({
  userTeamId: MY_MOCK_TEAM_ID,
  teamsById: { [MY_MOCK_TEAM_ID]: MY_INITIAL_TEAM },
  setupTeamNames: generateTeams(DEFAULT_TEAMS_COUNT),

  draftPlayer: (teamId, playerId) =>
    set((state) => ({
      teamsById: {
        ...state.teamsById,
        [teamId]: {
          ...state.teamsById[teamId],
          playerIds: [...state.teamsById[teamId].playerIds, playerId],
        },
      },
    })),
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
}));
