import type { DraftSlice } from "./draftSlice";
import type { TeamsSlice } from "./teamsSlice";
import type { PlayersSlice } from "./playersSlice";
import type { SetupSlice } from "./setupSlice";

import create from "zustand";
import { getDraftSliceDefinitions } from "./draftSlice";
import { getPlayersSliceDefinitions } from "./playersSlice";
import { getTeamsSliceDefinitions } from "./teamsSlice";
import { getSetupSliceDefinitions } from './setupSlice';

export interface Store {
  readonly draftSlice: DraftSlice;
  readonly playersSlice: PlayersSlice;
  readonly setupSlice: SetupSlice;
  readonly teamsSlice: TeamsSlice;
}

export type StoreSet = (
  partial: Store | Partial<Store> | ((state: Store) => Store | Partial<Store>),
  replace?: boolean | undefined
) => void;
export type StoreGet = () => Store;

export const useStore = create<Store>((set: StoreSet, get: StoreGet) => ({
  draftSlice: getDraftSliceDefinitions(set, get),
  playersSlice: getPlayersSliceDefinitions(set, get),
  setupSlice: getSetupSliceDefinitions(set, get),
  teamsSlice: getTeamsSliceDefinitions(set, get),
}));
