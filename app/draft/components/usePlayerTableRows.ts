import { Player } from "../../../data/stores/playersSlice";
import { useMemo } from "react";
import { useStore } from "../../../data/stores/store";
import { isPlayerPitcher } from "../../utils/isPlayerPitcher";
import {
  ALL_POSITION_KEY,
  BATTER_POSITION_KEY,
  PITCHER_POSITION_KEY,
  TableDisplayMode,
} from "../../../data/types/positions";

interface UsePlayerTableRowsArgs {
  readonly positionFilter: TableDisplayMode;
  readonly search: string;
  readonly shouldHideDrafted: boolean;
}

export const usePlayerTableRows = ({
  positionFilter,
  search,
  shouldHideDrafted,
}: UsePlayerTableRowsArgs): { nodes: Player[] } => {
  const playersById = useStore((state) => state.playersSlice.playersById);

  return useMemo(() => {
    let players = Object.values(playersById);
    if (shouldHideDrafted) {
      players = players.filter((player) => player.draftedByTeamId === null);
    }

    if (positionFilter !== ALL_POSITION_KEY) {
      // TODO: handle for Shohei
      players.filter((player) => {
        switch (positionFilter) {
          case BATTER_POSITION_KEY:
            return !isPlayerPitcher(player.position);
          case PITCHER_POSITION_KEY:
            return isPlayerPitcher(player.position);
          default:
            return player.position.contains(positionFilter);
        }
      });
    }

    const cleanedSearch = search.toLowerCase().trim();
    if (cleanedSearch.length > 0) {
      players = players.filter((item) => item.name.toLowerCase().includes(cleanedSearch));
    }

    return { nodes: players };
  }, [playersById, positionFilter, search, shouldHideDrafted]);
};
