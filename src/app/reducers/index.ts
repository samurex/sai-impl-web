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
import {
  SocialAgentState,
  socialAgentsReducer,
  SOCIAL_AGENT_STATE_KEY,
} from './social-agent.reducer';

import {
  DataRegistryState,
  dataRegistriesReducer,
  DATA_REGISTRY_STATE_KEY,
} from './data-registry.reducer';

import { UniqueId } from '@janeirodigital/sai-api-messages';
import {DESCRIPTIONS_STATE_KEY, descriptionsReducer, DescriptionsState} from "./descriptions.reducer";
import { localStorageSync } from 'ngrx-store-localstorage';

export interface NormalizedState<T extends UniqueId> {
  byId: { [id: string]: T },
  allIds: string[],
}


export interface RootState {
  [CORE_STATE_KEY]: CoreState,
  [APPLICATION_PROFILE_STATE_KEY]: ApplicationProfileState,
  [SOCIAL_AGENT_STATE_KEY]: SocialAgentState,
  [DESCRIPTIONS_STATE_KEY]: DescriptionsState,
  [DATA_REGISTRY_STATE_KEY]: DataRegistryState,
}

export const reducers: ActionReducerMap<RootState> = {
  [CORE_STATE_KEY]: coreReducer,
  [APPLICATION_PROFILE_STATE_KEY]: applicationProfileReducer,
  [SOCIAL_AGENT_STATE_KEY]: socialAgentsReducer,
  [DESCRIPTIONS_STATE_KEY]: descriptionsReducer,
  [DATA_REGISTRY_STATE_KEY]: dataRegistriesReducer,
};

export function localStorageSyncReducer(reducer: ActionReducer<RootState>): ActionReducer<RootState> {
  return localStorageSync({keys: [{ [CORE_STATE_KEY]: ['oidcIssuer', 'requestedPath']}], rehydrate: true})(reducer);
}

export const metaReducers: MetaReducer<RootState>[] = !ENV.production ? [localStorageSyncReducer] : [localStorageSyncReducer];
