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

export const isCornerInfield = (position: string) => {
  return position === PositionId["1B"] || position === PositionId["3B"];
};

export const isMiddleInfield = (position: string) => {
  return position === PositionId["2B"] || position === PositionId.SS;
};

export const isPlayerPitcher = (playerPosition: string) =>
  playerPosition === "SP" || playerPosition === "RP" || playerPosition === "P";
export const isPitcherFilter = (filter: TableDisplayMode) => {
  isPlayerPitcher(filter) || PITCHER_POSITION_KEY;
};

export const isPlayerBatter = (playerPosition: string) => !isPlayerPitcher(playerPosition);
export const isBatterFilter = (filter: TableDisplayMode) => {
  return isPlayerBatter(filter) || BATTER_POSITION_KEY;
};
