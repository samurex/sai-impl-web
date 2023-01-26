import {createAction, props} from "@ngrx/store";
import { AuthorizationData } from '@janeirodigital/sai-api-messages'

export const descriptionsNeeded = createAction(
  '[DESCRIPTIONS] Descriptions needed for application',
  props<{applicationId: string}>(),
);

export const descriptionsReceived = createAction(
  '[DESCRIPTIONS] Descriptions received for application',
  props<{authorizationData: AuthorizationData}>(),
)
