import {Component, OnInit} from '@angular/core';
import {handleIncomingRedirect} from "@inrupt/solid-client-authn-browser";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {CoreActions} from "../../actions";
import {firstValueFrom, Subscription} from "rxjs";
import {loggedInStatus} from "../../selectors";

@Component({
  selector: 'sai-redirect-handler',
  templateUrl: './redirect-handler.component.html',
  styleUrls: ['./redirect-handler.component.scss']
})
export class RedirectHandlerComponent implements OnInit {
  loggedInStatus$ = this.store.select(loggedInStatus)
  subscription?: Subscription

  constructor(
    private router: Router,
    private store: Store,
  ) { }

  // TODO: handle case of manual navigation to this route
  async ngOnInit(): Promise<void> {
    this.subscription = this.loggedInStatus$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/'])
      }
    })
    this.store.dispatch(CoreActions.incomingLoginRedirect({url: window.location.href}));
  }

  OnDestroy() {
    this.subscription?.unsubscribe()
  }
}
