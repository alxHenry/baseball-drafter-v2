"use client";
import styles from "./TeamDisplay.module.css";

import { getTeamNameSelector } from "../../../../data/selectors/teamsSelectors";
import { useStore } from "../../../../data/stores/store";
import TeamNeeds from "./TeamNeeds";
import { FC, memo } from "react";
import TeamDisplayTable from "./TeamDisplayTable";

interface Props {}

const TeamDisplay: FC<Props> = () => {
  const teamId = useStore((store) => store.teamsSlice.teamDisplaySelectedId);
  const teamName = useStore(getTeamNameSelector(teamId));

  return (
    <div className={styles.container}>
      <h3>{teamName}</h3>
      <div>
        <TeamNeeds teamId={teamId} />
      </div>
      <div>
        <TeamDisplayTable />
      </div>
    </div>
  );
};

export default memo(TeamDisplay);
