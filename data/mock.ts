import { PlayersById } from "../types/Players";

export const PLAYERS_MOCK: PlayersById = {
  "1": {
    id: "1",
    name: "Jose Abreu",
    stats: {
      avg: { id: "avg", name: "avg", value: 0.32, isHigherBetter: true },
      hr: { id: "hr", name: "hr", value: 35, isHigherBetter: true },
    },
    team: "CHW",
  },
  "2": {
    id: "2",
    name: "Aaron Judge",
    stats: {
      avg: { id: "avg", name: "avg", value: 0.29, isHigherBetter: true },
      hr: { id: "hr", name: "hr", value: 60, isHigherBetter: true },
    },
    team: "NYY",
  },
};
export const getMockPlayerData = (): Promise<PlayersById> => {
  return new Promise((resolve) => {
    resolve(PLAYERS_MOCK);
  });
};
