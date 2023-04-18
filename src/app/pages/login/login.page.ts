import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {loginRequested} from "../../state/actions/core.actions";

@Component({
  selector: 'sai-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
})

export class LoginPage {

  constructor(
    private store: Store,
  ) {}

  handleLogin(oidcIssuer: string) {
    this.store.dispatch(loginRequested({oidcIssuer}));
  }
}
