import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, filter, switchMap } from 'rxjs';
import {Store} from "@ngrx/store";
import {selectLoginKnown, selectLoggedInStatus, selectRequestedPath, selectServerLoggedInStatus, selectRedirectUrl} from "../state/selectors";

@Injectable({
  providedIn: 'root'
})
export class StartGuard implements CanActivateChild {

  constructor(
    private router: Router,
    private store: Store,
  ) {
    this.store.select(selectLoginKnown).pipe(
      filter((loginKnown: boolean) => !loginKnown)
    ).subscribe(() => this.router.navigateByUrl('/dashboard'));

    this.store.select(selectLoginKnown).pipe(
      filter((loginKnown: boolean) => loginKnown),
      switchMap(() => this.store.select(selectLoggedInStatus)),
      filter((loggedIn: boolean) => !loggedIn),
    ).subscribe(() => this.router.navigateByUrl('/login'));

    this.store.select(selectLoginKnown).pipe(
      filter((loginKnown: boolean) => loginKnown),
      switchMap(() => this.store.select(selectLoggedInStatus)),
      filter((loggedIn: boolean) => loggedIn),
      switchMap(() => this.store.select(selectServerLoggedInStatus)),
      filter((serverLoggedIn: boolean) => !serverLoggedIn),
      switchMap(() => this.store.select(selectRedirectUrl)),
      filter((redirectUrl) => !!redirectUrl),
    ).subscribe(() => this.router.navigateByUrl('/connect'));

    this.store.select(selectLoginKnown).pipe(
      filter((loginKnown: boolean) => loginKnown),
      switchMap(() => this.store.select(selectLoggedInStatus)),
      filter((loggedIn: boolean) => loggedIn),
      switchMap(() => this.store.select(selectServerLoggedInStatus)),
      filter((serverLoggedIn: boolean) => serverLoggedIn),
      switchMap(() => this.store.select(selectRequestedPath)),
    ).subscribe((requestedPath) => this.router.navigateByUrl(requestedPath));
  }

  canActivateChild(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    route: ActivatedRouteSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true
  }

}
