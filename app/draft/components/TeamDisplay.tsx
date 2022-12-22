"use client";
import styles from "./TeamDisplay.module.css";

import { getCurrentPickingTeamName, getCurrentPickingTeamsPlayers } from "../../../data/selectors/teamsSelectors";
import { useStore } from "../../../data/stores/store";
import shallow from "zustand/shallow";

export default function TeamDisplay() {
  const currentDraftingTeamsPlayers = useStore(getCurrentPickingTeamsPlayers, shallow);
  const currentDraftingTeamName = useStore(getCurrentPickingTeamName);

  const playersDisplay = currentDraftingTeamsPlayers.map((player) => {
    return (
      <>
        <hr />
        <div key={player.id}>
          <div>Name: {player.name}</div>
          <div>AVG: {player.avg}</div>
          <div>HR: {player.hr}</div>
        </div>
      </>
    );
  });

  return (
    <div className={styles.container}>
      <div>On the clock team: {currentDraftingTeamName}</div>
      <div>{playersDisplay}</div>
    </div>
  );
}
