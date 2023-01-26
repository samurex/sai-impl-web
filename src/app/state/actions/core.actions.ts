
import { ISessionInfo } from '@inrupt/solid-client-authn-browser';
import {createAction, props} from '@ngrx/store';

export const loginRequested = createAction(
  '[CORE] Login Requested',
  props<{oidcIssuer: string}>(),
);

/**
 * Marks that the navigations has been handled off to the user IDP
 */
export const loginInitiated = createAction(
  '[CORE] Login Initiated',
   props<{oidcIssuer: string}>(),
);

// `url`- full url of incoming redirect
export const incomingLoginRedirect = createAction(
  '[CORE] Incoming Login Redirect',
  props<{url: string}>(),
);

export const oidcInfoReceived = createAction(
  '[CORE] OIDC Info Received',
  props<{oidcInfo: ISessionInfo}>(),
);

export const webIdReceived = createAction(
  '[CORE] WebId Received',
  props<{webId: string}>(),
)

export const loginStatusChanged = createAction(
  '[CORE] Login Status Changed',
  props<{loggedIn: boolean}>(),
)

export const serverSessionRequested = createAction(
  '[CORE] Server session status requested',
  props<{oidcIssuer: string}>(),
)

export const serverSessionReceived = createAction(
  '[CORE] Server session status received',
  props<{isServerLoggedIn: boolean, redirectUrl?: string}>(),
)

export const pathRequested = createAction(
  '[CORE] Path requested',
  props<{requestedPath: string}>()
)

export const requestName = createAction(
  '[CORE] Request Name',
)

export const serverLoginRequested = createAction(
  '[CORE] Server Login Requested'
);

/**
 * Marks that the navigations has been handled off to the user IDP
 */
export const serverLoginInitiated = createAction(
  '[CORE] Server login Initiated'
);
