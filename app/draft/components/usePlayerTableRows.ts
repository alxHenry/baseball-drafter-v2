import type { BatterPlayerRow } from "../../../data/stores/playersSlice";

import { useMemo } from "react";
import { useStore } from "../../../data/stores/store";

interface UsePlayerTableRowsArgs {
  readonly shouldHideDrafted: boolean;
}

export const usePlayerTableRows = ({ shouldHideDrafted }: UsePlayerTableRowsArgs): { nodes: BatterPlayerRow[] } => {
  const battersById = useStore((state) => state.playersSlice.battersById);

  return useMemo(() => {
    const rows = Object.values(battersById);
    if (!shouldHideDrafted) {
      return { nodes: rows };
    }
    return { nodes: rows.filter((player) => player.draftedByTeamId === null) };
  }, [battersById, shouldHideDrafted]);
};
