"use client";
import styles from "./TeamDisplay.module.css";

import { getCurrentPickingTeamName, getCurrentPickingTeamsPlayers } from "../../../data/selectors/teamsSelectors";
import { useStore } from "../../../data/stores/store";
import shallow from "zustand/shallow";
import TeamPlayersDisplay from "./TeamPlayersDisplay";

export default function TeamDisplay() {
  const currentDraftingTeamsPlayers = useStore(getCurrentPickingTeamsPlayers, shallow);
  const currentDraftingTeamName = useStore(getCurrentPickingTeamName);

  const playersDisplay = <TeamPlayersDisplay players={currentDraftingTeamsPlayers} />;

  return (
    <div className={styles.container}>
      <div>On the clock team: {currentDraftingTeamName}</div>
      <div>{playersDisplay}</div>
    </div>
  );
}
