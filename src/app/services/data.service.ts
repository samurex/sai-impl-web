import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable} from "rxjs";
import {ApplicationProfile} from '../view-models';
import {AccessConsent} from "../../../../sai-impl-service/src/sai-api";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
  ) { }

  getApplicationProfiles(): Observable<ApplicationProfile[]> {
    return this.http.get<ApplicationProfile[]>('/api/application-profiles', { responseType: 'json'});
  }

  getConsents(): Observable<AccessConsent[]> {
    return this.http.get<AccessConsent[]>('/api/access-consents', {responseType: 'json'});
  }

}
