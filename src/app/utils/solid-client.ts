import {Injectable} from "@angular/core";
import {getDefaultSession} from "@inrupt/solid-client-authn-browser";

@Injectable({
  providedIn: 'root'
})
export class SolidClient {

  private _fetch = getDefaultSession().fetch;

  public fetch(url: RequestInfo, init?: RequestInit): Promise<Response> {
    return this._fetch(url, init);
  }
}
