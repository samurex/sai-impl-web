import {map, mergeMap, tap} from "rxjs";
import { Injectable} from "@angular/core";
import {Actions, concatLatestFrom, createEffect, ofType} from "@ngrx/effects";
import {DataActions} from "../actions/application.actions";
import {DescActions} from "../actions/description.actions";
import {DataService} from "../services/data.service";
import { Store } from "@ngrx/store";
import * as selectors from "../selectors";


@Injectable()
export class ApplicationProfileEffects {
  constructor(
    private actions$: Actions,
    private data: DataService,
    private store: Store,
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

  addSocialAgent$ = createEffect(() => this.actions$.pipe(
    ofType(DataActions.addSocialAgent),
    mergeMap(({ webId, label, note }) => this.data.addSocialAgent(webId, label, note)),
    map(profile => DataActions.socialAgentProfileReceived({profile})),
  ))

  loadDataRegistries$ = createEffect(() => this.actions$.pipe(
    ofType(DataActions.dataRegistriesNeeded),
    concatLatestFrom(() => this.store.select(selectors.prefLanguage)),
    mergeMap(([props, lang]) => this.data.getDataRegistries(lang)),
    map(registries => DataActions.dataRegistriesProvided({registries})),
  ))

  loadDescriptions$ = createEffect(() => this.actions$.pipe(
    ofType(DescActions.descriptionsNeeded),
    concatLatestFrom(() => this.store.select(selectors.prefLanguage)),
    mergeMap(([props, lang]) => this.data.getDescriptions(props.applicationId, lang)),
    map(authorizationData => DescActions.descriptionsReceived({authorizationData})),
  ))

  authorizeApplication$ = createEffect(() => this.actions$.pipe(
    ofType(DataActions.authorizeApplication),
    mergeMap(({ authorization }) => this.data.authorizeApplication(authorization)),
    map(accessAuthorization => DataActions.authorizationReceived({ accessAuthorization })),
  ))

  redirectToCallbackEndpoint =  createEffect(() => this.actions$.pipe(
    ofType(DataActions.authorizationReceived),
    tap(({accessAuthorization}) => window.location.href = accessAuthorization.callbackEndpoint!)
  ), {dispatch: false});
}
