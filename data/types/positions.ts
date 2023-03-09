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

const pitcherPositionLookup: Partial<Record<PositionId, boolean>> = {
  SP: true,
  RP: true,
  P: true,
};

const batterPositionLookup: Partial<Record<PositionId | "DH", boolean>> = {
  C: true,
  "1B": true,
  "2B": true,
  SS: true,
  "3B": true,
  OF: true,
  DH: true,
};

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

export const isPitcherFilter = (displayMode: TableDisplayMode) => {
  if (displayMode === PITCHER_POSITION_KEY) {
    return true;
  }
  if (displayMode === ALL_POSITION_KEY || displayMode === BATTER_POSITION_KEY) {
    return false;
  }
  return isPitcherEligiblePosition([displayMode]);
};
export const isPitcherEligiblePosition = (positions: PositionId[]) => {
  return positions.some((position) => pitcherPositionLookup[position] === true);
};

export const isBatterFilter = (displayMode: TableDisplayMode) => {
  if (displayMode === BATTER_POSITION_KEY) {
    return true;
  }
  if (displayMode === ALL_POSITION_KEY || displayMode === PITCHER_POSITION_KEY) {
    return false;
  }
  return !isPitcherEligiblePosition([displayMode]);
};
export const isBatterEligiblePosition = (positions: PositionId[]) => {
  return positions.some((position) => batterPositionLookup[position] === true);
};
