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

  login$ = createEffect(() => { return this.actions$.pipe(
    ofType(CoreActions.loginRequested),
    map(({oidcIssuer}) => CoreActions.loginInitiated({oidcIssuer})),
    tap(({oidcIssuer}) => this.id.login(oidcIssuer)),
  ) })

  handleIncomingRedirect$ = createEffect(() => { return this.actions$.pipe(
    ofType(CoreActions.incomingLoginRedirect),
    mergeMap(({url}) => from(this.id.handleRedirect(url))),
    map(oidcInfo => {
      if (oidcInfo) {
        return CoreActions.oidcInfoReceived({oidcInfo})
      } else {
        throw new Error('oidcInfo undefined')
      }
    })
  ) })

  setLoggedIn$ = createEffect(() => { return this.actions$.pipe(
    ofType(CoreActions.oidcInfoReceived),
    map(({oidcInfo}) => CoreActions.loginStatusChanged({loggedIn: oidcInfo.isLoggedIn}))
  ) })

  setWebId$ = createEffect(() => { return this.actions$.pipe(
    ofType(CoreActions.oidcInfoReceived),
    // TODO handle invalid webid
    map(({oidcInfo}) => CoreActions.webIdReceived({webId: oidcInfo.webId || ''}))
  ) })

  checkServerSession$ = createEffect(() => { return this.actions$.pipe(
    ofType(CoreActions.loginStatusChanged),
    concatLatestFrom(() => this.store.select(selectors.selectIssuer)),
    mergeMap(([action, oidcIssuer]) => {
      if (action.loggedIn) {
        return of(CoreActions.serverSessionRequested({oidcIssuer}))
      } else {
        return EMPTY;
      }
    }),
  ) })

  serverSessionRequested$ = createEffect(() => { return this.actions$.pipe(
    ofType(CoreActions.serverSessionRequested),
    mergeMap(({oidcIssuer}) => from(this.id.checkServerSession(oidcIssuer))
      .pipe(
        map(result => CoreActions.serverSessionReceived(result))
      )),
  ) })

  serverLoginRequested$ = createEffect(() => { return this.actions$.pipe(
    ofType(CoreActions.serverLoginRequested),
    concatLatestFrom(() => this.store.select(selectors.selectRedirectUrl)),
    tap(([, redirectUrl]) => this.id.serverLogin(redirectUrl)),
    map(() => CoreActions.serverLoginInitiated()),
  ) })
}
