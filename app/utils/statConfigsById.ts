import { StatConfigById } from "../../data/stores/draftSlice";

export const statConfigsById: StatConfigById = {
  h: {
    id: "h",
    display: "H",
    isHigherBetter: true,
    isDisplayed: false,
  },
  ab: {
    id: "ab",
    display: "AB",
    isHigherBetter: true,
    isDisplayed: false,
  },
  avg: {
    id: "avg",
    display: "AVG",
    isHigherBetter: true,
    isDisplayed: true,
    calculator: (stats) => {
      // TODO: Figure out better type story for these tabulation stats to be required for batters and not pitchers
      return (stats["h"] ?? 0) / (stats["ab"] ?? 0);
    },
  },
  rbi: {
    id: "rbi",
    display: "RBI",
    isHigherBetter: true,
    isDisplayed: true,
  },
  r: {
    id: "r",
    display: "R",
    isHigherBetter: true,
    isDisplayed: true,
  },
  sb: {
    id: "sb",
    display: "SB",
    isHigherBetter: true,
    isDisplayed: true,
  },
  hr: {
    id: "hr",
    display: "HR",
    isHigherBetter: true,
    isDisplayed: true,
  },
  w: {
    id: "w",
    display: "W",
    isHigherBetter: true,
    isDisplayed: true,
  },
  sv: {
    id: "sv",
    display: "SV",
    isHigherBetter: true,
    isDisplayed: true,
  },
  era: {
    id: "era",
    display: "ERA",
    isHigherBetter: false,
    isDisplayed: true,
    calculator: (stats) => ((stats["er"] ?? 0) * 9) / (stats["ip"] ?? 0),
  },
  whip: {
    id: "whip",
    display: "WHIP",
    isHigherBetter: false,
    isDisplayed: true,
    calculator: (stats) => ((stats["hAllowed"] ?? 0) + (stats["bbAllowed"] ?? 0)) / (stats["ip"] ?? 0),
  },
  so: {
    id: "so",
    display: "SO",
    isHigherBetter: true,
    isDisplayed: true,
  },
  hAllowed: {
    id: "hAllowed",
    display: "H",
    isHigherBetter: false,
    isDisplayed: false,
  },
  bbAllowed: {
    id: "bbAllowed",
    display: "BB",
    isHigherBetter: false,
    isDisplayed: false,
  },
  er: {
    id: "er",
    display: "ER",
    isHigherBetter: false,
    isDisplayed: false,
  },
  ip: {
    id: "ip",
    display: "IP",
    isHigherBetter: true,
    isDisplayed: false,
  },
  worth: {
    id: "worth",
    display: "Worth",
    isHigherBetter: true,
    isDisplayed: true,
  },
  aWorth: {
    id: "aWorth",
    display: "Adjusted Worth",
    isHigherBetter: true,
    isDisplayed: true,
  },
};
