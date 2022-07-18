import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, EMPTY, map, tap} from "rxjs";
import {LoginService} from "../services/login.service";
import {CoreActions} from "../actions";
import {mergeMap} from "rxjs/operators";

@Injectable()
export class CoreEffects {

  constructor(
    private actions$: Actions,
    private id: LoginService,
  ) {}

  login$ = createEffect(() => this.actions$.pipe(
    ofType(CoreActions.loginRequested),
    map(({idP}) => CoreActions.loginInitiated({idP})),
    tap(({idP}) => this.id.login(idP)),
  ))

  receiveLogin$ = createEffect(() => this.actions$.pipe(
    ofType(CoreActions.webIdReceived),
    map(({webId}) => CoreActions.loginStatusChanged({loggedIn: Boolean(webId)})),
  ))

  serverSessionRequested$ = createEffect(() => this.actions$.pipe(
    ofType(CoreActions.serverSessionRequested),
    mergeMap(() => this.id.checkServerSession$()
      .pipe(
        map(loggedIn => CoreActions.serverSessionReceived({loggedIn})),
        catchError(() => EMPTY),
      )),
  ))
}
