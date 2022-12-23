import type { Row } from "@tanstack/react-table";
import type { BatterPlayerRow } from "../../../data/stores/playersSlice";

import styles from "./TableRows.module.css";

import { flexRender } from "@tanstack/react-table";
import { FC, memo } from "react";

interface Props {
  readonly rows: Row<BatterPlayerRow>[];
}

const TableRows: FC<Props> = ({ rows }) => {
  const rowElems = rows.map((row) => {
    const isDrafted = row.original.draftedByTeamId !== null;
    const strikeThroughClass = isDrafted ? styles.strikethrough : "";

    return (
      <tr key={row.id} className={strikeThroughClass}>
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
        ))}
      </tr>
    );
  });

  return <>{rowElems}</>;
};

export default memo(TableRows);
