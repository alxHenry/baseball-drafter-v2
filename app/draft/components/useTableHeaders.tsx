import type { BatterPlayerRow } from "../../../data/stores/playersSlice";

import { Header, HeaderCell, HeaderRow } from "@table-library/react-table-library";
import { useMemo } from "react";

const DEFAULT_HEADERS = [<HeaderCell key="name">Name</HeaderCell>, <HeaderCell key="team">Team</HeaderCell>];

const DRAFT_BUTTON = <HeaderCell key="draft-button" />;

export const useTableHeaders = (nodes: BatterPlayerRow[]) => {
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
      <HeaderCell key={stat.id}>{stat.display}</HeaderCell>
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
