import { createAction, props } from '@ngrx/store';
import { Application, DataRegistry, IRI, SocialAgent, Authorization, AccessAuthorization } from '@janeirodigital/sai-api-messages';

export const applicationsPanelLoaded = createAction(
  '[APPLICATION PROFILES] Application Profiles Requested'
);

export const applicationProfilesReceived = createAction(
  '[APPLICATION PROFILES] Application Profiles Received',
  props<{profiles: Application[]}>(),
)

export const applicationProfileReceived = createAction(
  '[APPLICATION PROFILES] Adding Single Application Profile',
  props<{profile: Application}>(),
)

export const unregisteredApplicationProfileRequested = createAction(
  '[APPLICATION] Unregistered Application Profile Requested',
  props<{applicationId: string }>(),
)

export const unregisteredApplicationProfileReceived = createAction(
  '[APPLICATION] Unregistered Application Profile Received',
  props<{profile: Partial<Application> }>(),
)

export const unregisteredApplicationProfileError = createAction(
  '[APPLICATION] Error retrieving Unregistered Application Profile'
);
export const socialAgentsPanelLoaded = createAction(
  '[SOCIAL AGENT PROFILES] Social Agent Profiles Requested'
);

export const socialAgentProfilesReceived = createAction(
  '[SOCIAL AGENT PROFILES] Social Agent Profiles Received',
  props<{profiles: SocialAgent[]}>(),
)

export const addSocialAgent = createAction(
  '[SOCIAL AGENT PROFILES] Add Social Agent',
  props<{webId: IRI, label: string, note?: string}>()
)

export const socialAgentProfileReceived = createAction(
  '[SOCIAL AGENT PROFILES] Single Social Agent Profile Received',
  props<{profile: SocialAgent}>(),
)

export const dataRegistriesNeeded = createAction(
  '[DATA REGISTRIES] Data Registries Requested'
);

export const dataRegistriesProvided = createAction(
  '[DATA REGISTRIES] Data Registries Received',
  props<{registries: DataRegistry[]}>(),
)

