import { TOTAL_KEY } from "../types/rotoRankings";
import { defaultSelectedBatterStats, defaultSelectedPitcherStats } from "../types/statConfig";
import { TeamTotalStats } from "../types/stats";
import { Store } from "./store";
import type { TeamsById } from "./teamsSlice";

export const DEFAULT_TEAMS_COUNT = 10;
export const generateTeams = (numberOfTeams: number, startingIndex: number = 0) => {
  return new Array(numberOfTeams).fill("").map((_, index) => `Team-${startingIndex + index}`);
};

// Need a default value for teams by id so that the server prefetch and build can render the page without errors
export const DEFAULT_TEAM_ID = "default-team";
export const DEFAULT_TEAMS_BY_ID = { [DEFAULT_TEAM_ID]: { name: DEFAULT_TEAM_ID, id: DEFAULT_TEAM_ID, playerIds: [] } };

const DEFAULT_STAT_TO_TOTAL = [
  ...defaultSelectedBatterStats,
  ...defaultSelectedPitcherStats,
  TOTAL_KEY,
].reduce<TeamTotalStats>((agg, stat) => {
  agg[stat] = 0;
  return agg;
}, {});
export const DEFAULT_TEAM_TOTAL_STATS_BY_ID = { [DEFAULT_TEAM_ID]: DEFAULT_STAT_TO_TOTAL };

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

export const getStoreWithDefaultStatesRemoved = (store: Store): Store => {
  // Need to manually clear out the default store states so that when the merge occurs we don't get default states and real states together
  delete store.teamsSlice.teamsById[DEFAULT_TEAM_ID];
  delete store.teamsSlice.teamTotalStatsById[DEFAULT_TEAM_ID];

  return store;
};
