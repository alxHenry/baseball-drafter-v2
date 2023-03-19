import { useMemo } from "react";
import { getTeamsPlayersSelector } from "../../../../data/selectors/teamsSelectors";
import { useStore } from "../../../../data/stores/store";
import { generateApproxOptimalLineup, TeamLineup } from "./generateApproxOptimalLineup";

export const useOptimalTeamLineupData = (): TeamLineup => {
  const teamId = useStore((store) => store.teamsSlice.teamDisplaySelectedId);
  const players = useStore(getTeamsPlayersSelector(teamId));
  const positionRequirements = useStore((store) => store.setupSlice.positionCounts);

  return useMemo(() => generateApproxOptimalLineup({ players, positionRequirements }), [players, positionRequirements]);
};
