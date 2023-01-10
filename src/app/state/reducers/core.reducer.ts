import {createReducer, on} from "@ngrx/store";
import {CoreActions} from "../actions";

export const CORE_STATE_KEY = 'core';
export const CORE_LANGUAGE_KEY = 'coreLanguage';

export const preferLanguage = JSON.parse(localStorage.getItem(CORE_LANGUAGE_KEY) || '{}');

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
  language: preferLanguage.language === '' || preferLanguage.language === undefined ? navigator.language.split('-')[0] : preferLanguage.language,
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
