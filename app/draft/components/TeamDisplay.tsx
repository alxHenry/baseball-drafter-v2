"use client";

import { getCurrentPickingTeamsPlayers } from "../../../data/selectors/teamsSelectors";
import { useTeamsStore } from "../../../data/stores/teamsStore";

export default function TeamDisplay() {
  const currentDraftingTeamsPlayers = useTeamsStore(getCurrentPickingTeamsPlayers);

  return <div>On the clock team: {currentDraftingTeamsPlayers.join(", ")}</div>;
}
