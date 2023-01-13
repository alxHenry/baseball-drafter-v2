import { State } from "@table-library/react-table-library/types/common";
import { BatterStatId, PitcherStatId } from "./playersSlice";
import type { StoreGet, StoreSet } from "./store";

export type TableDisplayMode = "All" | "Batters" | "Pitchers";
export type TableSortKey = BatterStatId | PitcherStatId | "NONE";

export interface TableSlice {
  readonly currentSortKey: TableSortKey;
  readonly isSortReversed: boolean;

  // Methods
  readonly setSortState: (sortState: State) => void;
}

export const getTableSliceDefinitions = (set: StoreSet, get: StoreGet): TableSlice => ({
  currentSortKey: "NONE",
  isSortReversed: false,

  // Methods
  setSortState: (sortState) => {
    set(({ tableSlice }) => {
      return {
        tableSlice: {
          ...tableSlice,
          currentSortKey: sortState?.sortKey ?? "NONE",
          isSortReversed: sortState?.reverse ?? false,
        },
      };
    });
  },
});
