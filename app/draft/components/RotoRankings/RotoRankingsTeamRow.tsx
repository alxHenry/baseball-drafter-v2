import { Cell, Row } from "@table-library/react-table-library";
import { FC, memo } from "react";
import { StatId } from "../../../../data/types/stats";
import { TeamRotoRankings } from "./useRotoRankingsTableData";

interface Props {
  readonly filteredAndSortedStatIds: string[];
  readonly team: TeamRotoRankings;
}

const RotoRankingsTeamRow: FC<Props> = ({ filteredAndSortedStatIds, team }) => {
  // Iterate through properly ordered and filtered list then pull out of our team's rankings
  const renderedStatCells = filteredAndSortedStatIds.map((statId) => {
    const tuple = team.rotoRankings[statId as StatId]!;
    const rank = tuple[0];
    const value = tuple[1];

    return <Cell key={statId}>{rank}</Cell>;
  });

  return (
    <Row key={team.id} item={team}>
      <Cell>{team.name}</Cell>
      {renderedStatCells}
    </Row>
  );
};

export default memo(RotoRankingsTeamRow);
