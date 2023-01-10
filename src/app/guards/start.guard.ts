import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, filter, switchMap } from 'rxjs';
import {Store} from "@ngrx/store";
import {loginKnown, loggedInStatus, requestedPath, serverLoggedInStatus, redirectUrl} from "../state/selectors";

@Injectable({
  providedIn: 'root'
})
export class StartGuard implements CanActivateChild {

  constructor(
    private router: Router,
    private store: Store,
  ) {
    this.store.select(loginKnown).pipe(
      filter((loginKnown: boolean) => !loginKnown)
    ).subscribe(() => this.router.navigateByUrl('/dashboard'));

    this.store.select(loginKnown).pipe(
      filter((loginKnown: boolean) => loginKnown),
      switchMap(() => this.store.select(loggedInStatus)),
      filter((loggedIn: boolean) => !loggedIn),
    ).subscribe(() => this.router.navigateByUrl('/login'));

    this.store.select(loginKnown).pipe(
      filter((loginKnown: boolean) => loginKnown),
      switchMap(() => this.store.select(loggedInStatus)),
      filter((loggedIn: boolean) => loggedIn),
      switchMap(() => this.store.select(serverLoggedInStatus)),
      filter((serverLogggedIn: boolean) => !serverLogggedIn),
      switchMap(() => this.store.select(redirectUrl)),
      filter((redirectUrl) => !!redirectUrl),
    ).subscribe(() => this.router.navigateByUrl('/connect'));

    this.store.select(loginKnown).pipe(
      filter((loginKnown: boolean) => loginKnown),
      switchMap(() => this.store.select(loggedInStatus)),
      filter((loggedIn: boolean) => loggedIn),
      switchMap(() => this.store.select(serverLoggedInStatus)),
      filter((serverLogggedIn: boolean) => serverLogggedIn),
      switchMap(() => this.store.select(requestedPath)),
    ).subscribe((requestedPath) => this.router.navigateByUrl(requestedPath));
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true
  }

}
