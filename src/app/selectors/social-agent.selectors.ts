import {createFeatureSelector, createSelector} from "@ngrx/store";
import {SOCIAL_AGENT_STATE_KEY, SocialAgentState} from "../reducers/social-agent.reducer";

export const selectSocialAgentsFeature = createFeatureSelector<SocialAgentState>(SOCIAL_AGENT_STATE_KEY);

export const selectSocialAgents = createSelector(
  selectSocialAgentsFeature,
  state => ([...Object.values(state.byId)]),
)
