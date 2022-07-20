import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {serverLoggedInStatus, idP, webId} from "./selectors";
import {CoreActions} from "./actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'sai-web-app';
  idP = this.store.select(idP);
  webId = this.store.select(webId);
  isServerLoggedIn = this.store.select(serverLoggedInStatus);

  constructor(
    private store: Store,
  ) {}

  ngOnInit() {
  }
}
