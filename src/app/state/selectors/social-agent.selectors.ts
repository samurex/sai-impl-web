import {createFeatureSelector, createSelector} from "@ngrx/store";
import {SOCIAL_AGENT_STATE_KEY, socialAgentAdapter, SocialAgentState} from "../reducers/social-agent.reducer";

export const selectSocialAgentsFeature = createFeatureSelector<SocialAgentState>(SOCIAL_AGENT_STATE_KEY);

const selectors = socialAgentAdapter.getSelectors();

export const selectSocialAgents = createSelector(
  selectSocialAgentsFeature,
  selectors.selectAll,
)
