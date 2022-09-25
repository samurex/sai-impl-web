import {createFeatureSelector, createSelector} from "@ngrx/store";
import {APPLICATION_PROFILE_STATE_KEY, ApplicationProfileState} from "../reducers/application.reducer";

export const selectApplicationsFeature = createFeatureSelector<ApplicationProfileState>(APPLICATION_PROFILE_STATE_KEY);

export const selectApplications = createSelector(
  selectApplicationsFeature,
  state => ([...Object.values(state.byId)]),
)
