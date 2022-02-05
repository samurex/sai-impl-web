
import { createReducer } from '@ngrx/store';
import { NormalizedState } from "./index";
import {ApplicationProfile} from '@janeirodigital/sai-server/dist/sai-api';

export interface ApplicationProfileState extends NormalizedState<ApplicationProfile> {};

export const initialState: ApplicationProfileState = {
  byId: {},
  allIds: [],
};

export const applicationProfileReducer = createReducer(
  initialState,
);
