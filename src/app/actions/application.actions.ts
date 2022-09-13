import { createAction, props } from '@ngrx/store';
import { Application, SocialAgent } from '@janeirodigital/sai-api-messages';

const applicationsPanelLoaded = createAction(
  '[APPLICATION PROFILES] Application Profiles Requested'
);

const applicationProfilesReceived = createAction(
  '[APPLICATION PROFILES] Application Profiles Received',
  props<{profiles: Application[]}>(),
)

const applicationProfileReceived = createAction(
  '[APPLICATION PROFILES] Adding Single Application Profile',
  props<{profile: Application}>(),
)

const socialAgentsPanelLoaded = createAction(
  '[SOCIAL AGENT PROFILES] Social Agent Profiles Requested'
);

const socialAgentProfilesReceived = createAction(
  '[SOCIAL AGENT PROFILES] Social Agent Profiles Received',
  props<{profiles: SocialAgent[]}>(),
)


export const DataActions = {
  applicationsPanelLoaded,
  applicationProfilesReceived,
  applicationProfileReceived,
  socialAgentsPanelLoaded,
  socialAgentProfilesReceived
}
