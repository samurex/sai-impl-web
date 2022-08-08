import {createReducer, on} from "@ngrx/store";
import {CoreActions} from "../actions";

export const CORE_STATE_KEY = 'core';

export interface CoreState {
  oidcIssuer: string;
  webId: string;
  isLoggedIn: boolean;
  isServerLoggedIn: boolean;
  redirectUrl: string;
}

export const initialState: CoreState = {
  oidcIssuer: '',
  webId: '',
  isLoggedIn: false,
  isServerLoggedIn: false,
  redirectUrl: '',
}

export const coreReducer = createReducer(
  initialState,
  on(CoreActions.loginInitiated, (state, {oidcIssuer}) => ({...state, oidcIssuer})),
  on(CoreActions.webIdReceived, (state, {webId}) => ({...state, webId})),
  on(CoreActions.loginStatusChanged, (state, {loggedIn}) => ({...state, isLoggedIn: loggedIn})),
  on(CoreActions.serverSessionReceived, (state, {isServerLoggedIn, redirectUrl}) => ({...state, isServerLoggedIn, redirectUrl: redirectUrl ? redirectUrl : ''}))
)
