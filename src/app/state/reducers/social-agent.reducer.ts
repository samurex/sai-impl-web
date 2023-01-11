import {createReducer, on} from '@ngrx/store';
import {SocialAgent} from '@janeirodigital/sai-api-messages';
import {DataActions} from "../actions/application.actions";
import {createEntityAdapter, EntityState} from "@ngrx/entity";

export const SOCIAL_AGENT_STATE_KEY = 'social-agents';
export type SocialAgentState = EntityState<SocialAgent>
const adapter = createEntityAdapter<SocialAgent>();

export const initialState: SocialAgentState = adapter.getInitialState();

export const socialAgentsReducer = createReducer(
  initialState,
  on(DataActions.socialAgentProfileReceived, (state, {profile}) => adapter.addOne(profile, state)),
  on(DataActions.socialAgentProfilesReceived, (state, {profiles}) => adapter.addMany(profiles, state)),
);

export const socialAgentAdapter = adapter;
