import styles from "./DraftPlayerListTableRow.module.css";

import { Player } from "../../../data/stores/playersSlice";
import { FC, memo, useMemo } from "react";
import { Cell, Row } from "@table-library/react-table-library";
import DraftButton from "./DraftButton";
import StatCell from "./StatCell";
import { useStore } from "../../../data/stores/store";
import { PitcherStatId, StatConfig, StatId } from "../../../data/types/stats";
import { isBatterEligiblePosition, isPitcherEligiblePosition, isPitcherFilter } from "../../../data/types/positions";

interface Props {
  item: Player;
}

const getStatCellElements = (player: Player, stats: Partial<Record<StatId, StatConfig>>) => {
  return Object.entries(stats).map(([stat, config]) => {
    if (config.isDisplayed === false) {
      return null;
    }

    const statId = stat as PitcherStatId;
    const statData = player.stats[statId]!;
    return <StatCell key={statId} stat={statData} />;
  });
};

const DraftPlayerListTableRow: FC<Props> = ({ item }) => {
  const batterStats = useStore((state) => state.draftSlice.batterStatConfigsById);
  const pitcherStats = useStore((state) => state.draftSlice.pitcherStatConfigsById);
  const requiredStats = useStore((state) => state.draftSlice.requiredStatConfigsById);
  const currentTableDisplayMode = useStore((state) => state.draftSlice.currentTableDisplayMode);

  const isDrafted = item.draftedByTeamId != null;

  const renderedStatCells = useMemo(() => {
    const requiredStatCells = getStatCellElements(item, requiredStats);

    let playerStatCells = [];
    const isPitcherEligible = isPitcherEligiblePosition(item.position);
    const isBatterEligible = isBatterEligiblePosition(item.position);
    if (isPitcherEligible && isBatterEligible) {
      if (isPitcherFilter(currentTableDisplayMode)) {
        playerStatCells = getStatCellElements(item, pitcherStats);
      } else {
        playerStatCells = getStatCellElements(item, batterStats);
      }
    } else if (isPitcherEligible) {
      playerStatCells = getStatCellElements(item, pitcherStats);
    } else {
      playerStatCells = getStatCellElements(item, batterStats);
    }

    return [...playerStatCells, ...requiredStatCells];
  }, [requiredStats, item, batterStats, pitcherStats, currentTableDisplayMode]);

  return (
    <Row key={item.id} item={item} className={isDrafted ? styles.strikethrough : ""}>
      <Cell>{item.name}</Cell>
      <Cell>{item.team}</Cell>
      <Cell>{item.position.join("/")}</Cell>
      {renderedStatCells}
      <Cell>{isDrafted ? null : <DraftButton playerId={item.id} />}</Cell>
    </Row>
  );
};

export default memo(DraftPlayerListTableRow);
