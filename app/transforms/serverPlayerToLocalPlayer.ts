import type { PlayersById, ServerPlayerById } from "../../data/stores/playersSlice";
import { isPitcherEligiblePosition } from "../../data/types/positions";

export const transformServerPlayerToLocalPlayer = (serverPlayerById: ServerPlayerById): PlayersById => {
  return Object.values(serverPlayerById).reduce<PlayersById>((agg, serverPlayer) => {
    if (isPitcherEligiblePosition(serverPlayer.position)) {
      // Rename the H and BB fields to differentiate between ptichers and hitters stats (we combine stats into one object for configs)
      serverPlayer.stats["hAllowed"] = serverPlayer.stats.H;
      delete serverPlayer.stats.H;
      serverPlayer.stats["bbAllowed"] = serverPlayer.stats.BB;
      delete serverPlayer.stats.BB;
    }
    agg[serverPlayer.id] = {
      ...serverPlayer,
      draftedByTeamId: null,
    };
    return agg;
  }, {});
};
