import type { Player } from "../../../data/stores/playersSlice";

import { Header, HeaderCell, HeaderRow } from "@table-library/react-table-library";
import { useMemo } from "react";
import { HeaderCellSort } from "@table-library/react-table-library/sort";

const DEFAULT_HEADERS = [
  <HeaderCell key="name">Name</HeaderCell>,
  <HeaderCell key="team">Team</HeaderCell>,
  <HeaderCell key="position">Position</HeaderCell>,
];

const DRAFT_BUTTON = <HeaderCell key="draft-button" />;

export const useTableHeaders = (nodes: Player[]) => {
  const firstNodeStats = nodes[0]?.stats;

  return useMemo(() => {
    if (firstNodeStats == null) {
      return (
        <Header>
          <HeaderRow>
            {DEFAULT_HEADERS}
            {DRAFT_BUTTON}
          </HeaderRow>
        </Header>
      );
    }
    const statHeaders = Object.values(firstNodeStats).map((stat) => (
      <HeaderCellSort key={stat.id} sortKey={stat.id}>
        {stat.display}
      </HeaderCellSort>
    ));

    return (
      <Header>
        <HeaderRow>
          {DEFAULT_HEADERS}
          {statHeaders}
          {DRAFT_BUTTON}
        </HeaderRow>
      </Header>
    );
  }, [firstNodeStats]);
};
