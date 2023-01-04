import type { Player } from "../../../data/stores/playersSlice";

import styles from "./DraftPlayerListTableRow.module.css";

import { FC, memo, useMemo } from "react";
import { Cell, Row } from "@table-library/react-table-library";
import DraftButton from "./DraftButton";
import StatCell from "./StatCell";

interface Props {
  item: Player;
}

const DraftPlayerListTableRow: FC<Props> = ({ item }) => {
  const isDrafted = item.draftedByTeamId != null;
  const renderedStatCells = useMemo(() => {
    return Object.values(item.stats).map((stat) => <StatCell key={stat.id} stat={stat} />);
  }, [item.stats]);

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
