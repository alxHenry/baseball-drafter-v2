import type { TeamsById } from "./teamsSlice";

export const DEFAULT_TEAMS_COUNT = 10;
export const generateTeams = (numberOfTeams: number, startingIndex: number = 0) => {
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
