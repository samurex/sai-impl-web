import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ENV} from "../../environments/environment";
import {map, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  constructor(
    private http: HttpClient,
  ) {}

  login(issuer?: string) {
    this.http.post('/auth/login', {idp: issuer || ENV.DEFAULT_IDP}, {responseType:'text'})
      .subscribe(url => {
        window.location.href = url;
      });
  }

  getWebId(): Observable<string> {
    return this.http.get('/api/id', {responseType: 'text'});
  }
}
