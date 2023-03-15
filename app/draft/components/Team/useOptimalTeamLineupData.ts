import { useMemo } from "react";
import { getTeamsPlayersSelector } from "../../../../data/selectors/teamsSelectors";
import { useStore } from "../../../../data/stores/store";
// import { generateOptimalLineup, TeamLineup } from "./generateOptimalLineup";
import { generateOptimalLineup, TeamLineup } from "./generateOptimalLineupHuman";
// import { generateOptimalLineupDP, TeamLineup } from "./generateOptimalLineupDP";

export const useOptimalTeamLineupData = (): TeamLineup => {
  const teamId = useStore((store) => store.teamsSlice.teamDisplaySelectedId);
  const players = useStore(getTeamsPlayersSelector(teamId));
  const positionRequirements = useStore((store) => store.setupSlice.positionCounts);

  return useMemo(() => generateOptimalLineup({ players, positionRequirements }), [players, positionRequirements]);
};
