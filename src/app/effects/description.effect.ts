import {Injectable} from "@angular/core";
import {DataService} from "../services/data.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import { DescActions } from "../actions/description.actions";
import {catchError, EMPTY, map, mergeMap} from "rxjs";

@Injectable()
export class DescriptionEffects {
  constructor(
    private actions$: Actions,
    private data: DataService,
  ) {}

  loadApplicationDescriptions$ = createEffect(() => this.actions$.pipe(
    ofType(DescActions.descriptionsNeeded),
    mergeMap(props => this.data.getDescription(props.applicationId, props.lang).pipe(
      map(descriptions => DescActions.descriptionsReceived({descriptions})),
      catchError(() => EMPTY),
    )),
  ))
}
