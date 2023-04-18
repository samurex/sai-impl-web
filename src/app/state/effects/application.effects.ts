import {map, mergeMap, switchMap} from "rxjs";
import {Injectable} from "@angular/core";
import {Actions, concatLatestFrom, createEffect, ofType} from "@ngrx/effects";
import * as DataActions from "../actions/application.actions";
import * as DescActions from "../actions/description.actions";
import * as NeedActions from "../actions/access-needs.actions"
import {DataService} from "../../services/data.service";
import {Store} from "@ngrx/store";
import * as selectors from "../selectors";
import {
  AccessNeed as ApiAccessNeed,
  AccessNeedGroup as ApiGroup,
  AuthorizationData
} from "@janeirodigital/sai-api-messages";
import {AccessNeed, AccessNeedGroup, ShapeTree} from "../models";

// TODO contains effects for non-application, move to their own files/classes

@Injectable()
export class ApplicationProfileEffects {
  constructor(
    private actions$: Actions,
    private data: DataService,
    private store: Store
  ) {}

  loadApplicationProfiles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DataActions.applicationsPanelLoaded),
      mergeMap(() => this.data.getApplicationProfiles()),
      map((profiles) => DataActions.applicationProfilesReceived({ profiles }))
    );
  });

  loadSocialAgentsProfiles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DataActions.socialAgentsPanelLoaded),
      mergeMap(() => this.data.getSocialAgentProfiles()),
      map((profiles) => DataActions.socialAgentProfilesReceived({ profiles }))
    );
  });

  addSocialAgent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DataActions.addSocialAgent),
      mergeMap(({ webId, label, note }) =>
        this.data.addSocialAgent(webId, label, note)
      ),
      map((profile) => DataActions.socialAgentProfileReceived({ profile }))
    );
  });

  loadDataRegistries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DataActions.dataRegistriesNeeded),
      concatLatestFrom(() => this.store.select(selectors.selectPrefLanguage)),
      mergeMap(([, lang]) => this.data.getDataRegistries(lang)),
      map((registries) => DataActions.dataRegistriesProvided({ registries }))
    );
  });

  /**
   * 'Descriptions' are the set of data needed to describe to a user the needs and capabilities of an application
   * using the descriptor provided by the application and the associated shapetrees. This effect takes all this data (as a `AuthorizationData`)
   * and breaks it down into smaller parts (groups, needs and shapetrees) that can then be individually addressed from the store
   * TODO best practice: do not return more than one action per effect. If it is needed, then it is better to create
   *      multiple effects that each react to the same input but dispatch a different action
   */
  loadDescriptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DescActions.descriptionsNeeded),
      concatLatestFrom(() => this.store.select(selectors.selectPrefLanguage)),
      mergeMap(([props, lang]) =>
        this.data.getDescriptions(props.applicationId, lang)
      ),
      switchMap((authorizationData) => [
        ...mapAuthorizationDataToNeedsActions(authorizationData).flat(),
      ])
    );
  });
}

const mapAuthorizationDataToNeedsActions = (data: AuthorizationData) => {
  const needs = data.accessNeedGroup.needs;

  const shapeTrees = needs.map(need => flatShapeTrees(need)).flat();
  const accessNeeds = needs.map(need => flatAccessNeed(need)).flat();

  const shapeTreeActions = shapeTrees.map(tree => NeedActions.addShapeTree({tree}));
  const needsActions = accessNeeds.map(need => NeedActions.addAccessNeed({need}));

  const group = flatAccessNeedGroup(data.accessNeedGroup);
  const groupAction = NeedActions.addAccessNeedGroup({group});
  return [shapeTreeActions, needsActions, groupAction];
}


/* This set of functions take the nested Authorization Data from the api and flatten the needs, shapetrees and group
 * that then can be used to insert into the store as independent entities
 */
const flatAccessNeedGroup = (apiGroup: ApiGroup): AccessNeedGroup => {
  return {...apiGroup, needs: apiGroup.needs.map(need => need.id)};
}

const flatAccessNeed = (apiAccess: ApiAccessNeed): AccessNeed[] => {
  const children = apiAccess.children;

  if (!children || children.length === 0)
    return [{...apiAccess, shapeTree: apiAccess.shapeTree.id, children: apiAccess.children?.map(c => c.id) || []}];

  else {
    // collect and recurse
    const newAccess: AccessNeed = {...apiAccess, shapeTree: apiAccess.shapeTree.id, children: apiAccess.children?.map(c => c.id) || []};
    const convertedChildren = children.map(c => flatAccessNeed(c)).flat();

    return [newAccess, ...convertedChildren];
  }
}

const flatShapeTrees = (apiAccess: ApiAccessNeed): ShapeTree[] => {
  const children = apiAccess.children;

  if (!children || children.length === 0)
    return [{id: apiAccess.shapeTree.id, label: apiAccess.shapeTree.label}]

  else {
    const thisShapeTree = {id: apiAccess.shapeTree.id, label: apiAccess.shapeTree.label};
    const childrenShapeTrees = children.map(c => flatShapeTrees(c)).flat();

    return [thisShapeTree, ...childrenShapeTrees];
  }
}
