import styles from "./DraftPlayerListTableRow.module.css";

import type { BatterPlayerRow } from "../../../data/stores/playersSlice";

import { FC, memo } from "react";
import { Cell, Row } from "@table-library/react-table-library";
import DraftButton from "./DraftButton";

interface Props {
  item: BatterPlayerRow;
}

const DraftPlayerListTableRow: FC<Props> = ({ item }) => {
  const isDrafted = item.draftedByTeamId != null;

  return (
    <Row key={item.id} item={item} className={isDrafted ? styles.strikethrough : ""}>
      <Cell>{item.name}</Cell>
      <Cell>{item.avg}</Cell>
      <Cell>{item.hr}</Cell>
      <Cell>{isDrafted ? null : <DraftButton playerId={item.id} />}</Cell>
    </Row>
  );
};

export default memo(DraftPlayerListTableRow);
