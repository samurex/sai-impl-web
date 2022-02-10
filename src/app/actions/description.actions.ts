import {createAction, props} from "@ngrx/store";


const descriptionsNeeded = createAction(
  '[DESCRIPTIONS] Descriptions needed for application',
  props<{applicationId: string, lang: string}>(),
);

const descriptionsReceived = createAction(
  '[DESCRIPTIONS] Descriptions received for application',
  // TODO (angel) typing
  props<{descriptions: []}>(),
)

export const DescActions = {
  descriptionsNeeded,
  descriptionsReceived,
}
