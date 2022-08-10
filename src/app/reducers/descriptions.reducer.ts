import {NormalizedState} from "./index";
import {createReducer, on} from "@ngrx/store";
import {Description} from "@janeirodigital/sai-api-messages";
import {DescActions} from "../actions/description.actions";
import {insertEntities} from "./utils";

export const DESCRIPTIONS_STATE_KEY = 'descriptions';

export interface DescriptionsState extends NormalizedState<Description> {}

export const initialState: DescriptionsState = {
  byId: {},
  allIds: [],
}

export const descriptionsReducer = createReducer(
  initialState,
  on(DescActions.descriptionsReceived, (state, {descriptions}) => insertEntities(state, descriptions)),
)
