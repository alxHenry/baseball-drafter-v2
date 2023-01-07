"use client";

import styles from "./DraftTracker.module.css";

import { FC, memo, useRef } from "react";
import shallow from "zustand/shallow";
import { useStore } from "../../../../data/stores/store";
import DraftTrackerCard from "./DraftTrackerCard";
import DraftTrackerArrow from "./DraftTrackerArrow";

interface Props {}

const DraftTracker: FC<Props> = () => {
  const scrollRef = useRef(null);
  const teamIds = useStore((state) => Object.keys(state.teamsSlice.teamsById), shallow);
  const renderedCards = teamIds.map((teamId) => <DraftTrackerCard key={teamId} teamId={teamId} />);

  const startScrollArrow = <DraftTrackerArrow isStartArrow={true} scrollRef={scrollRef} />;
  const endScrollArrow = <DraftTrackerArrow isStartArrow={false} scrollRef={scrollRef} />;

  return (
    <div className={styles.container} ref={scrollRef}>
      {startScrollArrow}
      {renderedCards}
      {endScrollArrow}
    </div>
  );
};

export default memo(DraftTracker);
