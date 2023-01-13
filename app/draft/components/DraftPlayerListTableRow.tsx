import type { PitcherStatId, Player } from "../../../data/stores/playersSlice";

import styles from "./DraftPlayerListTableRow.module.css";

import { FC, memo, useMemo } from "react";
import { Cell, Row } from "@table-library/react-table-library";
import DraftButton from "./DraftButton";
import StatCell from "./StatCell";
import { useStore } from "../../../data/stores/store";
import { isPlayerPitcher } from "../../utils/isPlayerPitcher";
import { requiredStats } from "../../../data/stores/draftSlice";

interface Props {
  item: Player;
}

const DraftPlayerListTableRow: FC<Props> = ({ item }) => {
  const batterStats = useStore((state) => state.draftSlice.batterStats);
  const pitcherStats = useStore((state) => state.draftSlice.pitcherStats);

  const isDrafted = item.draftedByTeamId != null;

  // TODO: Support position array and shohei otani
  const renderedStatCells = useMemo(() => {
    const requiredStatCells = [
      <StatCell key={item.stats.worth.id} stat={item.stats.worth} />,
      <StatCell key={item.stats.aWorth.id} stat={item.stats.aWorth} />,
    ];

    let playerStatCells = [];
    if (isPlayerPitcher(item.position)) {
      playerStatCells = pitcherStats.map((stat) => {
        const statData = item.stats[stat]!;
        return <StatCell key={statData.id} stat={statData} />;
      });
    } else {
      playerStatCells = batterStats.map((stat) => {
        const statData = item.stats[stat]!;
        return <StatCell key={statData.id} stat={statData} />;
      });
    }

    return [...playerStatCells, ...requiredStatCells];
  }, [item.position, item.stats, pitcherStats, batterStats]);

  return (
    <Row key={item.id} item={item} className={isDrafted ? styles.strikethrough : ""}>
      <Cell>{item.name}</Cell>
      <Cell>{item.team}</Cell>
      <Cell>{item.position}</Cell>
      {renderedStatCells}
      <Cell>{isDrafted ? null : <DraftButton playerId={item.id} />}</Cell>
    </Row>
  );
};

export default memo(DraftPlayerListTableRow);
