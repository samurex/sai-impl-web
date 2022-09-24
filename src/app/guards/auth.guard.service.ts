import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {from, map, switchMap, Observable} from 'rxjs';
import {getDefaultSession} from '@inrupt/solid-client-authn-browser';
import {Store} from "@ngrx/store";
import {CoreActions} from "../actions";
import {bothEndsLoggedIn} from "../selectors"

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  constructor(
    private router: Router,
    private store: Store,
  ) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return from(this.tryToRecoverSession()).pipe(
      switchMap(() => this.store.select(bothEndsLoggedIn)),
      map((bothEndsLoggedIn) => bothEndsLoggedIn || this.router.parseUrl('start'))
    );
  }

  private async tryToRecoverSession(): Promise<void> {
    const session = getDefaultSession();

    if (!session.info.isLoggedIn) {
      // if sessoin can be restored it will redirect to oidcIssuer, which will return back to `/redirect`
      await session.handleIncomingRedirect({restorePreviousSession: true});
    }
    // TODO only dispatch if previous status was different
    this.store.dispatch(CoreActions.loginStatusChanged({loggedIn: session.info.isLoggedIn}));
  }
}
