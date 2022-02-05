import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {selectWebId} from "./selectors";
import {State} from "./reducers";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'sai-web-app';
  webId = this.store.select(selectWebId);

  constructor(
    private store: Store,
  ) {}

  ngOnInit() {}
}
