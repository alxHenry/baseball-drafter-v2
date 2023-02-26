import type { StoreGet, StoreSet } from "./store";

export interface RotoRankingsSlice {
  isShowingRelative: boolean;

  // Methods
  toggleIsShowingRelative: () => void;
}

export const getRotoRankingsSliceDefinitions = (set: StoreSet, get: StoreGet): RotoRankingsSlice => ({
  isShowingRelative: false,

  toggleIsShowingRelative: () => {
    set(({ rotoRankingsSlice }) => {
      return {
        rotoRankingsSlice: {
          ...rotoRankingsSlice,
          isShowingRelative: !rotoRankingsSlice.isShowingRelative,
        },
      };
    });
  },
});
