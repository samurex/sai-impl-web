
import {createAction, props} from '@ngrx/store';

const loginRequested = createAction(
  '[CORE] Login Requested',
  props<{idP: string}>(),
);

const loginInitiated = createAction(
  '[CORE] Login Initiated'
);

const requestWebId = createAction(
  '[CORE] Request WebId',
);

const webIdReceived = createAction(
  '[CORE] WebId Received',
  props<{webId: string}>(),
)

export const CoreActions = {
  loginRequested,
  loginInitiated,
  requestWebId,
  webIdReceived,
};
