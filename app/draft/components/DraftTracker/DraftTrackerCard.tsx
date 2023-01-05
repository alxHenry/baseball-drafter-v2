import styles from "./DraftTrackerCard.module.css";

import { FC, memo } from "react";
import shallow from "zustand/shallow";
import { getTeamsPositionNeedsSelector } from "../../../../data/selectors/teamsSelectors";
import { useStore } from "../../../../data/stores/store";

interface Props {
  teamId: string;
}

const DraftTrackerCard: FC<Props> = ({ teamId }) => {
  const teamName = useStore((state) => state.teamsSlice.teamsById[teamId].name);
  const teamNeeds = useStore((state) => getTeamsPositionNeedsSelector(teamId)(state), shallow);

  const needsString = Object.entries(teamNeeds).reduce((agg, [positionId, neededCount]) => {
    let separator = agg.length === 0 ? "" : ",";
    return neededCount > 0 ? `${agg}${separator} ${positionId}` : agg;
  }, "");

  return (
    <div className={styles.container}>
      <div>{teamName}</div>
      <div>Needs: {needsString}</div>
    </div>
  );
};

export default memo(DraftTrackerCard);
