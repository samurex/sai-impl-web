
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CORE_STATE_KEY, CoreState} from "../reducers/core.reducer";

export const selectCore = createFeatureSelector<CoreState>(CORE_STATE_KEY);

export const oidcIssuer = createSelector(
  selectCore,
  core => core.oidcIssuer,
);

export const redirectUrl = createSelector(
  selectCore,
  core => core.redirectUrl,
);

export const webId = createSelector(
  selectCore,
  core => core.webId,
);

export const loginKnown = createSelector(
  selectCore,
  core => core.loginKnown
)

export const loggedInStatus = createSelector(
  selectCore,
  core => core.isLoggedIn,
)

export const serverLoggedInStatus = createSelector(
  selectCore,
  core => core.isServerLoggedIn,
)

export const requestedPath = createSelector(
  selectCore,
  core => core.requestedPath,
);

export const bothEndsLoggedIn = createSelector(
  selectCore,
  core => core.isLoggedIn && core.isServerLoggedIn
)

export const prefLanguage = createSelector(
  selectCore,
  core => core.language
)
