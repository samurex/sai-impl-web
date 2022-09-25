import {createFeatureSelector, createSelector} from "@ngrx/store";
import {DATA_REGISTRY_STATE_KEY, DataRegistryState} from "../reducers/data-registry.reducer";

export const selectDataRegistriesFeature = createFeatureSelector<DataRegistryState>(DATA_REGISTRY_STATE_KEY);

export const selectDataRegistries = createSelector(
  selectDataRegistriesFeature,
  state => ([...Object.values(state.byId)]),
)
