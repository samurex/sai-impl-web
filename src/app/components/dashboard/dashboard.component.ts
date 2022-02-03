import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Observable, tap } from 'rxjs';
import { ENV } from 'src/environments/environment';
import {StateService} from "../../services/state.service";

@Component({
  selector: 'sai-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data!: Observable<{shapeTree: string, dataInstances: string[]}[]>;
  applications!: Observable<string[]>;

  constructor(
    public state: StateService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.data = this.http.get<{shapeTree: string, dataInstances: string[]}[]>(ENV.API_URL + '/data', { responseType: 'json' })
      .pipe(tap(console.log));

    this.applications = this.http.get(ENV.API_URL + '/applications', { responseType: 'json'})
      .pipe(tap(console.log));
  }

  loadData() {
  }
}
