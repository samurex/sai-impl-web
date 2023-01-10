
import { ISessionInfo } from '@inrupt/solid-client-authn-browser';
import {createAction, props} from '@ngrx/store';

const loginRequested = createAction(
  '[CORE] Login Requested',
  props<{oidcIssuer: string}>(),
);

/**
 * Marks that the navigations has been handled off to the user IDP
 */
const loginInitiated = createAction(
  '[CORE] Login Initiated',
   props<{oidcIssuer: string}>(),
);

// `url`- full url of incoming redirect
const incomingLoginRedirect = createAction(
  '[CORE] Incoming Login Redirect',
  props<{url: string}>(),
);

const oidcInfoReceived = createAction(
  '[CORE] OIDC Info Received',
  props<{oidcInfo: ISessionInfo}>(),
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
  props<{oidcIssuer: string}>(),
)

const serverSessionReceived = createAction(
  '[CORE] Server session status received',
  props<{isServerLoggedIn: boolean, redirectUrl?: string}>(),
)

const pathRequested = createAction(
  '[CORE] Path requested',
  props<{requestedPath: string}>()
)

const requestName = createAction(
  '[CORE] Request Name',
)

const serverLoginRequested = createAction(
  '[CORE] Server Login Requested'
);

/**
 * Marks that the navigations has been handled off to the user IDP
 */
const serverLoginInitiated = createAction(
  '[CORE] Server login Initiated'
);

export const CoreActions = {
  loginRequested,
  loginInitiated,
  incomingLoginRedirect,
  oidcInfoReceived,
  webIdReceived,
  loginStatusChanged,
  serverSessionRequested,
  serverSessionReceived,
  pathRequested,
  requestName,
  serverLoginRequested,
  serverLoginInitiated
};
