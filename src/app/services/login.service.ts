import {Injectable} from '@angular/core';
import {ENV} from "../../environments/environment";
import {ISessionInfo} from "@inrupt/solid-client-authn-browser";
import {SolidClient} from "../utils/solid-client";
import { SolidOidc } from '../utils/solid-oidc';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private solidClient: SolidClient,
    private solidOidc: SolidOidc,
  ) {}

  async login(oidcIssuer: string) {

    await this.solidOidc.login({
      clientId: ENV.OIDC_CLIENT_ID,
      oidcIssuer,
      redirectUrl: `${ENV.BASE_URL}/redirect`,
    });
  }

  async checkServerSession(oidcIssuer: string): Promise<{isServerLoggedIn: boolean, redirectUrl?: string}> {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({idp: oidcIssuer}),
    }
    const result = await this.solidClient.fetch(`${ENV.SRV_BASE}/login`, options)

    if (result.status === 204) {
      return {isServerLoggedIn: true}
    } else if (result.status === 200) {
      const {redirectUrl} = await result.json()
      return  {isServerLoggedIn: false, redirectUrl}
    } else {
      throw new Error(`login check failed, stauts=${result.status}`)
    }
  }

  async handleRedirect(url: string): Promise<ISessionInfo | undefined> {
    return this.solidOidc.handleIncomingRedirect(url);
  }

  async serverLogin(redirectUrl: string) {
    window.location.href = redirectUrl
  }
}
