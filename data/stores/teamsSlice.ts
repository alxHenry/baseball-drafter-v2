import { getStateWithDraftedPlayer } from "../state/getStateWithDraftedPlayer";
import { getStateWithModifiedTeamConfigCount } from "../state/getStateWithModifiedTeamConfigCount";
import { getStateWithTabulatedTotalStats } from "../state/getStateWithTabulatedTotalStats";
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
  readonly draftPlayer: (playerId: string) => void;
  readonly modifySetupTeam: (index: number, newName: string) => void;
  readonly changeSetupTeamCount: (desiredTeamCount: number) => void;
  readonly finalizeSetupTeams: () => void;
}

export const getTeamsSliceDefinitions = (set: StoreSet, get: StoreGet): TeamsSlice => ({
  teamsById: {},
  setupTeamNames: generateTeams(DEFAULT_TEAMS_COUNT),
  teamTotalStatsById: {},

  draftPlayer: (playerId: string) => {
    set((state) => {
      const stateWithUpdatedStats = getStateWithTabulatedTotalStats(state, playerId);
      const stateWithDraftedPlayer = getStateWithDraftedPlayer(stateWithUpdatedStats, playerId);

      return stateWithDraftedPlayer;
    });
  },
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
      return getStateWithModifiedTeamConfigCount(state, desiredTeamCount);
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
