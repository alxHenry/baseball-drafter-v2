import type { DraftSlice } from "./draftSlice";
import type { TeamsSlice } from "./teamsSlice";

import create from "zustand";
import { getDraftSliceDefinitions } from "./draftSlice";
import { getTeamsSliceDefinitions } from "./teamsSlice";

export interface Store {
  // Slices
  readonly draftSlice: DraftSlice;
  readonly teamsSlice: TeamsSlice;
}

export type StoreSet = (
  partial: Store | Partial<Store> | ((state: Store) => Store | Partial<Store>),
  replace?: boolean | undefined
) => void;
export type StoreGet = () => Store;

export const useStore = create<Store>((set: StoreSet, get: StoreGet) => ({
  draftSlice: getDraftSliceDefinitions(set, get),
  teamsSlice: getTeamsSliceDefinitions(set, get),
}));
