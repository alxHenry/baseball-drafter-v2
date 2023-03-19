import { Cell, Row } from "@table-library/react-table-library";
import { FC, memo, useMemo } from "react";
import { StatId } from "../../../../data/types/stats";
import { useRotoRankingsFilteredAndSortedStatIds } from "../RotoRankings/useRotoRankingsFilteredAndSortedStatIds";
import { TeamTableRowData } from "./useTeamDisplayTableData";

interface Props {
  readonly item: TeamTableRowData;
}

const TeamDisplayTableRow: FC<Props> = ({ item: { player, positionId } }) => {
  const { id, name = "" } = player;
  const filteredAndSortedStatIds = useRotoRankingsFilteredAndSortedStatIds();

  const renderedStatCells = useMemo(() => {
    const elems = Array.from(filteredAndSortedStatIds).map((statId) => (
      <Cell key={statId}>{player?.stats?.[statId as StatId]?.abs ?? ""}</Cell>
    ));

    return elems;
  }, [filteredAndSortedStatIds, player.stats]);

  return (
    <Row key={id} item={player}>
      <Cell>{positionId}</Cell>
      <Cell>{name}</Cell>
      {renderedStatCells}
    </Row>
  );
};

export default memo(TeamDisplayTableRow);
