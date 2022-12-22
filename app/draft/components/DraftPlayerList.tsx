"use client";
import type { BatterPlayerRow, BattersById } from "../../../data/stores/playersSlice";

import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useStore } from "../../../data/stores/store";
import DraftButton from "./DraftButton";
import { useEffect, useMemo } from "react";
import { usePlayerTableRows } from "./usePlayerTableRows";

const columnHelper = createColumnHelper<BatterPlayerRow>();
const columns = [
  columnHelper.accessor("name", { header: "Name" }),
  columnHelper.accessor("avg", { header: "avg" }),
  columnHelper.accessor("hr", { header: "hr" }),
  columnHelper.display({
    id: "draft-button",
    cell: (props) => <DraftButton row={props.row} />,
  }),
];

interface Props {}

const DraftPlayerList = () => {
  const playerRows = usePlayerTableRows();
  const table = useReactTable({
    data: playerRows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const headers = table.getHeaderGroups().map((headerGroup) => {
    return (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
        ))}
      </tr>
    );
  });
  const rows = table.getRowModel().rows.map((row) => (
    <tr key={row.id}>
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
      ))}
    </tr>
  ));

  return (
    <div>
      <table>
        <thead>{headers}</thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

interface HydratorProps extends Props {
  battersById: BattersById;
}

const DraftPlayerListWithHydrator = ({ battersById, ...rest }: HydratorProps) => {
  const hydratePlayers = useStore((state) => state.playersSlice.hydratePlayers);

  useEffect(() => {
    hydratePlayers(battersById);
  }, [battersById, hydratePlayers]);

  return <DraftPlayerList {...rest} />;
};

export default DraftPlayerListWithHydrator;
