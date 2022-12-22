import create from "zustand";
import { MY_INITIAL_TEAM, MY_MOCK_TEAM_ID } from "../mock";

type TeamsById = Record<string, Team>;

export interface TeamsStore {
  // Properties
  readonly userTeamId: string;
  readonly teamsById: TeamsById;

  // Methods
  readonly draftPlayer: (teamId: string, playerId: string) => void;
  readonly setupNewEmptyTeams: (teamNames: string[]) => void;
}

export interface Team {
  readonly name: string;
  readonly id: string;
  readonly playerIds: string[];
}

export const useTeamsStore = create<TeamsStore>((set) => ({
  userTeamId: MY_MOCK_TEAM_ID,
  teamsById: { [MY_MOCK_TEAM_ID]: MY_INITIAL_TEAM },
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
  setupNewEmptyTeams: (teamNames) => {
    const teamsById = teamNames.reduce<TeamsById>((agg, teamName, index) => {
      const teamId = `team-${index}`;
      agg[teamId] = {
        name: teamName,
        id: teamId,
        playerIds: [],
      };

      return agg;
    }, {});

    set((state) => ({
      teamsById,
    }));
  },
}));
