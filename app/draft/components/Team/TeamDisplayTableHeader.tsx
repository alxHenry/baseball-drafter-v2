import { Header, HeaderCell, HeaderRow } from "@table-library/react-table-library";
import { FC, memo, useMemo } from "react";
import { useRotoRankingsFilteredAndSortedStatIds } from "../RotoRankings/useRotoRankingsFilteredAndSortedStatIds";

interface Props {}

const TeamDisplayTableHeader: FC<Props> = () => {
  const filteredAndSortedStatIds = useRotoRankingsFilteredAndSortedStatIds();

  const headers = useMemo(() => {
    const elems = Array.from(filteredAndSortedStatIds).map((statId) => (
      <HeaderCell key={statId} sortKey={statId}>
        {statId}
      </HeaderCell>
    ));
    elems.unshift(<HeaderCell key="Position">Position</HeaderCell>, <HeaderCell key="Name">Name</HeaderCell>);

    return elems;
  }, [filteredAndSortedStatIds]);

  return (
    <Header>
      <HeaderRow>{headers}</HeaderRow>
    </Header>
  );
};

export default memo(TeamDisplayTableHeader);
