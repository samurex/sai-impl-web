
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

export const loggedInStatus = createSelector(
  selectCore,
  core => core.isLoggedIn,
)

export const serverLoggedInStatus = createSelector(
  selectCore,
  core => core.isServerLoggedIn,
)
