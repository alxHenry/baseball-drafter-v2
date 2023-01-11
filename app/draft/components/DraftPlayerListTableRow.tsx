import type { Player } from "../../../data/stores/playersSlice";

import styles from "./DraftPlayerListTableRow.module.css";

import { FC, memo, useMemo } from "react";
import { Cell, Row } from "@table-library/react-table-library";
import DraftButton from "./DraftButton";
import StatCell from "./StatCell";
import { useStore } from "../../../data/stores/store";

interface Props {
  item: Player;
}

const DraftPlayerListTableRow: FC<Props> = ({ item }) => {
  const batterStats = useStore((state) => state.draftSlice.batterStats);

  const isDrafted = item.draftedByTeamId != null;
  const renderedStatCells = useMemo(() => {
    return batterStats.map((stat) => {
      const statData = item.stats[stat]!;
      return <StatCell key={statData.id} stat={statData} />;
    });
  }, [batterStats, item.stats]);

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
