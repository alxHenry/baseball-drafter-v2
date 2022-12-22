"use client";
import styles from "./TeamDisplay.module.css";

import { getCurrentPickingTeamName, getCurrentPickingTeamsPlayers } from "../../../data/selectors/draftSelectors";
import { useTeamsStore } from "../../../data/stores/store";

export default function TeamDisplay() {
  const currentDraftingTeamsPlayers = useTeamsStore(getCurrentPickingTeamsPlayers);
  const currentDraftingTeamName = useTeamsStore(getCurrentPickingTeamName);

  return (
    <div className={styles.container}>
      <div>On the clock team: {currentDraftingTeamName}</div>
      <div>Players: {currentDraftingTeamsPlayers.join(", ")}</div>
    </div>
  );
}
