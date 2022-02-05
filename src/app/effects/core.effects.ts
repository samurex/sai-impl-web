import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, EMPTY, map, mergeMap, tap} from "rxjs";
import {IdentityService} from "../services/login.service";
import {CoreActions} from "../actions";

@Injectable()
export class CoreEffects {

  constructor(
    private actions$: Actions,
    private id: IdentityService,
  ) {}

  login$ = createEffect(() => this.actions$.pipe(
    ofType(CoreActions.loginRequested),
    tap(({idP}) => this.id.login(idP)),
    map(() => CoreActions.loginInitiated()),
  ))

  getWebId$ = createEffect(() => this.actions$.pipe(
    ofType(CoreActions.requestWebId),
    mergeMap(() => this.id.getWebId().pipe(
      map(webId => CoreActions.webIdReceived({webId})),
      catchError(() => EMPTY),
    )),
  ))
}
