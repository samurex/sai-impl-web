import {createReducer, on} from "@ngrx/store";
import {CoreActions} from "../actions";

export const CORE_STATE_KEY = 'core';

export interface CoreState {
  idP: string;
  webId: string;
  isLoggedIn: boolean;
  isServerLoggedIn: boolean;
  redirectUrl: string;
}

export const initialState: CoreState = {
  idP: '',
  webId: '',
  isLoggedIn: false,
  isServerLoggedIn: false,
  redirectUrl: '',
}

export const coreReducer = createReducer(
  initialState,
  on(CoreActions.loginInitiated, (state, {idP}) => ({...state, idP})),
  on(CoreActions.webIdReceived, (state, {webId}) => ({...state, webId})),
  on(CoreActions.loginStatusChanged, (state, {loggedIn}) => ({...state, isLoggedIn: loggedIn})),
  on(CoreActions.serverSessionReceived, (state, {isServerLoggedIn, redirectUrl}) => ({...state, isServerLoggedIn, redirectUrl: redirectUrl ? redirectUrl : ''}))
)
