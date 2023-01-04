"use client";
import styles from "./TeamDisplay.module.css";

import {
  getCurrentPickingTeamId,
  getCurrentPickingTeamName,
  getCurrentPickingTeamsPlayers,
} from "../../../../data/selectors/teamsSelectors";
import { useStore } from "../../../../data/stores/store";
import TeamPlayersDisplay from "./TeamPlayersDisplay";
import TeamNeeds from "./TeamNeeds";

export default function TeamDisplay() {
  const currentDraftingTeamsPlayers = useStore(getCurrentPickingTeamsPlayers);
  const currentDraftingTeamName = useStore(getCurrentPickingTeamName);
  const currentDraftingTeamId = useStore(getCurrentPickingTeamId);

  return (
    <div className={styles.container}>
      <div>On the clock team: {currentDraftingTeamName}</div>
      <div>
        <TeamNeeds teamId={currentDraftingTeamId} />
      </div>
      <div>
        <TeamPlayersDisplay players={currentDraftingTeamsPlayers} />
      </div>
    </div>
  );
}
