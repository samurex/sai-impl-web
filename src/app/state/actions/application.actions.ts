import { createAction, props } from '@ngrx/store';
import { Application, DataRegistry, IRI, SocialAgent, Authorization, AccessAuthorization } from '@janeirodigital/sai-api-messages';

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

const addSocialAgent = createAction(
  '[SOCIAL AGENT PROFILES] Add Social Agent',
  props<{webId: IRI, label: string, note?: string}>()
)

const socialAgentProfileReceived = createAction(
  '[SOCIAL AGENT PROFILES] Single Social Agent Profile Received',
  props<{profile: SocialAgent}>(),
)

const dataRegistriesNeeded = createAction(
  '[DATA REGISTRIES] Data Registries Requested'
);

const dataRegistriesProvided = createAction(
  '[DATA REGISTRIES] Data Registries Received',
  props<{registries: DataRegistry[]}>(),
)

const authorizeApplication = createAction(
  '[APPLICATION PROFILES] Authorize Application',
  props<{ authorization: Authorization }>()
)

const authorizationReceived = createAction(
  '[APPLICATION PROFILES] Authorization Received',
  props<{ accessAuthorization: AccessAuthorization }>()
)

export const DataActions = {
  applicationsPanelLoaded,
  applicationProfilesReceived,
  applicationProfileReceived,
  socialAgentsPanelLoaded,
  socialAgentProfilesReceived,
  addSocialAgent,
  socialAgentProfileReceived,
  dataRegistriesNeeded,
  dataRegistriesProvided,
  authorizeApplication,
  authorizationReceived,
}
