import { Data } from "@table-library/react-table-library";
import { SortFn, useSort } from "@table-library/react-table-library/sort";

import { useMemo } from "react";

const EMPTY_FUNC = () => {};

export const useRotoRankingsTableSort = (data: Data, filteredAndSortedStatIds: string[]) => {
  const sortOptions = useMemo(
    () => ({
      sortFns: filteredAndSortedStatIds.reduce<Record<string, SortFn>>((agg, statId) => {
        agg[statId] = (array) =>
          array.sort((a, b) => {
            return a.rotoRankings[statId][1] - b.rotoRankings[statId][1];
          });
        return agg;
      }, {}),
    }),
    [filteredAndSortedStatIds]
  );
  const stateAndChange = useMemo(
    () => ({
      onChange: EMPTY_FUNC,
    }),
    []
  );

  return useSort(data, stateAndChange, sortOptions);
};
