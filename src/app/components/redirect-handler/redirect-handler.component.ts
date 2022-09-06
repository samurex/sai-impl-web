import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {CoreActions} from "../../actions";
import {Subscription} from "rxjs";
import {loggedInStatus, requestedPath} from "../../selectors";

@Component({
  selector: 'sai-redirect-handler',
  templateUrl: './redirect-handler.component.html',
  styleUrls: ['./redirect-handler.component.scss']
})
export class RedirectHandlerComponent implements OnInit {
  loggedInStatus$ = this.store.select(loggedInStatus)
  requestedPath$ = this.store.select(requestedPath)
  isLoggedInSubscription?: Subscription
  requestedPathSubscription?: Subscription

  constructor(
    private router: Router,
    private store: Store,
  ) { }

  // TODO: handle case of manual navigation to this route
  async ngOnInit(): Promise<void> {
    this.isLoggedInSubscription = this.loggedInStatus$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
      this.requestedPathSubscription = this.requestedPath$.subscribe(path => {
          this.router.navigateByUrl(path)
        })
      }
    })
    this.store.dispatch(CoreActions.incomingLoginRedirect({url: window.location.href}));
  }

  OnDestroy() {
    this.isLoggedInSubscription?.unsubscribe()
    this.requestedPathSubscription?.unsubscribe()
  }
}
