import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {from, map, tap, switchMap, Observable, withLatestFrom} from 'rxjs';
import {getDefaultSession} from '@inrupt/solid-client-authn-browser';
import {Store} from "@ngrx/store";
import {CoreActions} from "../state/actions";
import {bothEndsLoggedIn, loggedInStatus} from "../state/selectors"

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
      withLatestFrom(this.store.select(loggedInStatus)),
      tap(([recoveredStatus, loggedInStatus]) => {
        // dispatching while both false will result in setting loginKnown in the reducer
        if(!(recoveredStatus && loggedInStatus)) {
          this.store.dispatch(CoreActions.loginStatusChanged({loggedIn: recoveredStatus}));
        }}
      ),
      switchMap(() => this.store.select(bothEndsLoggedIn)),
      map((bothEndsLoggedIn) => bothEndsLoggedIn || this.router.parseUrl('start'))
    );
  }

  private async tryToRecoverSession(): Promise<boolean> {
    const session = getDefaultSession();

    if (!session.info.isLoggedIn) {
      // if session can be restored it will redirect to oidcIssuer, which will return back to `/redirect`
      await session.handleIncomingRedirect({restorePreviousSession: true});
    }
    return session.info.isLoggedIn
  }
}
