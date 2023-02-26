export enum PositionId {
  "C" = "C",
  "1B" = "1B",
  "2B" = "2B",
  "SS" = "SS",
  "3B" = "3B",
  "OF" = "OF",
  "MI" = "MI",
  "CI" = "CI",
  "IF" = "IF",
  "UT" = "UT",
  "SP" = "SP",
  "RP" = "RP",
  "P" = "P",
}

export const ALL_POSITION_KEY = "All";
export const BATTER_POSITION_KEY = "Batters";
export const PITCHER_POSITION_KEY = "Pitchers";
export type TableDisplayMode =
  | typeof ALL_POSITION_KEY
  | typeof BATTER_POSITION_KEY
  | typeof PITCHER_POSITION_KEY
  | PositionId;
