import type { Player } from "../../../data/stores/playersSlice";

import { Header, HeaderCell, HeaderRow } from "@table-library/react-table-library";
import { useMemo } from "react";
import { HeaderCellSort } from "@table-library/react-table-library/sort";
import { useStore } from "../../../data/stores/store";

const DEFAULT_HEADERS = [
  <HeaderCell key="name">Name</HeaderCell>,
  <HeaderCell key="team">Team</HeaderCell>,
  <HeaderCell key="position">Position</HeaderCell>,
];

const DRAFT_BUTTON = <HeaderCell key="draft-button" />;

export const useTableHeaders = () => {
  const batterStats = useStore((state) => state.draftSlice.batterStats);
  const pitcherStats = useStore((state) => state.draftSlice.pitcherStats);

  return useMemo(() => {
    // TODO: Make this work if you don't have equal batter and pitcher stats (who does that?)
    const statHeaders = batterStats.map((stat, index) => <HeaderCellSort key={stat} sortKey={stat}>{stat.toUpperCase()}</HeaderCellSort>);

    return (
      <Header>
        <HeaderRow>
          {DEFAULT_HEADERS}
          {statHeaders}
          {DRAFT_BUTTON}
        </HeaderRow>
      </Header>
    );
  }, [batterStats]);
};
