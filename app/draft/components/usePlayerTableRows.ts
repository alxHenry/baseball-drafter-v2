import { Player } from "../../../data/stores/playersSlice";
import { useMemo } from "react";
import { useStore } from "../../../data/stores/store";
import {
  ALL_POSITION_KEY,
  BATTER_POSITION_KEY,
  isCornerInfield,
  isMiddleInfield,
  isPlayerBatter,
  isPlayerPitcher,
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
      players = players.filter((player) => {
        switch (positionFilter) {
          case BATTER_POSITION_KEY:
          case "DH":
            return isPlayerBatter(player.position);
          case PITCHER_POSITION_KEY:
          case "P":
            return isPlayerPitcher(player.position);
          case "CI":
            return isCornerInfield(player.position);
          case "MI":
            return isMiddleInfield(player.position);
          case "IF":
            return isCornerInfield(player.position) || isMiddleInfield(player.position);
          default:
            return player.position.includes(positionFilter);
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
