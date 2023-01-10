import {createFeatureSelector, createSelector} from "@ngrx/store";
import {APPLICATION_PROFILE_STATE_KEY, applicationAdapter, ApplicationsState} from "../reducers/application.reducer";
import { selectCurrentApplication } from "./description.selectors";

export const selectApplicationsFeature = createFeatureSelector<ApplicationsState>(APPLICATION_PROFILE_STATE_KEY);

const internalSelectors = applicationAdapter.getSelectors();

// TODO use this instead of importing from 'descriptions' slice. To use first have to update the applications state to
//      track the current application
// export const getSelectedApplicationId = createSelector(
//   selectApplicationsFeature,
//   state => state.selectedApplication,
// );

export const getSelectedApplication = createSelector(
  selectApplicationsFeature,
  // getSelectedApplicationId,
  selectCurrentApplication,
  (state, id) => id ? state.entities[id] : null,
)


export const selectApplications = createSelector(
  selectApplicationsFeature,
  internalSelectors.selectAll,
)
