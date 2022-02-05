import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ApplicationProfile} from '@janeirodigital/sai-server/dist/sai-api';

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

}
