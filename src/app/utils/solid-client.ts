import {Injectable} from "@angular/core";
import {from, Observable} from "rxjs";
import {getDefaultSession} from "@inrupt/solid-client-authn-browser";
import {mergeMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SolidClient {

  private _fetch = getDefaultSession().fetch;

  public fetch$(url: RequestInfo, init?: RequestInit): Observable<Response> {
    return from(this._fetch(url, init));
  }

  public fetch(url: RequestInfo, init?: RequestInit): Promise<Response> {
    return this._fetch(url, init);
  }
}


export function unwrapJson<T = any>(): (response$: Observable<Response>) => Observable<T> {
  return (response$: Observable<Response>): Observable<T> => {
    return response$.pipe(mergeMap(r => r.json()));
  };
}
