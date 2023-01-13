import { SortFn } from "@table-library/react-table-library/types/sort";
import { Player, StatId } from "../../../data/stores/playersSlice";
import { useMemo } from "react";
import { useStore } from "../../../data/stores/store";
import { requiredStats } from "../../../data/stores/draftSlice";

const playerStatReducer = (agg: Record<string, SortFn>, stat: StatId) => {
  agg[stat] = (array) =>
    array.sort((a, b) => {
      const playerA = a as Player;
      const playerB = b as Player;

      return playerB.stats[stat]!.rel - playerA.stats[stat]!.rel;
    });

  return agg;
};

export const useTableSortFns = (): Record<string, SortFn> => {
  const batterStats = useStore((state) => state.draftSlice.batterStats);
  const pitcherStats = useStore((state) => state.draftSlice.pitcherStats);
  const tableDisplayMode = useStore((state) => state.draftSlice.currentTableDisplayMode);

  return useMemo(() => {
    if (tableDisplayMode === "All") {
      return requiredStats.reduce<Record<string, SortFn>>(playerStatReducer, {});
    }

    return [...batterStats, ...pitcherStats, ...requiredStats].reduce<Record<string, SortFn>>(playerStatReducer, {});
  }, [batterStats, pitcherStats, tableDisplayMode]);
};
