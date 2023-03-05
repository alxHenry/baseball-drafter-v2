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

export const isCornerInfield = (positions: string[]) => {
  return positions.some((position) => position === PositionId["1B"] || position === PositionId["3B"]);
};

export const isMiddleInfield = (positions: string[]) => {
  return positions.some((position) => position === PositionId["2B"] || position === PositionId.SS);
};

export const isPlayerPitcher = (positions: string[]) =>
  positions[0] === "SP" || positions[0] === "RP" || positions[0] === "P";

export const isPlayerBatter = (positions: string[]) => !isPlayerPitcher(positions);
export const isBatterFilter = (filter: TableDisplayMode) => {
  return filter === BATTER_POSITION_KEY || isPlayerBatter([filter]);
};
