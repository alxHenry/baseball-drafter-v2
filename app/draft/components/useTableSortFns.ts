import { SortFn } from "@table-library/react-table-library/types/sort";
import { Player } from "../../../data/stores/playersSlice";
import { useMemo } from "react";
import { useStore } from "../../../data/stores/store";
import { StatId } from "../../../data/types/stats";

const playerStatReducer = (agg: Record<string, SortFn>, stat: string) => {
  agg[stat] = (array) =>
    array.sort((a, b) => {
      const playerA = a as Player;
      const playerB = b as Player;

      return playerB.stats[stat as StatId]!.rel - playerA.stats[stat as StatId]!.rel;
    });

  return agg;
};

export const useTableSortFns = (): Record<string, SortFn> => {
  const batterStats = useStore((state) => state.draftSlice.batterStatConfigsById);
  const pitcherStats = useStore((state) => state.draftSlice.pitcherStatConfigsById);
  const requiredStats = useStore((state) => state.draftSlice.requiredStatConfigsById);
  const tableDisplayMode = useStore((state) => state.draftSlice.currentTableDisplayMode);

  return useMemo(() => {
    if (tableDisplayMode === "All") {
      return Object.keys(requiredStats).reduce<Record<string, SortFn>>(playerStatReducer, {});
    } else if (tableDisplayMode === "Batters") {
      return [...Object.keys(batterStats), ...Object.keys(requiredStats)].reduce<Record<string, SortFn>>(
        playerStatReducer,
        {}
      );
    } else {
      return [...Object.keys(pitcherStats), ...Object.keys(requiredStats)].reduce<Record<string, SortFn>>(
        playerStatReducer,
        {}
      );
    }
  }, [batterStats, pitcherStats, requiredStats, tableDisplayMode]);
};
