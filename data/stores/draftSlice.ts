import type { StoreSet } from "./teamsStore";

export interface DraftSlice {
  // Methods
  readonly advanceDraft: () => void;
  readonly currentPickTeamId: string | null;
}

export const getDraftSliceDefinitions = (set: StoreSet): DraftSlice => ({
  currentPickTeamId: null,

  advanceDraft: () => {
    set(({ teamsById, draftSlice }) => {
      const { currentPickTeamId } = draftSlice;
      const draftOrderKeys = Object.keys(teamsById);
      const currentPickIndex = draftOrderKeys.findIndex((key) => key === currentPickTeamId);
      const nextTeam = draftOrderKeys[(currentPickIndex + 1) % draftOrderKeys.length];

      return {
        draftSlice: {
          ...draftSlice,
          currentPickTeamId: nextTeam,
        },
      };
    });
  },
});
