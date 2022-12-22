import type { BattersById, ServerPlayerById } from "../../data/stores/playersSlice";

export const transformServerPlayerToLocalPlayer = (serverPlayerById: ServerPlayerById): BattersById => {
  return Object.values(serverPlayerById).reduce<BattersById>((agg, serverPlayer) => {
    agg[serverPlayer.id] = {
      ...serverPlayer,
      isDrafted: false,
    };
    return agg;
  }, {});
};