"use client";

import { getMyTeamPlayers } from "../../../data/selectors/teamsSelectors";
import { useTeamsStore } from "../../../data/stores/teamsStore";

export default function TeamDisplay() {
  const myTeamsPlayers = useTeamsStore(getMyTeamPlayers);

  return <div>My team: {myTeamsPlayers.join(", ")}</div>;
}
