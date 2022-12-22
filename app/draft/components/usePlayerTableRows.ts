import { useMemo } from "react";
import type { BatterPlayerRow } from "../../../data/stores/playersSlice";

import { useStore } from "../../../data/stores/store";

interface UsePlayerTableRowsArgs {
  readonly shouldHideDrafted: boolean;
}
export const usePlayerTableRows = ({ shouldHideDrafted }: UsePlayerTableRowsArgs): BatterPlayerRow[] => {
  const battersById = useStore((state) => state.playersSlice.battersById);
  const playerRows = useMemo(() => {
    const rows = Object.values(battersById);
    if (!shouldHideDrafted) {
      return rows;
    }
    return rows.filter((player) => player.draftedByTeamId === null);
  }, [battersById, shouldHideDrafted]);

  return playerRows;
};
