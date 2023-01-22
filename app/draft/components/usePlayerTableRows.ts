import { Player } from "../../../data/stores/playersSlice";
import { useMemo } from "react";
import { useStore } from "../../../data/stores/store";
import { isPlayerPitcher } from "../../utils/isPlayerPitcher";

interface UsePlayerTableRowsArgs {
  readonly search: string;
  readonly shouldHideDrafted: boolean;
}

export const usePlayerTableRows = ({ search, shouldHideDrafted }: UsePlayerTableRowsArgs): { nodes: Player[] } => {
  const playersById = useStore((state) => state.playersSlice.playersById);
  const tableDisplayMode = useStore((state) => state.draftSlice.currentTableDisplayMode);

  return useMemo(() => {
    let players = Object.values(playersById);
    if (shouldHideDrafted) {
      players = players.filter((player) => player.draftedByTeamId === null);
    }
    if (tableDisplayMode === "Batters") {
      // TODO: Update for position arrays and eventually handle for Shohei
      players = players.filter((player) => !isPlayerPitcher(player.position));
    } else if (tableDisplayMode === "Pitchers") {
      players = players.filter((player) => isPlayerPitcher(player.position));
    }

    const cleanedSearch = search.toLowerCase().trim();
    if (cleanedSearch.length > 0) {
      players = players.filter((item) => item.name.toLowerCase().includes(cleanedSearch));
    }

    return { nodes: players };
  }, [playersById, search, shouldHideDrafted, tableDisplayMode]);
};
