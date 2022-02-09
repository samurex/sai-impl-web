import {NormalizedState} from "./index";
import {createReducer} from "@ngrx/store";
import {Description} from "../view-models";

export const DESCRIPTIONS_STATE_KEY = 'descriptions';

export interface DescriptionsState extends NormalizedState<Description> {};

export const initialState: DescriptionsState = {
  byId: {},
  allIds: [],
}

export const descriptionsReducer = createReducer(
  initialState,
)
