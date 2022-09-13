import {map, mergeMap} from "rxjs";
import { Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {DataActions} from "../actions/application.actions";
import {DataService} from "../services/data.service";


@Injectable()
export class ApplicationProfileEffects {
  constructor(
    private actions$: Actions,
    private data: DataService,
  ) {}

  loadApplicationProfiles$ = createEffect(() => this.actions$.pipe(
    ofType(DataActions.applicationsPanelLoaded),
    mergeMap(() => this.data.getApplicationProfiles()),
    map(profiles => DataActions.applicationProfilesReceived({profiles})),
  ))

  loadSocialAgentsProfiles$ = createEffect(() => this.actions$.pipe(
    ofType(DataActions.socialAgentsPanelLoaded),
    mergeMap(() => this.data.getSocialAgentProfiles()),
    map(profiles => DataActions.socialAgentProfilesReceived({profiles})),
  ))
}
