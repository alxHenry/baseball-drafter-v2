"use client";
import type { BatterPlayerRow, BattersById } from "../../../data/stores/playersSlice";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useStore } from "../../../data/stores/store";
import DraftButton from "./DraftButton";
import { useEffect, useMemo, useState } from "react";
import { usePlayerTableRows } from "./usePlayerTableRows";

const PAGE_SIZE = 10;
const columnHelper = createColumnHelper<BatterPlayerRow>();
const columns = [
  columnHelper.accessor("name", { header: "Name" }),
  columnHelper.accessor("avg", { header: "avg" }),
  columnHelper.accessor("hr", { header: "hr" }),
  columnHelper.display({
    id: "draft-button",
    cell: (props) => {
      if (props.row.original.draftedByTeamId !== null) {
        return;
      }
      return <DraftButton playerId={props.row.original.id} />;
    },
  }),
  columnHelper.accessor("draftedByTeamId", {}),
];

interface Props {}

const DraftPlayerList = () => {
  const [shouldHideDrafted, setShouldHideDrafted] = useState(true);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const playerRows = usePlayerTableRows({ shouldHideDrafted });
  const table = useReactTable({
    data: playerRows,
    columns,
    state: {
      pagination: {
        pageIndex: currentPageIndex,
        pageSize: PAGE_SIZE,
      },
      columnVisibility: {
        draftedByTeamId: false,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
  const rows = table.getRowModel().rows.map((row) => {
    return (
      <tr key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
        ))}
      </tr>
    );
  });

  const numPages = Math.ceil(playerRows.length / PAGE_SIZE);
  const isOnLastPage = currentPageIndex + 1 === numPages;

  return (
    <div>
      <div>
        <label htmlFor="hide-drafted">Hide drafted players: </label>
        <input
          type="checkbox"
          id="hide-drafted"
          name="hide-drafted"
          checked={shouldHideDrafted}
          onChange={() => {
            setShouldHideDrafted((prev) => !prev);
          }}
        />
      </div>
      <table>
        <thead>{headers}</thead>
        <tbody>{rows}</tbody>
      </table>
      <div>
        <button
          disabled={currentPageIndex === 0}
          onClick={() => {
            setCurrentPageIndex((prev) => prev - 1);
          }}
        >
          Previous Page
        </button>
        <button
          disabled={isOnLastPage}
          onClick={() => {
            setCurrentPageIndex((prev) => prev + 1);
          }}
        >
          Next Page
        </button>
      </div>
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
