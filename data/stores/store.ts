import create from "zustand";
import { DraftSlice, getDraftSliceDefinitions } from "./draftSlice";
import { PlayersSlice, getPlayersSliceDefinitions } from "./playersSlice";
import { TeamsSlice, getTeamsSliceDefinitions } from "./teamsSlice";
import { SetupSlice, getSetupSliceDefinitions } from "./setupSlice";
import { getTableSliceDefinitions, TableSlice } from "./tableSlice";
import { getRotoRankingsSliceDefinitions, RotoRankingsSlice } from "./rotoRankingsSlice";
import merge from "lodash.merge";
import { getStoreWithDefaultStatesRemoved } from "./teamsUtils";

const LOCAL_STORAGE_KEY = "baseball-drafter-v2-store-storage-key";

export interface Store {
  readonly draftSlice: DraftSlice;
  readonly playersSlice: PlayersSlice;
  readonly rotoRankingsSlice: RotoRankingsSlice;
  readonly setupSlice: SetupSlice;
  readonly tableSlice: TableSlice;
  readonly teamsSlice: TeamsSlice;
  readonly persist: () => void;
  readonly rehydrateStore: () => boolean;
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

  persist: () => {
    // persist non function methods
    const store = get();
    const storeWithoutObjects = buildStoreWithoutFunctions(store) as Partial<Store>;

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storeWithoutObjects));
  },
  rehydrateStore: (): boolean => {
    const storedStore = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedStore == null) {
      return false;
    }

    const parsedStore = JSON.parse(storedStore);
    set((store) => {
      const mergedStores = merge(store, parsedStore) as Store;
      const defaultlessStore = getStoreWithDefaultStatesRemoved(mergedStores);

      return defaultlessStore;
    });
    return true;
  },
}));

const buildStoreWithoutFunctions = (obj: Record<string, any>): Record<string, any> => {
  return Object.entries(obj).reduce<Record<string, any>>((agg, [key, value]) => {
    if (typeof value === "function") {
      return agg;
    }

    if (Array.isArray(value)) {
      agg[key] = value; // This could break in the case of an array of objects with functions. May need to build an array expander if that becomes an issue
      return agg;
    }

    if (typeof value === "object" && value != null) {
      const recursedObject = buildStoreWithoutFunctions(value);
      agg[key] = recursedObject;
      return agg;
    }

    agg[key] = value;
    return agg;
  }, {});
};
