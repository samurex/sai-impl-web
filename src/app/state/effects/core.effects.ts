import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType, concatLatestFrom} from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { EMPTY, map, tap, of, from} from "rxjs";
import {LoginService} from "../../services/login.service";
import {CoreActions} from "../actions";
import {mergeMap} from "rxjs/operators";
import * as selectors from "../selectors";

@Injectable()
export class CoreEffects {

  constructor(
    private actions$: Actions,
    private id: LoginService,
    private store: Store,
  ) {}

  login$ = createEffect(() => this.actions$.pipe(
    ofType(CoreActions.loginRequested),
    map(({oidcIssuer}) => CoreActions.loginInitiated({oidcIssuer})),
    tap(({oidcIssuer}) => this.id.login(oidcIssuer)),
  ))

  handleIncomingRedirect$ = createEffect(() => this.actions$.pipe(
    ofType(CoreActions.incomingLoginRedirect),
    mergeMap(({url}) => from(this.id.handleRedirect(url))),
    map(oidcInfo => {
      if (oidcInfo) {
        return CoreActions.oidcInfoReceived({oidcInfo})
      } else {
        throw new Error('oidcInfo undefined')
      }
    })
  ))

  setLoggedIn$ = createEffect(() => this.actions$.pipe(
    ofType(CoreActions.oidcInfoReceived),
    map(({oidcInfo}) => CoreActions.loginStatusChanged({loggedIn: oidcInfo.isLoggedIn}))
  ))

  setWebId$ = createEffect(() => this.actions$.pipe(
    ofType(CoreActions.oidcInfoReceived),
    map(({oidcInfo}) => CoreActions.webIdReceived({webId: oidcInfo.webId!}))
  ))

  checkServerSession$ = createEffect(() => this.actions$.pipe(
    ofType(CoreActions.loginStatusChanged),
    concatLatestFrom(() => this.store.select(selectors.oidcIssuer)),
    mergeMap(([action, oidcIssuer]) => {
      if (action.loggedIn) {
        return of(CoreActions.serverSessionRequested({oidcIssuer}))
      } else {
        return EMPTY;
      }
    }),
  ))

  serverSessionRequested$ = createEffect(() => this.actions$.pipe(
    ofType(CoreActions.serverSessionRequested),
    mergeMap(({oidcIssuer}) => from(this.id.checkServerSession(oidcIssuer))
      .pipe(
        map(result => CoreActions.serverSessionReceived(result))
      )),
  ))

  serverLoginRequested$ = createEffect(() => this.actions$.pipe(
    ofType(CoreActions.serverLoginRequested),
    concatLatestFrom(action => this.store.select(selectors.redirectUrl)),
    tap(([action, redirectUrl]) => this.id.serverLogin(redirectUrl)),
    map(([action, redirectUrl]) => CoreActions.serverLoginInitiated()),
  ))
}
