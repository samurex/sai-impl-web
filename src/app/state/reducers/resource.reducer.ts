import {createReducer, on} from '@ngrx/store';
import {Resource} from '@janeirodigital/sai-api-messages';

// TODO why are `DATA`actions imported from `APPLICATION`.actions in the `RESOURCE`.reducer?
import * as DataActions from "../actions/application.actions";
import {createEntityAdapter, EntityState} from "@ngrx/entity";

export const RESOURCE_STATE_KEY = 'resources';
export type ResourceState = EntityState<Resource>
const adapter = createEntityAdapter<Resource>();

export const initialState: ResourceState = adapter.getInitialState();

export const resourcesReducer = createReducer(
  initialState,
  on(DataActions.resourceReceived, (state, {resource}) => adapter.addOne(resource, state)),
);

export const ResourceAdapter = adapter;
