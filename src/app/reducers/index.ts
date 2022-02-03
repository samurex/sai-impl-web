import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { ENV } from '../../environments/environment';

import { CoreState, coreReducer } from "./core.reducer";
import { ConsentsState, consentReducer } from "./consents.reducer";


export interface State {
  core: CoreState,
  consent: ConsentsState,
}

export const reducers: ActionReducerMap<State> = {
  core: coreReducer,
  consent: consentReducer,
};

export const metaReducers: MetaReducer<State>[] = !ENV.production ? [] : [];
