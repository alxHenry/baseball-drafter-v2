import type { ServerPlayerById } from "./stores/playersSlice";

export const PLAYERS_MOCK: ServerPlayerById = {
  "1": {
    id: "1",
    name: "Jose Abreu",
    avg: 0.32,
    hr: 35,
  },
  "2": {
    id: "2",
    name: "Aaron Judge 2",
    avg: 0.29,
    hr: 60,
  },
  "3": {
    id: "3",
    name: "Aaron Judge 3",
    avg: 0.29,
    hr: 60,
  },
  "4": {
    id: "4",
    name: "Aaron Judge 4",
    avg: 0.29,
    hr: 60,
  },
  "5": {
    id: "5",
    name: "Aaron Judge 5",
    avg: 0.29,
    hr: 60,
  },
  "6": {
    id: "6",
    name: "Aaron Judge 6",
    avg: 0.29,
    hr: 60,
  },
  "7": {
    id: "7",
    name: "Aaron Judge 7",
    avg: 0.29,
    hr: 60,
  },
  "8": {
    id: "8",
    name: "Aaron Judge 8",
    avg: 0.29,
    hr: 60,
  },
  "9": {
    id: "9",
    name: "Aaron Judge 9",
    avg: 0.29,
    hr: 60,
  },
  "10": {
    id: "10",
    name: "Aaron Judge 10",
    avg: 0.29,
    hr: 60,
  },
};

export const getMockPlayerData = (): Promise<ServerPlayerById> => {
  return new Promise((resolve) => {
    resolve(PLAYERS_MOCK);
  });
};
