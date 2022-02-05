
import { createAction, props } from '@ngrx/store';
import { ApplicationProfile } from '@janeirodigital/sai-server/dist/sai-api';

const applicationsPanelLoaded = createAction(
  '[APPLICATIONS] Application Profiles Requested'
);

const applicationProfilesReceived = createAction(
  '[APPLICATIONS] Application Profiles Received',
  props<{profiles: ApplicationProfile[]}>(),
)

export const DataActions = {
  applicationsListingLoaded: applicationsPanelLoaded,
  applicationProfilesReceived
}
