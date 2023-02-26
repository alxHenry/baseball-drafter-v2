"use client";

import { Body, Table } from "@table-library/react-table-library";
import { DEFAULT_OPTIONS, getTheme } from "@table-library/react-table-library/chakra-ui";
import { useTheme } from "@table-library/react-table-library/theme";
import { FC, memo } from "react";
import { type RotoRankings } from "../../../../data/state/useDerivedRotoRankings";
import { useRotoRankingsTableSort } from "./useRotoRankingsTableSort";
import { TeamRotoRankings, useRotoRankingsTableData } from "./useRotoRankingsTableData";
import { useRotoRankingsFilteredAndSortedStatIds } from "./useRotoRankingsFilteredAndSortedStatIds";
import RotoRankingsTeamRow from "./RotoRankingsTeamRow";
import RotoRankingsHeader from "./RotoRankingsHeader";

interface Props {}

const RotoRankings: FC<Props> = () => {
  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const tableTheme = useTheme(chakraTheme);

  const filteredAndSortedStatIds = useRotoRankingsFilteredAndSortedStatIds();
  const data = useRotoRankingsTableData();
  const sort = useRotoRankingsTableSort(data, filteredAndSortedStatIds);

  return (
    <Table data={data} sort={sort} theme={tableTheme}>
      {(tableList) => (
        <>
          <RotoRankingsHeader filteredAndSortedStatIds={filteredAndSortedStatIds} />
          <Body>
            {(tableList as TeamRotoRankings[]).map((item) => (
              <RotoRankingsTeamRow key={item.id} filteredAndSortedStatIds={filteredAndSortedStatIds} team={item} />
            ))}
          </Body>
        </>
      )}
    </Table>
  );
};

export default memo(RotoRankings);
