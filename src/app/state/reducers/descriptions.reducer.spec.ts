import { AuthorizationData } from '@janeirodigital/sai-api-messages';
import { descriptionsReducer } from './descriptions.reducer';

describe('descriptions reducer', () => {
  const authorizationData1 = {
    id: 'auth-data-1'
  } as unknown as AuthorizationData

  const priorState = {
    byId: {
      'auth-data-1': authorizationData1
    },
    allIds: ['auth-data-1'],
    selectedApplication: 'app-1'
  }

  it('initial state', () => {
    const state = { byId: {}, allIds: [], selectedApplication: null }
    const expected = {...state}
    const action = { type: 'foo' };
    expect(descriptionsReducer(undefined, action)).toEqual(expected);
  });

  it('descriptionsNeeded', () => {
    const action = {
      type: '[DESCRIPTIONS] Descriptions needed for application',
      applicationId: 'app-2'
    }
    const newState = descriptionsReducer(priorState, action)
    expect(newState.allIds).toEqual(priorState.allIds);
    expect(newState.byId).toEqual(priorState.byId);
    expect(newState.selectedApplication).toEqual('app-2');
  })

  it('descriptionsReceived', () => {
    const authorizationData3 = {
      id: 'auth-data-3'
    } as unknown as AuthorizationData

    const action = {
      type: '[DESCRIPTIONS] Descriptions received for application',
      authorizationData: authorizationData3,
    }
    const newState = descriptionsReducer(priorState, action)
    expect(newState.selectedApplication).toEqual(priorState.selectedApplication)
    expect(newState.allIds).toEqual(jasmine.arrayContaining(['auth-data-1', 'auth-data-3']));
    expect(newState.byId).toEqual(jasmine.objectContaining({
      'auth-data-1': authorizationData1,
      'auth-data-3': authorizationData3,
    }));
  })
});
