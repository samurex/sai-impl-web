import { SolidClient } from '../utils/solid-client';
import { LoginService } from './login.service';
import type { SolidOidc } from '../utils/solid-oidc';
import { ENV } from 'src/environments/environment';

let loginService: LoginService;
let solidClientSpy: jasmine.SpyObj<SolidClient>;
let solidOidcSpy: jasmine.SpyObj<SolidOidc>;

const oidcIssuer = 'http://issuer.example'

beforeEach(() => {
  solidClientSpy = jasmine.createSpyObj('SolidClient', ['fetch']);
  solidOidcSpy = jasmine.createSpyObj('SolidOidc', ['login', 'handleIncomingRedirect']);

  loginService = new LoginService(solidClientSpy, solidOidcSpy);
});

describe('login', () => {
  it('should call solid oidc', async () => {
    await loginService.login(oidcIssuer);
    expect(solidOidcSpy.login).toHaveBeenCalledWith({
      clientId: ENV.OIDC_CLIENT_ID,
      oidcIssuer,
      redirectUrl: `${ENV.BASE_URL}/redirect`,
    })
  })
})

describe('checkServerSession', () => {
  const url = `${ENV.SRV_BASE}/login`
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({idp: oidcIssuer}),
  }

  it('server logged in', async () => {
    solidClientSpy.fetch.and.resolveTo({ status: 204 } as unknown as Response)
    const result = await loginService.checkServerSession(oidcIssuer);
    expect(result).toEqual({isServerLoggedIn: true})
    expect(solidClientSpy.fetch).toHaveBeenCalledWith(url, options);
  })

  it('server not logged in', async () => {
    const redirectUrl = `${oidcIssuer}/auth?beep=boop`
    solidClientSpy.fetch.and.resolveTo({ status: 200, json: async () => ({redirectUrl}) } as unknown as Response)
    const result = await loginService.checkServerSession(oidcIssuer);
    expect(result).toEqual({isServerLoggedIn: false, redirectUrl})
    expect(solidClientSpy.fetch).toHaveBeenCalledWith(url, options);
  })

  it('server error', async () => {
    solidClientSpy.fetch.and.resolveTo({ status: 500} as unknown as Response)
    const errorMessage = new RegExp('login check failed');
    await expectAsync(loginService.checkServerSession(oidcIssuer)).toBeRejectedWithError(Error, errorMessage)
    expect(solidClientSpy.fetch).toHaveBeenCalledWith(url, options);
  })
})

describe('handleRedirect', () => {
  it('should call solid oidc', async () => {
    const url = 'https://projectron.example/redirect?authorization_code=some-code'
    await loginService.handleRedirect(url);
    expect(solidOidcSpy.handleIncomingRedirect).toHaveBeenCalledWith(url);
  })
})

// TODO
describe('serverLogin', () => {
  xit('window.location.href gets set', () => undefined)
})
