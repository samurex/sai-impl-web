import {createFeatureSelector, createSelector} from "@ngrx/store";
import {DESCRIPTIONS_STATE_KEY, DescriptionsState} from "../reducers/descriptions.reducer";

export const selectDescriptionsFeature = createFeatureSelector<DescriptionsState>(DESCRIPTIONS_STATE_KEY);

export const selectDescriptions = createSelector(
  selectDescriptionsFeature,
  state => ([...Object.values(state.byId)][0]),
)
