import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {onSessionRestore} from '@inrupt/solid-client-authn-browser';
import {CoreActions} from "./actions";
import {serverLoggedInStatus, oidcIssuer, webId} from "./selectors";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'sai-web-app';
  oidcIssuer = this.store.select(oidcIssuer);
  webId = this.store.select(webId);
  isServerLoggedIn = this.store.select(serverLoggedInStatus);

  constructor(
    private router: Router,
    private store: Store,
  ) {
    // TODO ensure that requestedPath gets set even if oidc session can't be restored
    onSessionRestore((currentUrl: string) => {
      const url = new URL(currentUrl)
      let requestedPath = url.pathname + url.search
      this.store.dispatch(CoreActions.pathRequested({ requestedPath }))
    })
  }

  ngOnInit() {
    // '/' doesn't trigger any guards and we want to trigger start guard
    if (window.location.pathname === '/') {
      this.router.navigateByUrl('/start')
    }
  }
}
