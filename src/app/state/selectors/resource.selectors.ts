import { IRI } from "@janeirodigital/sai-api-messages";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {RESOURCE_STATE_KEY, ResourceState} from "../reducers/resource.reducer";

export const selectDataRegistriesFeature = createFeatureSelector<ResourceState>(RESOURCE_STATE_KEY);

// TODO: verify if this is the right way to get entity by ID in ngrx-entity
export const selectResource = (id: IRI) =>
  createSelector(
    selectDataRegistriesFeature,
    state => state.entities[id],
  )
