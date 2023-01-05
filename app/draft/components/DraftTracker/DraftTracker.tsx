"use client";

import styles from "./DraftTracker.module.css";

import { FC, memo } from "react";
import shallow from "zustand/shallow";
import { useStore } from "../../../../data/stores/store";
import DraftTrackerCard from "./DraftTrackerCard";
import DraftTrackerEndArrow from "./DraftTrackerEndArrow";

interface Props {}

const DraftTracker: FC<Props> = () => {
  const teamIds = useStore((state) => Object.keys(state.teamsSlice.teamsById), shallow);
  const renderedCards = teamIds.map((teamId) => <DraftTrackerCard key={teamId} teamId={teamId} />);
  const endScrollArrow = <DraftTrackerEndArrow />;

  return (
    <div className={styles.container}>
      {renderedCards}
      {endScrollArrow}
    </div>
  );
};

export default memo(DraftTracker);
