import type { PlayersById, ServerPlayerById } from "../../data/stores/playersSlice";

export const transformServerPlayerToLocalPlayer = (serverPlayerById: ServerPlayerById): PlayersById => {
  return Object.values(serverPlayerById).reduce<PlayersById>((agg, serverPlayer) => {
    agg[serverPlayer.id] = {
      ...serverPlayer,
      draftedByTeamId: null,
    };
    return agg;
  }, {});
};
