"use client";
import type { BattersById } from "../../../data/stores/playersSlice";

import styles from "./DraftPlayerList.module.css";

import { useStore } from "../../../data/stores/store";
import { usePagination } from "@table-library/react-table-library/pagination";
import { useEffect, useState } from "react";
import { usePlayerTableRows } from "./usePlayerTableRows";
import { PAGE_SIZE } from "./tableConfig";
import { Body, Cell, Header, HeaderCell, HeaderRow, Row, Table } from "@table-library/react-table-library";
import DraftButton from "./DraftButton";

interface Props {}

const DraftPlayerList = () => {
  const [shouldHideDrafted, setShouldHideDrafted] = useState(true);
  const playerRows = usePlayerTableRows({ shouldHideDrafted });

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

      <Table data={playerRows} pagination={pagination}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>AVG</HeaderCell>
                <HeaderCell>HR</HeaderCell>
                <HeaderCell></HeaderCell>
              </HeaderRow>
            </Header>
            <Body>
              {tableList.map((item) => {
                const isDrafted = item.draftedByTeamId != null;
                return (
                  <Row key={item.id} item={item} className={isDrafted ? styles.strikethrough : ""}>
                    <Cell>{item.name}</Cell>
                    <Cell>{item.avg}</Cell>
                    <Cell>{item.hr}</Cell>
                    <Cell>{isDrafted ? null : <DraftButton playerId={item.id} />}</Cell>
                  </Row>
                );
              })}
            </Body>
          </>
        )}
      </Table>

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
