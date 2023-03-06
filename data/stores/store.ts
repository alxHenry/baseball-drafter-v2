import create from "zustand";
import { DraftSlice, getDraftSliceDefinitions } from "./draftSlice";
import { PlayersSlice, getPlayersSliceDefinitions } from "./playersSlice";
import { TeamsSlice, getTeamsSliceDefinitions } from "./teamsSlice";
import { SetupSlice, getSetupSliceDefinitions } from "./setupSlice";
import { getTableSliceDefinitions, TableSlice } from "./tableSlice";
import { getRotoRankingsSliceDefinitions, RotoRankingsSlice } from "./rotoRankingsSlice";

export interface Store {
  readonly draftSlice: DraftSlice;
  readonly playersSlice: PlayersSlice;
  readonly rotoRankingsSlice: RotoRankingsSlice;
  readonly setupSlice: SetupSlice;
  readonly tableSlice: TableSlice;
  readonly teamsSlice: TeamsSlice;
}

export type StoreSet = (
  partial: Store | Partial<Store> | ((state: Store) => Store | Partial<Store>),
  replace?: boolean | undefined
) => void;
export type StoreGet = () => Store;

export const useStore = create<Store>()((set: StoreSet, get: StoreGet) => ({
  draftSlice: getDraftSliceDefinitions(set, get),
  playersSlice: getPlayersSliceDefinitions(set, get),
  rotoRankingsSlice: getRotoRankingsSliceDefinitions(set, get),
  setupSlice: getSetupSliceDefinitions(set, get),
  tableSlice: getTableSliceDefinitions(set, get),
  teamsSlice: getTeamsSliceDefinitions(set, get),
}));
