import { HeaderCellSort } from "@table-library/react-table-library/sort";
import { Header, HeaderCell, HeaderRow } from "@table-library/react-table-library";

import { FC, memo } from "react";
import { useRotoRankingsFilteredAndSortedStatIds } from "./useRotoRankingsFilteredAndSortedStatIds";

const NAME_KEY = "Name";

interface Props {}

const RotoRankingsHeader: FC<Props> = () => {
  const filteredAndSortedStatIds = useRotoRankingsFilteredAndSortedStatIds();

  const headers = Array.from(filteredAndSortedStatIds).map((statId) => (
    <HeaderCellSort key={statId} sortKey={statId}>
      {statId}
    </HeaderCellSort>
  ));
  headers.unshift(<HeaderCell key={NAME_KEY}>{NAME_KEY}</HeaderCell>);

  return (
    <Header>
      <HeaderRow>{headers}</HeaderRow>
    </Header>
  );
};

export default memo(RotoRankingsHeader);
