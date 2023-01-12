import { SortFn } from "@table-library/react-table-library/types/sort";
import { Player } from "../../../data/stores/playersSlice";
import { useMemo } from "react";
import { useStore } from "../../../data/stores/store";

export const useTableSortFns = (): Record<string, SortFn> => {
  const batterStats = useStore((state) => state.draftSlice.batterStats);
  const pitcherStats = useStore((state) => state.draftSlice.pitcherStats);
  const tableDisplayMode = useStore((state) => state.draftSlice.currentTableDisplayMode);

  return useMemo(() => {
    if (tableDisplayMode === "All") {
      return {};
    }

    return [...batterStats, ...pitcherStats].reduce<Record<string, SortFn>>((agg, stat) => {
      agg[stat] = (array) =>
        array.sort((a, b) => {
          const playerA = a as Player;
          const playerB = b as Player;

          return playerB.stats[stat]!.rel - playerA.stats[stat]!.rel;
        });

      return agg;
    }, {});
  }, [batterStats, pitcherStats, tableDisplayMode]);
};
