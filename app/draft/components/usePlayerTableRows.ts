import { useMemo } from "react";
import type { BatterPlayerRow } from "../../../data/stores/playersSlice";

import { useStore } from "../../../data/stores/store";

export const usePlayerTableRows = (): BatterPlayerRow[] => {
  const battersById = useStore((state) => state.playersSlice.battersById);
  const playerRows = useMemo(() => Object.values(battersById), [battersById]);

  return playerRows;
};
