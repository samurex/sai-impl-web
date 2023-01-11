
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CORE_STATE_KEY, CoreState} from "../reducers/core.reducer";

export const selectCore = createFeatureSelector<CoreState>(CORE_STATE_KEY);

export const selectIssuer = createSelector(
  selectCore,
  core => core.oidcIssuer,
);

export const selectRedirectUrl = createSelector(
  selectCore,
  core => core.redirectUrl,
);

export const selectWebId = createSelector(
  selectCore,
  core => core.webId,
);

export const selectLoginKnown = createSelector(
  selectCore,
  core => core.loginKnown
)

export const selectLoggedInStatus = createSelector(
  selectCore,
  core => core.isLoggedIn,
)

export const selectServerLoggedInStatus = createSelector(
  selectCore,
  core => core.isServerLoggedIn,
)

export const selectRequestedPath = createSelector(
  selectCore,
  core => core.requestedPath,
);

export const selectBothEndsLoggedIn = createSelector(
  selectCore,
  core => core.isLoggedIn && core.isServerLoggedIn
)

export const selectPrefLanguage = createSelector(
  selectCore,
  core => core.language
)
