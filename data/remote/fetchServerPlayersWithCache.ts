import { transformServerPlayerToLocalPlayer } from "../../app/transforms/serverPlayerToLocalPlayer";
import { PlayersById } from "../stores/playersSlice";

const cache = new Map<string, { players: PlayersById; iso: string }>();

const isDateLessThan24HoursOld = (iso?: string) => {
  if (iso == null) {
    return false;
  }

  const twentyFourHoursAgo = new Date();
  twentyFourHoursAgo.setHours(-24);
  return new Date(iso) > twentyFourHoursAgo;
};

export const fetchServerPlayersWithCache = async (configKey: string) => {
  if (cache.has(configKey)) {
    const cacheEntry = cache.get(configKey)!;
    if (isDateLessThan24HoursOld(cacheEntry.iso)) {
      return cacheEntry.players;
    } else {
      cache.delete(configKey);
    }
  }

  const response = await fetch("http://localhost:3001/players");
  const playersById = await response.json();
  const localPlayers = transformServerPlayerToLocalPlayer(playersById);

  cache.set(configKey, { players: localPlayers, iso: new Date().toISOString() });
  return localPlayers;
};
