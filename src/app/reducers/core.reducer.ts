import {createReducer} from "@ngrx/store";

export interface CoreState {
  webId: string;
}

export const initialState: CoreState = {
  webId: 'https://me.provider.org',
}

export const coreReducer = createReducer(
  initialState,
)
