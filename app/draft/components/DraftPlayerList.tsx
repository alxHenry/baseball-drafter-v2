"use client";

import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { BatterPlayerRow } from "../../../data/transforms/player";
import DraftButton from "./DraftButton";

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

interface Props {
  playerRows: BatterPlayerRow[];
}

const DraftPlayerList = ({ playerRows }: Props) => {
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

export default DraftPlayerList;
