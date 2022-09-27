import {catchError, EMPTY, map, mergeMap} from "rxjs";
import {Injectable} from "@angular/core";
import {Actions, concatLatestFrom, createEffect, ofType} from "@ngrx/effects";
import { DescActions } from "../actions/description.actions";
import {DataService} from "../services/data.service";
import { Store } from "@ngrx/store";
import * as selectors from "../selectors";

@Injectable()
export class DescriptionEffects {
  constructor(
    private actions$: Actions,
    private data: DataService,
    private store: Store,
  ) {}

  loadApplicationProfiles$ = createEffect(() => this.actions$.pipe(
    ofType(DescActions.descriptionsNeeded),
    concatLatestFrom(() => this.store.select(selectors.prefLanguage)),
    mergeMap(([props, lang]) => this.data.getDescriptions(props.applicationId, lang)),
    map(authorizationData => DescActions.descriptionsReceived({authorizationData})),
  ))
}
