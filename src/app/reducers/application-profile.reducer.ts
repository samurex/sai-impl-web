
import {createReducer, on} from '@ngrx/store';
import { NormalizedState } from "./index";
import {ApplicationProfile} from '@janeirodigital/sai-server/dist/sai-api';
import {DataActions} from "../actions/application-profile.actions";
import {insertEntity} from "./utils";

export const APPLICATION_PROFILE_STATE_KEY = 'application-profile';
export interface ApplicationProfileState extends NormalizedState<ApplicationProfile> {};

export const initialState: ApplicationProfileState = {
  byId: {},
  allIds: [],
};

export const applicationProfileReducer = createReducer(
  initialState,
  on(DataActions.applicationProfileReceived, (state, {profile}) => insertEntity(state, profile)),
);
