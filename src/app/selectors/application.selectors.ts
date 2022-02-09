import {createFeatureSelector, createSelector} from "@ngrx/store";
import {APPLICATION_PROFILE_STATE_KEY, ApplicationProfileState} from "../reducers/application.reducer";

export const selectApplicationProfilesFeature = createFeatureSelector<ApplicationProfileState>(APPLICATION_PROFILE_STATE_KEY);

export const selectApplicationProfiles = createSelector(
  selectApplicationProfilesFeature,
  state => ([...Object.values(state.byId)]),
)
