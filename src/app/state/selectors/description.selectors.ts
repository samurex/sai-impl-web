import {createFeatureSelector, createSelector} from "@ngrx/store";
import {DESCRIPTIONS_STATE_KEY, DescriptionsState} from "../reducers/descriptions.reducer";

export const selectDescriptionsFeature = createFeatureSelector<DescriptionsState>(DESCRIPTIONS_STATE_KEY);

export const selectDescriptions = createSelector(
  selectDescriptionsFeature,
  state => (state.byId[state.selectedApplication!]),
)

export const selectCurrentApplication = createSelector(
  selectDescriptionsFeature,
  state => state.selectedApplication,
);
