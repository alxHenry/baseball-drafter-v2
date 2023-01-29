import { Calculator, StatConfigById } from "./stats";

const obpCalculator: Calculator = (stats) => {
  const walks = stats["bb"]!;
  const hbp = stats["hbp"]!;
  return (stats["h"]! + walks + hbp) / (stats["ab"]! + walks + hbp + stats["sf"]!);
};
const slgCalculator: Calculator = (stats) => {
  return (stats["1b"]! + stats["2b"]! * 2 + stats["3b"]! * 3 + stats["hr"]! * 4) / stats["ab"]!;
};
const woba2022Calculator: Calculator = (stats) => {
  const nonIntentionalBB = stats["bb"]! - stats["ibb"]!;
  // Constants for each year found at: https://www.fangraphs.com/guts.aspx?type=cn
  const numerator =
    0.689 * nonIntentionalBB +
    0.72 * stats["hbp"]! +
    0.884 * stats["1b"]! +
    1.261 * stats["2b"]! +
    1.601 * stats["3b"]! +
    2.072 * stats["hr"]!;
  const denominator = stats["ab"]! + nonIntentionalBB + stats["sf"]! + stats["hbp"]!;
  return numerator / denominator;
};

export const statConfigsById: StatConfigById = {
  h: {
    id: "h",
    display: "H",
    isHigherBetter: true,
    isDisplayed: false,
    isSelectable: false,
  },
  ab: {
    id: "ab",
    display: "AB",
    isHigherBetter: true,
    isDisplayed: false,
    isSelectable: false,
  },
  avg: {
    id: "avg",
    display: "AVG",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
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
    isSelectable: true,
  },
  r: {
    id: "r",
    display: "R",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
  },
  sb: {
    id: "sb",
    display: "SB",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
  },
  hr: {
    id: "hr",
    display: "HR",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
  },
  bb: {
    id: "bb",
    display: "BB",
    isHigherBetter: true,
    isDisplayed: false,
    isSelectable: false,
  },
  hbp: {
    id: "hbp",
    display: "HBP",
    isHigherBetter: true,
    isDisplayed: false,
    isSelectable: false,
  },
  sf: {
    id: "sf",
    display: "Sacrifice Flies",
    isHigherBetter: true,
    isDisplayed: false,
    isSelectable: false,
  },
  "1b": {
    id: "1b",
    display: "1B",
    isHigherBetter: true,
    isDisplayed: false,
    isSelectable: false,
  },
  "2b": {
    id: "2b",
    display: "2B",
    isHigherBetter: true,
    isDisplayed: false,
    isSelectable: false,
  },
  "3b": {
    id: "3b",
    display: "3B",
    isHigherBetter: true,
    isDisplayed: false,
    isSelectable: false,
  },
  ibb: {
    id: "ibb",
    display: "IBB",
    isHigherBetter: true,
    isDisplayed: false,
    isSelectable: false,
  },
  obp: {
    id: "obp",
    display: "OBP",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
    calculator: obpCalculator,
  },
  slg: {
    id: "slg",
    display: "SLG",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
    calculator: slgCalculator,
  },
  ops: {
    id: "ops",
    display: "OPS",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
    calculator: (stats) => obpCalculator(stats) + slgCalculator(stats),
  },
  woba: {
    id: "woba",
    display: "wOBA",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
    calculator: woba2022Calculator,
  },
  w: {
    id: "w",
    display: "W",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
  },
  sv: {
    id: "sv",
    display: "SV",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
  },
  era: {
    id: "era",
    display: "ERA",
    isHigherBetter: false,
    isDisplayed: true,
    isSelectable: true,
    calculator: (stats) => ((stats["er"] ?? 0) * 9) / (stats["ip"] ?? 0),
  },
  whip: {
    id: "whip",
    display: "WHIP",
    isHigherBetter: false,
    isDisplayed: true,
    isSelectable: true,
    calculator: (stats) => ((stats["hAllowed"] ?? 0) + (stats["bbAllowed"] ?? 0)) / (stats["ip"] ?? 0),
  },
  so: {
    id: "so",
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
  er: {
    id: "er",
    display: "ER",
    isHigherBetter: false,
    isDisplayed: false,
    isSelectable: false,
  },
  hld: {
    id: "hld",
    display: "Holds",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
  },
  ip: {
    id: "ip",
    display: "IP",
    isHigherBetter: true,
    isDisplayed: false,
    isSelectable: false,
  },
  k9: {
    id: "k9",
    display: "K/9",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
    calculator: (stats) => (stats["so"]! * 9) / stats["ip"]!, // TODO: Convert IP calculations to base 3 so 190.1 means the right thing
  },
  kbb: {
    id: "kbb",
    display: "K/BB",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
    calculator: (stats) => stats["so"]! / stats["bbAllowed"]!,
  },
  qs: {
    id: "qs",
    display: "QS",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
  },
  svhld: {
    id: "svhld",
    display: "SV + HLD",
    isHigherBetter: true,
    isDisplayed: true,
    isSelectable: true,
    calculator: (stats) => stats["sv"]! + stats["hld"]!,
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
