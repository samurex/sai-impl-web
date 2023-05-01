import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccessNeed, AccessNeedGroup, ShapeTree } from '../../state/models';
import {
  Application,
  Authorization,
  DataAuthorization,
  IRI,
  AccessModes,
  ShareAuthorizationModes,
  ShareAuthorization,
  BaseAuthorization,
  Resource,
  SocialAgent,
} from '@janeirodigital/sai-api-messages';
import { Store } from '@ngrx/store';
import {
  authorizationPageLoaded,
  authorizationRequested,
  shareResource,
} from '../../state/actions/authorization.actions';
import { applicationProfile } from '../../state/selectors/application.selectors';
import { filter, firstValueFrom, map, mergeMap, Observable, take, tap} from 'rxjs';
import {
  selectAccessNeeds,
  selectGroupFromClientId,
  selectNeedsFromClientId,
  selectShapetreesFromClientId,
} from '../../state/selectors/access-needs.selectors';
import { selectResource } from 'src/app/state/selectors/resource.selectors';
import { selectSocialAgents } from 'src/app/state/selectors/social-agent.selectors';
import { concatLatestFrom } from '@ngrx/effects';
import { loadResource, socialAgentsPanelLoaded } from 'src/app/state/actions/application.actions';

// TODO: remove when removing material
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'sai-authorization-page',
  templateUrl: './authorization.page.html',
  styleUrls: ['./authorization.page.css'],
})
export class AuthorizationPage implements OnInit {
  clientId!: IRI;
  resourceId?: IRI;

  application$!: Observable<Application>;
  group$!: Observable<AccessNeedGroup>;
  needs$!: Observable<AccessNeed[]>;
  shapetrees$!: Observable<ShapeTree[]>;

  shareData: ShareAuthorizationModes = {
    accessMode: [],
    children: []
  }
  socialAgents$: Observable<SocialAgent[]> = this.store.select(selectSocialAgents);
  potentialAccessGrantees$?: Observable<SocialAgent[]>;
  existingAccessGrantees$?: Observable<SocialAgent[]>;

  resource$?: Observable<Resource>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.requestAuthorizationData();

    this.application$ = this.store
      .select(applicationProfile(this.clientId))
      .pipe(filter(Boolean));
    this.group$ = this.store
      .select(selectGroupFromClientId(this.clientId))
      .pipe(filter(Boolean));
    this.needs$ = this.store
      .select(selectNeedsFromClientId(this.clientId))
      .pipe(filter(Boolean));
    this.shapetrees$ = this.store
      .select(selectShapetreesFromClientId(this.clientId))
      .pipe(filter(Boolean));

    this.requestShareResourceData();
    if (this.resourceId) {
      this.resource$ = this.store
        .select(selectResource(this.resourceId))
        .pipe(filter(Boolean));

      this.resource$.subscribe((resource) => {
        this.shareData.children = resource!.children.map(child => ({
          shapeTree: child.shapeTree.id,
          accessMode: []
        }))
      })
      
      this.potentialAccessGrantees$ = this.resource$.pipe(
        concatLatestFrom(() => this.socialAgents$),
        map(([resource, socialAgents]) =>
          socialAgents.filter(socialAgent => !resource!.accessGrantedTo.includes(socialAgent.id)))
      )

      this.existingAccessGrantees$ = this.resource$.pipe(
        concatLatestFrom(() => this.socialAgents$),
        map(([resource, socialAgents]) =>
          socialAgents.filter(socialAgent => resource!.accessGrantedTo.includes(socialAgent.id)))
      )

    }
  }

  /**
   * Uses the client_id query parameter to init an authorization flow
   */
  private requestAuthorizationData(): void {
    const applicationId = this.route.snapshot.queryParamMap.get('client_id');
  
    if (!applicationId) {
      this.router
        .navigateByUrl('dashboard')
        .catch(() => console.error('client id not provided'));
      return;
    }

    this.clientId = applicationId;
    this.store.dispatch(authorizationPageLoaded({ applicationId }));
  }

  private requestShareResourceData(): void {
    const resourceId = this.route.snapshot.queryParamMap.get('resource');

    if (resourceId) {
      this.resourceId = decodeURIComponent(resourceId)
      this.store.dispatch(loadResource({ id: this.resourceId }))
      this.store.dispatch(socialAgentsPanelLoaded())
    }
  }

  getScope(accessNeed: AccessNeed): string {
    if (accessNeed.parent) return 'Inherited';
    // TODO based on user input
    return 'All';
  }

  // TODO all the 'authorization creation' process should exist in a sai-library which a service uses
  //      the component just triggers the relevant effects to signal the authorization action
  // TODO use case when there is a `parent` access need
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createDataAuthorizations(
    accessNeed: AccessNeed,
    parent?: AccessNeed
  ): Promise<DataAuthorization[]> {
    // TODO data authorization should be created in a service/in the backend
    const dataAuthorization = {
      accessNeed: accessNeed.id,
      scope: this.getScope(accessNeed),
    } as DataAuthorization;
    let childrenAuthorizations: DataAuthorization[] = [];
    if (accessNeed.children) {
      childrenAuthorizations = await firstValueFrom(
        this.store.select(selectAccessNeeds(accessNeed.children))
      )
        .then((needs) => needs.filter(Boolean) as AccessNeed[])
        .then((needs) =>
          needs.flatMap((need) =>
            this.createDataAuthorizations(need, accessNeed)
          )
        )
        .then((promises) => Promise.all(promises))
        .then((authorizations) => authorizations.flat());
    }

    return [dataAuthorization, ...childrenAuthorizations];
  }

  async authorize(granted = true) {
    // TODO authorization should be created in a service/in the backend
    let authorization: Authorization;

    const base = {
      grantee: this.clientId,
      accessNeedGroup: (await firstValueFrom(this.group$)).id,
    };

    if (granted) {
      authorization = {
        ...base,
        dataAuthorizations: await firstValueFrom(this.needs$)
          .then((needs) =>
            needs.flatMap((need) => this.createDataAuthorizations(need))
          )
          .then((promises) => Promise.all(promises))
          .then((authorizations) => authorizations.flat()),
        granted: true,
      };
    } else {
      authorization = {
        ...base,
        granted: false,
      };
    }
    this.store.dispatch(authorizationRequested({ authorization }));
  }

   share(agentOptions: MatListOption[]) {
    this.resource$?.pipe(
      filter(resource => !!resource),
      take(1)
    ).subscribe(resource => {
      const shareAuthorization: ShareAuthorization = {
        applicationId: this.clientId!,
        resource: resource!.id,
        accessMode: this.shareData.accessMode,
        children: this.shareData.children,
        agents: agentOptions.map(opt => opt.value)
      }
      this.store.dispatch(shareResource({ shareAuthorization }));
      // TODO: show spinner
    });
  }

  accessChanged(value: string) {
    this.shareData.accessMode = this.chooseAccessMode(value)
  }

  childChanged(shapeTree: string, value: string) {
    const child = this.shareData.children.find(c => c.shapeTree === shapeTree)
    if (child) {
      child.accessMode = this.chooseAccessMode(value) 
    } else {
      throw new Error(`shareData missing ${shapeTree}`)
    }
  }

  chooseAccessMode(value: string): string[] {
    switch (value) {
      case 'view':
        return [ AccessModes.Read ]
      case 'edit':
        return [ AccessModes.Read, AccessModes.Update ]
      case 'add':
        return [ AccessModes.Read, AccessModes.Update, AccessModes.Create ]
      default:
        return []
    }
  }
}
