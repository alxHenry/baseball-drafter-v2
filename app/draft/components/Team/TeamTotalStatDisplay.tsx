import styles from "./TeamPlayersDisplay.module.css";

import { FC, memo } from "react";
import { getStatDisplay, getStatIsDisplayed } from "../../../../data/selectors/draftSelectors";
import { useStore } from "../../../../data/stores/store";
import { StatId } from "../../../../data/types/stats";

interface Props {
  readonly statId: StatId;
  readonly statValue: number;
}

const TeamTotalStatDisplay: FC<Props> = ({ statId, statValue }) => {
  const statDisplay = useStore(getStatDisplay(statId));
  const shouldShow = useStore(getStatIsDisplayed(statId));

  if (!shouldShow) {
    return null;
  }

  return <div key={statId} className={styles.listCell}>{`${statDisplay}: ${statValue}`}</div>;
};

export default memo(TeamTotalStatDisplay);
