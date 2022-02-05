import {createReducer, on} from "@ngrx/store";
import {CoreActions} from "../actions";

export const CORE_STATE_KEY = 'core';

export interface CoreState {
  webId: string;
}

export const initialState: CoreState = {
  webId: '',
}

export const coreReducer = createReducer(
  initialState,
  on(CoreActions.webIdReceived, (state, {webId}) => ({...state, webId}))
)
