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
import { useStore } from "../../../../data/stores/store";

const CHECKBOX_ID = "rank-checkbox";

interface Props {}

const RotoRankings: FC<Props> = () => {
  const toggleIsShowingRelative = useStore((state) => state.rotoRankingsSlice.toggleIsShowingRelative);
  const isShowingRelative = useStore((state) => state.rotoRankingsSlice.isShowingRelative);

  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const tableTheme = useTheme(chakraTheme);

  const data = useRotoRankingsTableData();
  const sort = useRotoRankingsTableSort(data);

  return (
    <>
      <div>
        <label htmlFor={CHECKBOX_ID}>Show relative value? </label>
        <input type="checkbox" id="CHECKBOX_ID" checked={isShowingRelative} onChange={toggleIsShowingRelative} />
      </div>
      <Table data={data} sort={sort} theme={tableTheme}>
        {(tableList) => (
          <>
            <RotoRankingsHeader />
            <Body>
              {(tableList as TeamRotoRankings[]).map((item) => (
                <RotoRankingsTeamRow key={item.id} team={item} />
              ))}
            </Body>
          </>
        )}
      </Table>
    </>
  );
};

export default memo(RotoRankings);
