
import {createReducer, on} from '@ngrx/store';
import { NormalizedState } from "./index";
import {Application} from '@janeirodigital/sai-api-messages';
import {DataActions} from "../actions/application.actions";
import {insertEntity} from "./utils";

export const APPLICATION_PROFILE_STATE_KEY = 'applications';
export interface ApplicationProfileState extends NormalizedState<Application> {}

export const initialState: ApplicationProfileState = {
  byId: {},
  allIds: [],
};

export const applicationProfileReducer = createReducer(
  initialState,
  on(DataActions.applicationProfileReceived, (state, {profile}) => insertEntity(state, profile)),
);
