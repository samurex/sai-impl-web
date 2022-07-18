
import {createAction, props} from '@ngrx/store';

const loginRequested = createAction(
  '[CORE] Login Requested',
  props<{idP: string}>(),
);

/**
 * Marks that the navigations has been handled off to the user IDP
 */
const loginInitiated = createAction(
  '[CORE] Login Initiated',
   props<{idP: string}>(),
);

const requestWebId = createAction(
  '[CORE] Request WebId',
);

const webIdReceived = createAction(
  '[CORE] WebId Received',
  props<{webId: string}>(),
)

const loginStatusChanged = createAction(
  '[CORE] Login Status Changed',
  props<{loggedIn: boolean}>(),
)

const serverSessionRequested = createAction(
  '[CORE] Server session status requested',
)

const serverSessionReceived = createAction(
  '[CORE] Server session status received',
  props<{loggedIn: boolean}>(),
)

const requestName = createAction(
  '[CORE] Request Name',
)



export const CoreActions = {
  loginRequested,
  loginInitiated,
  requestWebId,
  webIdReceived,
  loginStatusChanged,
  serverSessionRequested,
  serverSessionReceived,
  requestName,
};
