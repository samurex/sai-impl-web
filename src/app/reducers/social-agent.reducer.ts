import {createReducer, on} from '@ngrx/store';
import { NormalizedState } from "./index";
import {SocialAgent} from '@janeirodigital/sai-api-messages';
import {DataActions} from "../actions/application.actions";
import {insertEntity, insertEntities} from "./utils";

export const SOCIAL_AGENT_STATE_KEY = 'social-agents';
export interface SocialAgentState extends NormalizedState<SocialAgent> {}

export const initialState: SocialAgentState = {
  byId: {},
  allIds: [],
};

export const socialAgentsReducer = createReducer(
  initialState,
  on(DataActions.socialAgentProfileReceived, (state, {profile}) => insertEntity(state, profile)),
  on(DataActions.socialAgentProfilesReceived, (state, {profiles}) => insertEntities(state, profiles)),
);
