import { Calculator, StatConfigById } from "./stats";

const obpCalculator: Calculator = (stats) => {
  const walks = stats["BB"]!;
  const hbp = stats["HBP"]!;
  return (stats["H"]! + walks + hbp) / (stats["AB"]! + walks + hbp + stats["SF"]!);
};
const slgCalculator: Calculator = (stats) => {
  return (stats["1B"]! + stats["2B"]! * 2 + stats["3B"]! * 3 + stats["HR"]! * 4) / stats["AB"]!;
};
const woba2022Calculator: Calculator = (stats) => {
  const nonIntentionalBB = stats["BB"]! - stats["IBB"]!;
  // Constants for each year found at: https://www.fangraphs.com/guts.aspx?type=cn
  const numerator =
    0.689 * nonIntentionalBB +
    0.72 * stats["HBP"]! +
    0.884 * stats["1B"]! +
    1.261 * stats["2B"]! +
    1.601 * stats["3B"]! +
    2.072 * stats["HR"]!;
  const denominator = stats["AB"]! + nonIntentionalBB + stats["SF"]! + stats["HBP"]!;
  return numerator / denominator;
};

export const statConfigsById: StatConfigById = {
  H: {
    id: "H",
    display: "H",
    isHigherBetter: true,
    isDisplayed: false,
    isSelectable: false,
  },
  AB: {
    id: "AB",
    display: "AB",
    isHigherBetter: true,
    isDisplayed: false,
    isSelectable: false,
  },
  AVG: {
    id: "AVG",
    display: "AVG",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
    calculator: (stats) => {
      // TODO: Figure out better type story for these tabulation stats to be required for batters and not pitchers
      return (stats["H"] ?? 0) / (stats["AB"] ?? 0);
    },
  },
  RBI: {
    id: "RBI",
    display: "RBI",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
  },
  R: {
    id: "R",
    display: "R",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
  },
  SB: {
    id: "SB",
    display: "SB",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
  },
  HR: {
    id: "HR",
    display: "HR",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
  },
  BB: {
    id: "BB",
    display: "BB",
    isHigherBetter: true,
    isDisplayed: false,
    isSelectable: false,
  },
  HBP: {
    id: "HBP",
    display: "HBP",
    isHigherBetter: true,
    isDisplayed: false,
    isSelectable: false,
  },
  SF: {
    id: "SF",
    display: "Sacrifice Flies",
    isHigherBetter: true,
    isDisplayed: false,
    isSelectable: false,
  },
  "1B": {
    id: "1B",
    display: "1B",
    isHigherBetter: true,
    isDisplayed: false,
    isSelectable: false,
  },
  "2B": {
    id: "2B",
    display: "2B",
    isHigherBetter: true,
    isDisplayed: false,
    isSelectable: false,
  },
  "3B": {
    id: "3B",
    display: "3B",
    isHigherBetter: true,
    isDisplayed: false,
    isSelectable: false,
  },
  IBB: {
    id: "IBB",
    display: "IBB",
    isHigherBetter: true,
    isDisplayed: false,
    isSelectable: false,
  },
  OBP: {
    id: "OBP",
    display: "OBP",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
    calculator: obpCalculator,
  },
  SLG: {
    id: "SLG",
    display: "SLG",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
    calculator: slgCalculator,
  },
  OPS: {
    id: "OPS",
    display: "OPS",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
    calculator: (stats) => obpCalculator(stats) + slgCalculator(stats),
  },
  wOBA: {
    id: "wOBA",
    display: "wOBA",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
    calculator: woba2022Calculator,
  },
  W: {
    id: "W",
    display: "W",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
  },
  SV: {
    id: "SV",
    display: "SV",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
  },
  ERA: {
    id: "ERA",
    display: "ERA",
    isHigherBetter: false,
    isDisplayed: true,
    isSelectable: true,
    calculator: (stats) => ((stats["ER"] ?? 0) * 9) / (stats["IP"] ?? 0),
  },
  WHIP: {
    id: "WHIP",
    display: "WHIP",
    isHigherBetter: false,
    isDisplayed: true,
    isSelectable: true,
    calculator: (stats) => ((stats["hAllowed"] ?? 0) + (stats["bbAllowed"] ?? 0)) / (stats["IP"] ?? 0),
  },
  SO: {
    id: "SO",
    display: "SO",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
  },
  hAllowed: {
    id: "hAllowed",
    display: "H",
    isHigherBetter: false,
    isDisplayed: false,
    isSelectable: false,
  },
  bbAllowed: {
    id: "bbAllowed",
    display: "BB",
    isHigherBetter: false,
    isDisplayed: false,
    isSelectable: false,
  },
  ER: {
    id: "ER",
    display: "ER",
    isHigherBetter: false,
    isDisplayed: false,
    isSelectable: false,
  },
  HLD: {
    id: "HLD",
    display: "Holds",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
  },
  IP: {
    id: "IP",
    display: "IP",
    isHigherBetter: true,
    isDisplayed: false,
    isSelectable: false,
  },
  "K/9": {
    id: "K/9",
    display: "K/9",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
    calculator: (stats) => (stats["SO"]! * 9) / stats["IP"]!, // TODO: Convert IP calculations to base 3 so 190.1 means the right thing
  },
  "K/BB": {
    id: "K/BB",
    display: "K/BB",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
    calculator: (stats) => stats["SO"]! / stats["bbAllowed"]!,
  },
  QS: {
    id: "QS",
    display: "QS",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
  },
  SVHLD: {
    id: "SVHLD",
    display: "SV + HLD",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
    calculator: (stats) => stats["SV"]! + stats["HLD"]!,
  },
  worth: {
    id: "worth",
    display: "Worth",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: false,
  },
  aWorth: {
    id: "aWorth",
    display: "Adjusted Worth",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: false,
  },
};
