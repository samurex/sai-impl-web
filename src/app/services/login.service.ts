import {Injectable} from '@angular/core';
import {ENV} from "../../environments/environment";
import {handleIncomingRedirect, ISessionInfo, login} from "@inrupt/solid-client-authn-browser";
import {SolidClient} from "../utils/solid-client";
import {from, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private solidClient: SolidClient,
  ) {}

  async login(oidcIssuer: string) {

    await login({
      clientId: ENV.OIDC_CLIENT_ID,
      oidcIssuer,
      redirectUrl: `${ENV.BASE_URL}/redirect`,
    });
  }

  async checkServerSession(idP: string): Promise<{isServerLoggedIn: boolean, redirectUrl?: string}> {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      // TODO cleanup variable naming for idp, idP, oidcIssuer
      body: JSON.stringify({idp: idP}),
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

  checkServerSession$(idP: string): Observable<{isServerLoggedIn: boolean, redirectUrl?: string}> {
    return from(this.checkServerSession(idP));
  }

  handleIncomingRedirect$(url: string): Observable<ISessionInfo | undefined> {
    return from(handleIncomingRedirect(url))
  }


  async serverLogin(redirectUrl: string) {
    window.location.href = redirectUrl
  }
}
