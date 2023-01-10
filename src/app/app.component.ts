import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {onSessionRestore} from '@inrupt/solid-client-authn-browser';
import {CoreActions} from "./state/actions";
import {loggedInStatus, oidcIssuer, webId} from "./state/selectors";
import {SwPush} from '@angular/service-worker';
import {PushService} from "./services/push.service";
import {ENV} from "../environments/environment";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'sai-web-app';
  oidcIssuer = this.store.select(oidcIssuer);
  webId = this.store.select(webId);
  isLoggedIn = this.store.select(loggedInStatus);

  subscription$ = this.swPush.subscription;

  constructor(
    private router: Router,
    private store: Store,
    private swPush: SwPush,
    private push: PushService,
    translate: TranslateService,
  ) {
    // TODO ensure that requestedPath gets set even if oidc session can't be restored
    onSessionRestore((currentUrl: string) => {
      const url = new URL(currentUrl)
      let requestedPath = url.pathname + url.search
      this.store.dispatch(CoreActions.pathRequested({ requestedPath }))
    })

    this.swPush.notificationClicks.subscribe(({ notification }) => {
      this.router.navigateByUrl(`/add-social-agent?webid=${notification.data.webId}`)
    });

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  ngOnInit() {
    // '/' doesn't trigger any guards and we want to trigger start guard
    if (window.location.pathname === '/') {
      this.router.navigateByUrl('/start')
    }
  }

  async subscribeToNotifications() {
    const subscription = await this.swPush.requestSubscription({
      serverPublicKey: ENV.VAPID_PUBLIC_KEY
    });
    await this.push.subscribe(subscription)
  }
}
