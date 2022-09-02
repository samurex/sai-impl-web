import {createAction, props} from "@ngrx/store";
import { Description } from '@janeirodigital/sai-api-messages'

const descriptionsNeeded = createAction(
  '[DESCRIPTIONS] Descriptions needed for application',
  props<{applicationId: string, lang: string}>(),
);

const descriptionsReceived = createAction(
  '[DESCRIPTIONS] Descriptions received for application',
  props<{descriptions: Description[]}>(),
)

export const DescActions = {
  descriptionsNeeded,
  descriptionsReceived,
}
