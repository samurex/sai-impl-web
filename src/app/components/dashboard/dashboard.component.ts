import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {map, Observable} from 'rxjs';
import { ENV } from 'src/environments/environment';
import { ApplicationProfile, IRI } from "@janeirodigital/sai-server/dist/sai-api";
import {Store} from "@ngrx/store";

@Component({
  selector: 'sai-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data!: Observable<{shapeTree: string, dataInstances: string[]}[]>;
  applications!: Observable<ApplicationProfile[]>;

  constructor(
    private http: HttpClient,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.data = this.http.get<{shapeTree: string, dataInstances: string[]}[]>(ENV.API_URL + '/data', { responseType: 'json' });

    this.applications = this.http.get<{profile: ApplicationProfile, accessGrant: IRI}[]>(ENV.API_URL + '/applications', { responseType: 'json'})
      .pipe(map(pairs => pairs.map(pair => pair.profile)));
  }

  loadData() {
  }
}
