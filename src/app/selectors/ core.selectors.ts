
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CORE_STATE_KEY, CoreState} from "../reducers/core.reducer";

export const selectCore = createFeatureSelector<CoreState>(CORE_STATE_KEY);

export const selectWebId = createSelector(
  selectCore,
  core => core.webId,
);
