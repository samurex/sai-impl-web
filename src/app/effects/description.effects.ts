import {catchError, EMPTY, map, mergeMap} from "rxjs";
import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import { DescActions } from "../actions/description.actions";
import {DataService} from "../services/data.service";

@Injectable()
export class DescriptionEffects {
  constructor(
    private actions$: Actions,
    private data: DataService,
  ) {}

  loadApplicationProfiles$ = createEffect(() => this.actions$.pipe(
    ofType(DescActions.descriptionsNeeded),
    mergeMap(props => this.data.getDescriptions(props.applicationId, props.lang)),
    map(descriptions => DescActions.descriptionsReceived({descriptions})),
  ))
}
