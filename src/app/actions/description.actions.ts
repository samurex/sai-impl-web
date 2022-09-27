import {createAction, props} from "@ngrx/store";
import { AuthorizationData } from '@janeirodigital/sai-api-messages'

const descriptionsNeeded = createAction(
  '[DESCRIPTIONS] Descriptions needed for application',
  props<{applicationId: string}>(),
);

const descriptionsReceived = createAction(
  '[DESCRIPTIONS] Descriptions received for application',
  props<{authorizationData: AuthorizationData}>(),
)

export const DescActions = {
  descriptionsNeeded,
  descriptionsReceived,
}
