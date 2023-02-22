"use client";
import styles from "./TeamDisplay.module.css";

import { getTeamNameSelector } from "../../../../data/selectors/teamsSelectors";
import { useStore } from "../../../../data/stores/store";
import TeamPlayersDisplay from "./TeamPlayersDisplay";
import TeamNeeds from "./TeamNeeds";
import { FC, memo } from "react";

interface Props {
  teamId: string;
}

const TeamDisplay: FC<Props> = ({ teamId }) => {
  const teamName = useStore(getTeamNameSelector(teamId));

  return (
    <div className={styles.container}>
      <h3>{teamName}</h3>
      <div>
        <TeamNeeds teamId={teamId} />
      </div>
      <div>
        <TeamPlayersDisplay teamId={teamId} />
      </div>
    </div>
  );
};

export default memo(TeamDisplay);
