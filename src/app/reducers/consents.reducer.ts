import {createReducer} from "@ngrx/store";

export interface ConsentsState {
  consentId: string;
}

export const initialState: ConsentsState = {
  consentId: 'consent-id-0001',
};

export const consentReducer = createReducer(
  initialState,
)
