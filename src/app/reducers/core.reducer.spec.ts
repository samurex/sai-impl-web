import { coreReducer } from "./core.reducer";

const initialState = {
  oidcIssuer: '',
  webId: '',
  loginKnown: false,
  isLoggedIn: false,
  isServerLoggedIn: false,
  redirectUrl: '',
  requestedPath: '/dashboard',
  language: 'en',
}


describe('core reducer', () => {
  it('initial state', () => {
    const expected = {...initialState}
    const action = { type: 'foo' } as any;
    expect(coreReducer(undefined, action)).toEqual(expected);
  });

  it('loginInitiated', () => {
    const oidcIssuer = 'http://issuer.example'
    const action = {
      type: '[CORE] Login Initiated',
      oidcIssuer
    }
    expect(coreReducer(initialState, action)).toEqual({...initialState, oidcIssuer });
  })

  it('webIdReceived', () => {
    const webId = 'http://bob.example'
    const action = {
      type: '[CORE] WebId Received',
      webId
    }
    expect(coreReducer(initialState, action)).toEqual({...initialState, webId });
  })

  it('loginStatusChanged', () => {
    const loggedIn = true;
    const action = {
      type: '[CORE] Login Status Changed',
      loggedIn,
    }
    expect(coreReducer(initialState, action)).toEqual({...initialState, isLoggedIn: loggedIn, loginKnown: true });
  })

  it('serverSessionReceived with redirectUrl', () => {
    const isServerLoggedIn = false;
    const redirectUrl = 'http://issuer.example/authorization/'
    const action = {
      type: '[CORE] Server session status received',
      isServerLoggedIn,
      redirectUrl
    }
    expect(coreReducer(initialState, action)).toEqual({...initialState, isServerLoggedIn, redirectUrl });
  })

  it('serverSessionReceived without redirectUrl', () => {
    const isServerLoggedIn = true;
    const redirectUrl = 'http://issuer.example/authorization/'
    const action = {
      type: '[CORE] Server session status received',
      isServerLoggedIn,
    }
    expect(coreReducer(initialState, action)).toEqual({...initialState, isServerLoggedIn, redirectUrl: '' });
  })


  it('pathRequested when not excluded', () => {
    const requestedPath = '/path';
    const action = {
      type: '[CORE] Path requested',
      requestedPath,
    }
    expect(coreReducer(initialState, action)).toEqual({...initialState, requestedPath });
  });

  it('pathRequested when excluded', () => {
    ['/', '/start', '/redirect', '/login', '/connect'].forEach(requestedPath => {
      const action = {
        type: '[CORE] Path requested',
        requestedPath,
      }
      expect(coreReducer(initialState, action)).toEqual({...initialState, requestedPath: '/dashboard' });
    })
  });
})
