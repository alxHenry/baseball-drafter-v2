"use client";
import type { PlayersById } from "../../../data/stores/playersSlice";

import { useStore } from "../../../data/stores/store";
import { usePagination } from "@table-library/react-table-library/pagination";
import { useRef, useState } from "react";
import { usePlayerTableRows } from "./usePlayerTableRows";
import { PAGE_SIZE } from "./tableConfig";
import DraftPlayerListTable from "./DraftPlayerListTable";
import DraftPlayerDisplayModeSelect from "./DraftPlayerDisplayModeSelect";

interface Props {}

const DraftPlayerList = () => {
  const [shouldHideDrafted, setShouldHideDrafted] = useState(true);
  const [search, setSearch] = useState("");

  const playerRows = usePlayerTableRows({ shouldHideDrafted, search });

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
      <div>
        <label htmlFor="player-search">Search players: </label>
        <input
          id="player-search"
          name="player-search"
          type="text"
          value={search}
          onChange={(ev) => {
            setSearch(ev.currentTarget.value);
          }}
        />
      </div>
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

interface HydratorProps extends Props {
  playersById: PlayersById;
}

const DraftPlayerListWithHydrator = ({ playersById, ...rest }: HydratorProps) => {
  const initialized = useRef(false);
  if (!initialized.current) {
    useStore.setState((store) => ({
      ...store,
      playersSlice: {
        ...store.playersSlice,
        playersById,
      },
    }));
    initialized.current = true;
  }

  return <DraftPlayerList {...rest} />;
};

export default DraftPlayerListWithHydrator;
