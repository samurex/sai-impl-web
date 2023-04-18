import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataService } from '../../services/data.service';
import {
  authorizationPageLoaded,
  authorizationReceived,
  authorizationRequested,
} from '../actions/authorization.actions';
import { catchError, mergeMap } from 'rxjs/operators';
import { from, map, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  unregisteredApplicationProfileError,
  unregisteredApplicationProfileReceived,
} from '../actions/application.actions';
import { descriptionsNeeded } from '../actions/description.actions';

@Injectable()
export class AuthorizationEffects {
  constructor(private actions$: Actions, private data: DataService) {}

  requestUnregisteredApplicationProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authorizationPageLoaded),
      mergeMap((action) =>
        from(
          this.data.getUnregisteredApplicationProfile(action.applicationId)
        ).pipe(
          map((profile) => unregisteredApplicationProfileReceived({ profile }))
        )
      ),
      catchError(() => of(unregisteredApplicationProfileError()))
    );
  });

  requestUnregisteredApplicationNeeds$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authorizationPageLoaded),
      map((action) =>
        descriptionsNeeded({ applicationId: action.applicationId })
      )
    );
  });

  requestAuthorization$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authorizationRequested),
      mergeMap(({ authorization }) =>
        this.data.authorizeApplication(authorization)
      ),
      map((accessAuthorization) =>
        authorizationReceived({ accessAuthorization })
      )
    );
  });

  /* Once an authorization is received then redirect to the application */
  redirectToCallbackEndpoint = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authorizationReceived),
        tap(({ accessAuthorization }) => {
          if (accessAuthorization.callbackEndpoint) {
            window.location.href = accessAuthorization.callbackEndpoint;
          }
        })
      );
    },
    { dispatch: false }
  );
}
