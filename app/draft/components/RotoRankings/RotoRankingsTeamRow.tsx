import { Cell, Row } from "@table-library/react-table-library";
import { FC, memo, useMemo } from "react";
import { useStore } from "../../../../data/stores/store";
import { StatId } from "../../../../data/types/stats";
import { useRotoRankingsFilteredAndSortedStatIds } from "./useRotoRankingsFilteredAndSortedStatIds";
import { TeamRotoRankings } from "./useRotoRankingsTableData";

interface Props {
  readonly team: TeamRotoRankings;
}

const RotoRankingsTeamRow: FC<Props> = ({ team }) => {
  const isShowingRelative = useStore((state) => state.rotoRankingsSlice.isShowingRelative);

  const filteredAndSortedStatIds = useRotoRankingsFilteredAndSortedStatIds();

  // Iterate through properly ordered and filtered list then pull out of our team's rankings
  const renderedStatCells = useMemo(
    () =>
      Array.from(filteredAndSortedStatIds).map((statId) => {
        const tuple = team.rotoRankings[statId as StatId]!;
        const rank = tuple[0];
        const value = tuple[1];

        return <Cell key={statId}>{isShowingRelative ? rank : value}</Cell>;
      }),
    [filteredAndSortedStatIds, isShowingRelative, team.rotoRankings]
  );

  return (
    <Row key={team.id} item={team}>
      <Cell>{team.name}</Cell>
      {renderedStatCells}
    </Row>
  );
};

export default memo(RotoRankingsTeamRow);
