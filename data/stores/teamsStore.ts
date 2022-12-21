import create from "zustand";
import { MY_INITIAL_TEAM, MY_MOCK_TEAM_ID } from "../mock";

export interface TeamsStore {
  // Properties
  readonly userTeamId: string;
  readonly teamsById: Record<string, Team>;

  // Methods
  readonly draftPlayer: (teamId: string, playerId: string) => void;
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
}));
