import { useMemo } from "react";
import { getTeamsPlayersSelector } from "../../../../data/selectors/teamsSelectors";
import { Player } from "../../../../data/stores/playersSlice";
import { useStore } from "../../../../data/stores/store";
import { PositionId } from "../../../../data/types/positions";

export const useTeamLineupData = (): TeamLineup => {
  const teamId = useStore((store) => store.teamsSlice.teamDisplaySelectedId);
  const players = useStore(getTeamsPlayersSelector(teamId));
  const positionRequirements = useStore((store) => store.setupSlice.positionCounts);

  return useMemo(() => generateOptimalLineup({ players, positionRequirements }), [players, positionRequirements]);
};

interface GenerateOptimalLineupArgs {
  readonly players: Player[];
  readonly positionRequirements: Record<PositionId, number>;
}
