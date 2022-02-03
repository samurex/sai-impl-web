import { Injectable } from '@angular/core';
import {BehaviorSubject, map, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ENV} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _webId = new BehaviorSubject('');
  get webId() {
    return this._webId.value;
  }

  set webId(webId: string) {
    this._webId.next(webId);
  }

  constructor(
    private http: HttpClient,
  ) {}

  getWebId() {
    return this.http.get<{webId: string}>(ENV.API_URL + '/id', { responseType: "json"})
      .pipe(
        tap(response => this._webId.next(response.webId)),
        map(response => response.webId),
      );
  }
}
