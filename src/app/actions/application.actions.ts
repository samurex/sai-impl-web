import { createAction, props } from '@ngrx/store';
import { Application } from '@janeirodigital/sai-api-messages';

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

export const DataActions = {
  applicationsPanelLoaded,
  applicationProfilesReceived,
  applicationProfileReceived,
}
