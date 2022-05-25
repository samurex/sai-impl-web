import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Application} from '../view-models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
  ) {}


  getApplicationProfiles(): Observable<Application[]> {
    return this.http.get<Application[]>('/api/applications', { responseType: 'json'});
  }

  // TODO (angel) typing
  getDescription(applicationId: string, lang: string): Observable<[]> {
    return this.http.get<[]>(`/api/descriptions/${encodeURI(applicationId)}/${lang}`, {responseType: 'json'});
  }
}
