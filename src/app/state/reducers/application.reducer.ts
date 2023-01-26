import {createReducer, on} from '@ngrx/store';
import {Application, IRI} from '@janeirodigital/sai-api-messages';
import * as DataActions from "../actions/application.actions";
import {createEntityAdapter, EntityState} from "@ngrx/entity";

export const APPLICATION_PROFILE_STATE_KEY = 'applications';
export interface ApplicationsState extends EntityState<Application>{
  selectedApplication: IRI | null;
}

const adapter = createEntityAdapter<Application>();

export const initialState: ApplicationsState =  adapter.getInitialState({
  selectedApplication: null,
});

export const applicationProfileReducer = createReducer(
  initialState,
  on(DataActions.applicationProfileReceived, (state, {profile}) => adapter.addOne(profile, state)),
  on(DataActions.applicationProfilesReceived, (state, {profiles}) => adapter.addMany(profiles, state)),
);

export const applicationAdapter = adapter;
