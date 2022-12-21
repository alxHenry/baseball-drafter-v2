import { useTeamsStore } from "../../stores/teamsStore";

export const useMyTeam = () => {
  const myTeamId = useTeamsStore((state) => state.userTeamId);
  const teamsById = useTeamsStore((state) => state.teamsById);

  const myTeam = teamsById[myTeamId];
  if (myTeam == null) {
    throw new Error(`Selecting a non-existant teamId from store. TeamId: ${myTeamId}`);
  }

  return teamsById[myTeamId];
};
