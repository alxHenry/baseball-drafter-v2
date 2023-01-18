import { FC, memo } from "react";
import { getStatDisplay, getStatIsDisplayed } from "../../../../data/selectors/draftSelectors";
import { Stat } from "../../../../data/stores/playersSlice";
import { useStore } from "../../../../data/stores/store";
import StatDisplayValue from "../StatDisplayValue";

import styles from "./TeamPlayersDisplay.module.css";

interface Props {
  readonly stat: Stat;
}

const PlayerStatDisplay: FC<Props> = ({ stat }) => {
  const statDisplay = useStore(getStatDisplay(stat.id));
  const showStat = useStore(getStatIsDisplayed(stat.id));

  if (!showStat) {
    return null;
  }

  return (
    <div key={stat.id} className={styles.listCell}>
      {statDisplay}: <StatDisplayValue stat={stat} />
    </div>
  );
};

export default PlayerStatDisplay;
