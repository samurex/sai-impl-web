import {EMPTY, Observable, of} from 'rxjs';
import {provideMockActions} from '@ngrx/effects/testing';
import {TestBed} from '@angular/core/testing';
import {Action} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {selectIssuer, selectRedirectUrl} from '../selectors';
import {LoginService} from '../../services/login.service';
import {CoreEffects} from './core.effects';
import {ISessionInfo} from '@inrupt/solid-client-authn-browser';

let actions$ = new Observable<Action>();
let loginServiceSpy: jasmine.SpyObj<LoginService>;
let effects: CoreEffects;

const spy = jasmine.createSpyObj('LoginService', [
  'login',
  'handleRedirect',
  'serverLogin',
  'checkServerSession',
]);

const issuer = 'https://op.example'
const redirect = 'https://op.example/auth?beep=boop'

describe('CoreEffects', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CoreEffects,
        provideMockStore({
          selectors: [
            {
              selector: selectIssuer,
              value: issuer,
            },
            {
              selector: selectRedirectUrl,
              value: redirect,
            },
          ],
        }),
        provideMockActions(() => actions$),
        { provide: LoginService, useValue: spy },
      ],
    });

    loginServiceSpy = TestBed.inject(
      LoginService
    ) as jasmine.SpyObj<LoginService>;

    effects = TestBed.inject<CoreEffects>(CoreEffects);
  });

  it('login', (done) => {

    actions$ = of({
      type: '[CORE] Login Requested',
      oidcIssuer: issuer
    });
    loginServiceSpy.login.and.resolveTo(undefined);
    effects.login$.subscribe((action) => {
      expect(action).toEqual({
        type: '[CORE] Login Initiated',
        oidcIssuer: issuer
      });
      expect(loginServiceSpy.login).toHaveBeenCalledOnceWith(issuer);
      done();
    });
  });

  describe('handleIncomingRedirect', () => {
    beforeEach(() => {
      loginServiceSpy.handleRedirect.calls.reset();
      actions$ = of({
        type: '[CORE] Incoming Login Redirect',
        url,
      });
    });

    const url = 'https://server.example';

    it('success', (done) => {
      const expectedSessionInfo = {
        isLoggedIn: true,
        sessionId: 'session-id',
      } as ISessionInfo;
      loginServiceSpy.handleRedirect.and.callFake(
        async () => expectedSessionInfo
      );
      effects.handleIncomingRedirect$.subscribe((action) => {
        expect(action).toEqual({
          type: '[CORE] OIDC Info Received',
          oidcInfo: expectedSessionInfo,
        });
        expect(
          loginServiceSpy.handleRedirect
        ).toHaveBeenCalledOnceWith(url);
        done();
      });
    });

    it('failure', (done) => {
      const errorMessage = 'oidcInfo undefined'
      loginServiceSpy.handleRedirect.and.callFake(
        async () => undefined
      );
      effects.handleIncomingRedirect$.subscribe({
        error: (err: Error) => {
          expect(err.message).toEqual(errorMessage);
          expect(
            loginServiceSpy.handleRedirect
          ).toHaveBeenCalledOnceWith(url);
          done();
        }
      });
    });
  });
  describe('setLoggedIn', () => {
    it('logged in', (done) => {
      actions$ = of({
        type: '[CORE] OIDC Info Received',
        oidcInfo: {
          isLoggedIn: true
        }
      });
      effects.setLoggedIn$.subscribe((action) => {
        expect(action).toEqual({
          type: '[CORE] Login Status Changed',
          loggedIn: true
        });
        done();
      });
    });

    it('not logged in', (done) => {
      actions$ = of({
        type: '[CORE] OIDC Info Received',
        oidcInfo: {
          isLoggedIn: false
        }
      });
      effects.setLoggedIn$.subscribe((action) => {
        expect(action).toEqual({
          type: '[CORE] Login Status Changed',
          loggedIn: false
        });
        done();
      });
    });
  });

  describe('setWebId', () => {
    const webId = 'https://alice.example'
    it('logged in', (done) => {
      actions$ = of({
        type: '[CORE] OIDC Info Received',
        oidcInfo: {
          webId
        }
      });
      effects.setWebId$.subscribe((action) => {
        expect(action).toEqual({
          type: '[CORE] WebId Received',
          webId
        });
        done();
      });
    });
  });

  describe('checkServerSession', () => {
    it('logged in', (done) => {
      actions$ = of({
        type: '[CORE] Login Status Changed',
        loggedIn: true
      });
      effects.checkServerSession$.subscribe((action) => {
        expect(action).toEqual({
          type: '[CORE] Server session status requested',
          oidcIssuer: issuer
        });
        done();
      });
    });

    // TODO possibly change the implementation
    xit('not logged in', (done) => {
      actions$ = of({
        type: '[CORE] Login Status Changed',
        loggedIn: false
      });
      effects.checkServerSession$.subscribe((action) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(action).toEqual(EMPTY);
        done();
      });
    });
  });

  describe('serverSessionRequested', () => {
    it('logged in', (done) => {
      actions$ = of({
        type: '[CORE] Server session status requested'
      });
      loginServiceSpy.checkServerSession.and.resolveTo({isServerLoggedIn: true});
      effects.serverSessionRequested$.subscribe((action) => {
        expect(action).toEqual({
          type: '[CORE] Server session status received',
          isServerLoggedIn: true
        });
        done();
      });
    });

    it('not logged in', (done) => {
      actions$ = of({
        type: '[CORE] Server session status requested'
      });
      loginServiceSpy.checkServerSession.and.resolveTo({isServerLoggedIn: false, redirectUrl: redirect});
      effects.serverSessionRequested$.subscribe((action) => {
        expect(action).toEqual({
          type: '[CORE] Server session status received',
          isServerLoggedIn: false,
          redirectUrl: redirect
        });
        done();
      });
    });
  });

  describe('serverLoginRequested', () => {
    it('redirects to correct url', (done) => {

      actions$ = of({
        type: '[CORE] Server Login Requested'
      });
      loginServiceSpy.serverLogin.and.callFake(async () => undefined)
      effects.serverLoginRequested$.subscribe((action) => {
        expect(action).toEqual({
          type: '[CORE] Server login Initiated'
        });
        expect(loginServiceSpy.serverLogin).toHaveBeenCalledOnceWith(redirect);
        done();
      });
    });
  });
});
