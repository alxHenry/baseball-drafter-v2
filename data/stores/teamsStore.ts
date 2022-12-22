import type { DraftSlice } from "./draftSlice";
import type { TeamsSlice } from "./teamsSlice";

import create from "zustand";
import { getDraftSliceDefinitions } from "./draftSlice";
import { getTeamsSliceDefinitions } from "./teamsSlice";

export interface TeamsStore {
  // Slices
  readonly draftSlice: DraftSlice;
  readonly teamsSlice: TeamsSlice;
}

export type StoreSet = (
  partial: TeamsStore | Partial<TeamsStore> | ((state: TeamsStore) => TeamsStore | Partial<TeamsStore>),
  replace?: boolean | undefined
) => void;
export type StoreGet = () => TeamsStore;

export const useTeamsStore = create<TeamsStore>((set: StoreSet, get: StoreGet) => ({
  draftSlice: getDraftSliceDefinitions(set, get),
  teamsSlice: getTeamsSliceDefinitions(set, get),
}));
