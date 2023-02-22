"use client";

import { usePagination } from "@table-library/react-table-library/pagination";
import { useDeferredValue, useState } from "react";
import { usePlayerTableRows } from "./usePlayerTableRows";
import { PAGE_SIZE } from "./tableConfig";
import DraftPlayerListTable from "./DraftPlayerListTable";
import DraftPlayerDisplayModeSelect from "./DraftPlayerDisplayModeSelect";
import DraftPlayerListSearchFilterInput from "./DraftPlayerListSearchFilterInput";

const DraftPlayerList = () => {
  const [shouldHideDrafted, setShouldHideDrafted] = useState(true);
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const playerRows = usePlayerTableRows({ shouldHideDrafted, search: deferredSearch });

  const pagination = usePagination(playerRows, {
    state: {
      page: 0,
      size: PAGE_SIZE,
    },
  });
  const currentPage = pagination.state.page;
  const isOnFirstPage = currentPage === 0;
  const isOnLastPage = currentPage === pagination.state.getTotalPages(playerRows.nodes);

  return (
    <div>
      <DraftPlayerDisplayModeSelect />
      <DraftPlayerListSearchFilterInput searchValue={search} setSearchFilter={setSearch} />
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
      <DraftPlayerListTable data={playerRows} pagination={pagination} />
      <div>
        <button
          disabled={isOnFirstPage}
          onClick={() => {
            pagination.fns.onSetPage(currentPage - 1);
          }}
        >
          Previous Page
        </button>
        <button
          disabled={isOnLastPage}
          onClick={() => {
            pagination.fns.onSetPage(currentPage + 1);
          }}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default DraftPlayerList;
