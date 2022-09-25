import {createReducer, on} from "@ngrx/store";
import {CoreActions} from "../actions";

export const CORE_STATE_KEY = 'core';

export interface CoreState {
  oidcIssuer: string;
  webId: string;
  loginKnown: boolean;
  isLoggedIn: boolean;
  isServerLoggedIn: boolean;
  redirectUrl: string;
  requestedPath: string;
  language: string;
}

export const initialState: CoreState = {
  oidcIssuer: '',
  webId: '',
  loginKnown: false,
  isLoggedIn: false,
  isServerLoggedIn: false,
  redirectUrl: '',
  requestedPath: '/dashboard',
  language: 'en', // TODO allow user to set it
}

const excludedPaths = ['/', '/start', '/redirect', '/login', '/connect']

export const coreReducer = createReducer(
  initialState,
  on(CoreActions.loginInitiated, (state, {oidcIssuer}) => ({...state, oidcIssuer})),
  on(CoreActions.webIdReceived, (state, {webId}) => ({...state, webId})),
  on(CoreActions.loginStatusChanged, (state, {loggedIn}) => ({...state, isLoggedIn: loggedIn, loginKnown: true})),
  on(CoreActions.serverSessionReceived, (state, {isServerLoggedIn, redirectUrl}) => ({...state, isServerLoggedIn, redirectUrl: redirectUrl ? redirectUrl : ''})),
  on(CoreActions.pathRequested, (state, {requestedPath}) => ({
    ...state,
    requestedPath: excludedPaths.includes(requestedPath) ? '/dashboard' : requestedPath
  }))
)
