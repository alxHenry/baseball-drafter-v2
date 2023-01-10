import type { SortFn } from "@table-library/react-table-library/types/sort";
import type { Player } from "../../../data/stores/playersSlice";
import type { TableData } from "./DraftPlayerListTable";

import { useMemo } from "react";

export const useTableSortFns = (data: TableData): Record<string, SortFn> => {
  const firstNodeStats = data.nodes[0]?.stats;

  return useMemo(() => {
    if (firstNodeStats == null) {
      return {};
    }

    return Object.values(firstNodeStats).reduce<Record<string, SortFn>>((agg, stat) => {
      agg[stat.id] = (array) =>
        array.sort((a, b) => {
          const playerA = a as Player;
          const playerB = b as Player;

          return playerB.stats[stat.id].rel - playerA.stats[stat.id].rel;
        });

      return agg;
    }, {});
  }, [firstNodeStats]);
};
