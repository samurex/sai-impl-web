import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {map, Observable} from 'rxjs';
import { ENV } from 'src/environments/environment';
import { ApplicationProfile, IRI } from "@janeirodigital/sai-server/dist/sai-api";
import {Store} from "@ngrx/store";
import {DataActions} from "../../actions/application-profile.actions";
import {selectApplicationProfiles} from "../../selectors/application-profile.selectors";

@Component({
  selector: 'sai-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  applications = this.store.select(selectApplicationProfiles);

  constructor(
    private http: HttpClient,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(DataActions.applicationsPanelLoaded());
  }
}
