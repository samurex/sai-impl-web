import {NormalizedState} from "./index";
import {createReducer, on} from "@ngrx/store";
import {AuthorizationData, IRI} from "@janeirodigital/sai-api-messages";
import {DescActions} from "../actions/description.actions";
import {insertEntity} from "./utils";

export const DESCRIPTIONS_STATE_KEY = 'descriptions';

export interface DescriptionsState extends NormalizedState<AuthorizationData> {
  selectedApplication: IRI | null
}

export const initialState: DescriptionsState = {
  byId: {},
  allIds: [],
  selectedApplication: null
}

export const descriptionsReducer = createReducer(
  initialState,
  on(DescActions.descriptionsNeeded, (state, {applicationId}) => ({...state, selectedApplication: applicationId })),
  on(DescActions.descriptionsReceived, (state, {authorizationData}) => ({ selectedApplication: state.selectedApplication, ...insertEntity(state, authorizationData)})),
)
