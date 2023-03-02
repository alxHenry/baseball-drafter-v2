import { PositionId } from "../types/positions";
import type { StoreGet, StoreSet } from "./store";

const positionIdToDefaultCounts: Record<PositionId, number> = {
  C: 1,
  "1B": 1,
  "2B": 1,
  SS: 1,
  "3B": 1,
  OF: 5,
  MI: 1,
  CI: 1,
  IF: 0,
  UT: 1,
  SP: 6,
  RP: 3,
  P: 0,
};

export interface SetupSlice {
  readonly positionCounts: Record<PositionId, number>;

  // Methods
  readonly updatePositionCount: (positionId: PositionId, count: number) => void;
}

export const getSetupSliceDefinitions = (set: StoreSet, get: StoreGet): SetupSlice => ({
  positionCounts: positionIdToDefaultCounts,

  updatePositionCount: (positionId, count) => {
    set(({ setupSlice }) => {
      const { positionCounts } = setupSlice;

      return {
        setupSlice: {
          ...setupSlice,
          positionCounts: {
            ...positionCounts,
            [positionId]: count,
          },
        },
      };
    });
  },
});
