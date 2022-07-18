import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { ENV } from '../../environments/environment';

import {CoreState, coreReducer, CORE_STATE_KEY} from "./core.reducer";
import {
  ApplicationProfileState,
  applicationProfileReducer,
  APPLICATION_PROFILE_STATE_KEY,
} from './application.reducer';

import { UniqueId } from '../view-models';
import {DESCRIPTIONS_STATE_KEY, descriptionsReducer, DescriptionsState} from "./descriptions.reducer";
import { localStorageSync } from 'ngrx-store-localstorage';

export interface NormalizedState<T extends UniqueId> {
  byId: { [id: string]: T },
  allIds: string[],
}


export interface RootState {
  [CORE_STATE_KEY]: CoreState,
  [APPLICATION_PROFILE_STATE_KEY]: ApplicationProfileState,
  [DESCRIPTIONS_STATE_KEY]: DescriptionsState,
}

export const reducers: ActionReducerMap<RootState> = {
  [CORE_STATE_KEY]: coreReducer,
  [APPLICATION_PROFILE_STATE_KEY]: applicationProfileReducer,
  [DESCRIPTIONS_STATE_KEY]: descriptionsReducer,
};

export function localStorageSyncReducer(reducer: ActionReducer<RootState>): ActionReducer<RootState> {
  return localStorageSync({keys: [CORE_STATE_KEY], rehydrate: true})(reducer);
}

export const metaReducers: MetaReducer<RootState>[] = !ENV.production ? [localStorageSyncReducer] : [localStorageSyncReducer];
