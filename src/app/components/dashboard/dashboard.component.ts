import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {map, Observable, tap} from 'rxjs';
import { ENV } from 'src/environments/environment';
import {StateService} from "../../services/state.service";
import { ApplicationProfile, IRI } from "@janeirodigital/sai-server/dist/sai-api";

@Component({
  selector: 'sai-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data!: Observable<{shapeTree: string, dataInstances: string[]}[]>;
  applications!: Observable<ApplicationProfile[]>;

  constructor(
    public state: StateService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.data = this.http.get<{shapeTree: string, dataInstances: string[]}[]>(ENV.API_URL + '/data', { responseType: 'json' })
      .pipe(tap(() => console.log('Data:')))
      .pipe(tap(console.log));

    this.applications = this.http.get<{profile: ApplicationProfile, accessGrant: IRI}[]>(ENV.API_URL + '/applications', { responseType: 'json'})
      .pipe(map(pairs => pairs.map(pair => pair.profile)))
  }

  loadData() {
  }
}
