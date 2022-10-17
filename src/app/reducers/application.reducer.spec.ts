import { applicationProfileReducer } from './application.reducer';

describe('application profile reducer', () => {
  const profile1 = {
    id: 'app-1',
    name: 'App',
    logo: 'https://some.example/logo.png',
    authorizationDate: '2022-10-17T17:07:58.799Z',
    lastUpdateDate: '2022-10-17T18:07:58.799Z',
    accessNeedGroup: 'https://some.example/needs',
  }
  const profile2 = {
    id: 'app-2',
    name: 'App 2',
    logo: 'https://some.example/logo.png',
    authorizationDate: '2022-10-17T17:07:58.799Z',
    lastUpdateDate: '2022-10-17T18:07:58.799Z',
    accessNeedGroup: 'https://some.example/needs2',
  }
  const priorState = {
    byId: {
      'app-1': profile1
    },
    allIds: ['app-1']
  }

  it('initial state', () => {
    const state = { byId: {}, allIds: [] }
    const expected = {...state}
    const action = { type: 'foo' } as any;
    expect(applicationProfileReducer(undefined, action)).toEqual(expected);
  });

  it('applicationProfileReceived', () => {
    const action = {
      type: '[APPLICATION PROFILES] Adding Single Application Profile',
      profile: profile2
    }
    const newState = applicationProfileReducer(priorState, action)
    expect(newState.allIds).toEqual(jasmine.arrayContaining(['app-1', 'app-2']));
    expect(newState.byId).toEqual(jasmine.objectContaining({
      'app-1': profile1,
      'app-2': profile2
    }));
  })

  it('applicationProfilesReceived', () => {
    const profile3 = {
      id: 'app-3',
      name: 'App 3',
      logo: 'https://some.example/logo.png',
      authorizationDate: '2022-10-17T17:07:58.799Z',
      lastUpdateDate: '2022-10-17T18:07:58.799Z',
      accessNeedGroup: 'https://some.example/needs3',
    }
    const action = {
      type: '[APPLICATION PROFILES] Application Profiles Received',
      profiles: [profile2, profile3]
    }
    const newState = applicationProfileReducer(priorState, action)
    expect(newState.allIds).toEqual(jasmine.arrayContaining(['app-1', 'app-2', 'app-3']));
    expect(newState.byId).toEqual(jasmine.objectContaining({
      'app-1': profile1,
      'app-2': profile2,
      'app-3': profile3
    }));
  })
});
