import {createReducer, on} from '@ngrx/store';
import { NormalizedState } from "./index";
import {DataRegistry} from '@janeirodigital/sai-api-messages';
import {DataActions} from "../actions/application.actions";
import {insertEntities} from "./utils";

export const DATA_REGISTRY_STATE_KEY = 'data';
export type DataRegistryState = NormalizedState<DataRegistry>

export const initialState: DataRegistryState = {
  byId: {},
  allIds: [],
};

export const dataRegistriesReducer = createReducer(
  initialState,
  on(DataActions.dataRegistriesProvided, (state, {registries}) => insertEntities(state, registries)),
);
