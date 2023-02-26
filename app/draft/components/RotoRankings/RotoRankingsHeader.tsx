import { HeaderCellSort } from "@table-library/react-table-library/sort";
import { Header, HeaderCell, HeaderRow } from "@table-library/react-table-library";

import { FC, memo } from "react";

const NAME_KEY = "Name";

interface Props {
  readonly filteredAndSortedStatIds: string[];
}

const RotoRankingsHeader: FC<Props> = ({ filteredAndSortedStatIds }) => {
  const headers = filteredAndSortedStatIds.map((statId) => (
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
