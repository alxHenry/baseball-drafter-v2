"use client";
import type { BattersById } from "../../../data/stores/playersSlice";

import { getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useStore } from "../../../data/stores/store";
import { useEffect, useState } from "react";
import { usePlayerTableRows } from "./usePlayerTableRows";
import { columns, PAGE_SIZE } from "./tableConfig";
import TableRows from "./TableRows";
import TableHeaders from "./TableHeaders";

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
        <thead>
          <TableHeaders headerGroups={table.getHeaderGroups()} />
        </thead>
        <tbody>
          <TableRows rows={table.getRowModel().rows} />
        </tbody>
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
