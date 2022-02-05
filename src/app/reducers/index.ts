import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { ENV } from '../../environments/environment';

import {CoreState, coreReducer, CORE_STATE_KEY} from "./core.reducer";
// import { ConsentsState, consentReducer } from "./consents.reducer";
import { ApplicationProfileState, applicationProfileReducer } from './application-profile.reducer';

import { IRI } from '@janeirodigital/sai-server/dist/sai-api';

export interface NormalizedState<T> {
  byId: { [id: IRI]: T },
  allIds: IRI[],
}
export interface State {
  [CORE_STATE_KEY]: CoreState,
  // consent: ConsentsState,
  applicationProfile: ApplicationProfileState,
}

export const reducers: ActionReducerMap<State> = {
  [CORE_STATE_KEY]: coreReducer,
  // consent: consentReducer,
  applicationProfile: applicationProfileReducer,
};

export const metaReducers: MetaReducer<State>[] = !ENV.production ? [] : [];
