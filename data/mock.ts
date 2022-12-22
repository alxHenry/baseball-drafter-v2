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
  "3": {
    id: "3",
    name: "Aaron Judge",
    stats: {
      avg: { id: "avg", name: "avg", value: 0.29, isHigherBetter: true },
      hr: { id: "hr", name: "hr", value: 60, isHigherBetter: true },
    },
    team: "NYY",
  },
  "4": {
    id: "4",
    name: "Aaron Judge",
    stats: {
      avg: { id: "avg", name: "avg", value: 0.29, isHigherBetter: true },
      hr: { id: "hr", name: "hr", value: 60, isHigherBetter: true },
    },
    team: "NYY",
  },
  "5": {
    id: "5",
    name: "Aaron Judge",
    stats: {
      avg: { id: "avg", name: "avg", value: 0.29, isHigherBetter: true },
      hr: { id: "hr", name: "hr", value: 60, isHigherBetter: true },
    },
    team: "NYY",
  },
  "6": {
    id: "6",
    name: "Aaron Judge",
    stats: {
      avg: { id: "avg", name: "avg", value: 0.29, isHigherBetter: true },
      hr: { id: "hr", name: "hr", value: 60, isHigherBetter: true },
    },
    team: "NYY",
  },
  "7": {
    id: "7",
    name: "Aaron Judge",
    stats: {
      avg: { id: "avg", name: "avg", value: 0.29, isHigherBetter: true },
      hr: { id: "hr", name: "hr", value: 60, isHigherBetter: true },
    },
    team: "NYY",
  },
  "8": {
    id: "8",
    name: "Aaron Judge",
    stats: {
      avg: { id: "avg", name: "avg", value: 0.29, isHigherBetter: true },
      hr: { id: "hr", name: "hr", value: 60, isHigherBetter: true },
    },
    team: "NYY",
  },
  "9": {
    id: "9",
    name: "Aaron Judge",
    stats: {
      avg: { id: "avg", name: "avg", value: 0.29, isHigherBetter: true },
      hr: { id: "hr", name: "hr", value: 60, isHigherBetter: true },
    },
    team: "NYY",
  },
  "10": {
    id: "10",
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
