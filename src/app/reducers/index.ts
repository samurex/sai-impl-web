import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { ENV } from '../../environments/environment';

import {CoreState, coreReducer, CORE_STATE_KEY} from "./core.reducer";
import {
  ApplicationProfileState,
  applicationProfileReducer,
  APPLICATION_PROFILE_STATE_KEY,
} from './application-profile.reducer';

import { IRI, UniqueId } from '@janeirodigital/sai-server/dist/sai-api';

export interface NormalizedState<T extends UniqueId> {
  byId: { [id: IRI]: T },
  allIds: IRI[],
}


export interface RootState {
  [CORE_STATE_KEY]: CoreState,
  [APPLICATION_PROFILE_STATE_KEY]: ApplicationProfileState,
}

export const reducers: ActionReducerMap<RootState> = {
  [CORE_STATE_KEY]: coreReducer,
  [APPLICATION_PROFILE_STATE_KEY]: applicationProfileReducer,
};

export const metaReducers: MetaReducer<RootState>[] = !ENV.production ? [] : [];
