import {NestedTreeControl} from '@angular/cdk/tree';
import {Component, OnInit} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {ActivatedRoute, Router} from '@angular/router';
import {AccessNeed, Authorization, AuthorizationData, DataAuthorization, IRI} from '@janeirodigital/sai-api-messages';
import {Store} from "@ngrx/store";
import * as DescActions from 'src/app/state/actions/description.actions';
import * as DataActions from 'src/app/state/actions/application.actions';
import {selectDescriptions} from 'src/app/state/selectors/description.selectors'
import { BaseAuthorization, Resource, ShareAuthorization } from '@janeirodigital/sai-api-messages';
import { filter, map, mergeMap, Observable, take, tap, withLatestFrom } from 'rxjs';
import { selectResource } from 'src/app/state/selectors/resource.selectors';
import { SocialAgent } from '@janeirodigital/sai-api-messages';
import { selectSocialAgents } from 'src/app/state/selectors/social-agent.selectors';
import { MatListOption } from '@angular/material/list';
import { concatLatestFrom } from '@ngrx/effects';

@Component({
  selector: 'sai-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
  clientId?: IRI;
  clientIdInput = '';

  socialAgents$: Observable<SocialAgent[]> = this.store.select(selectSocialAgents);
  potentialAccessGrantees$?: Observable<SocialAgent[]>;
  existingAccessGrantees$?: Observable<SocialAgent[]>;

  resource$?: Observable<Resource | undefined>;

  // TODO: consider using factory selectors selectDescriptions(clientId)
  authorizationData$ = this.store.select(selectDescriptions);
  authorizationData?: AuthorizationData

  treeControl = new NestedTreeControl<AccessNeed>(node => node.children);
  dataSource = new MatTreeNestedDataSource<AccessNeed>();

  hasChild = (_: number, node: AccessNeed) => !!node.children && node.children.length > 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    ) {
      this.authorizationData$.subscribe(data => {
        if (data) {
          this.authorizationData = data
          this.dataSource.data = data.accessNeedGroup.needs;
        }
      });
    }

  ngOnInit(): void {
    // TODO: use observables for query params handling
    const params = this.route.snapshot.queryParams;
    this.clientId = params['client_id'];

    if (params['resource']) {
      this.resource$ = this.route.queryParams.pipe(
        map(params => decodeURIComponent(params['resource'])),
        tap(id => this.store.dispatch(DataActions.loadResource({ id }))),
        tap(() => this.store.dispatch(DataActions.socialAgentsPanelLoaded())),
        mergeMap(id =>  this.store.select(selectResource( id ))),
      );

      this.potentialAccessGrantees$ = this.resource$.pipe(
        filter(resource => !!resource),
        concatLatestFrom(() => this.socialAgents$),
        map(([resource, socialAgents]) =>
          socialAgents.filter(socialAgent => !resource!.accessGrantedTo.includes(socialAgent.id)))
      )

      this.existingAccessGrantees$ = this.resource$.pipe(
        filter(resource => !!resource),
        concatLatestFrom(() => this.socialAgents$),
        map(([resource, socialAgents]) =>
          socialAgents.filter(socialAgent => resource!.accessGrantedTo.includes(socialAgent.id)))
      )
    }

    this.store.dispatch(DescActions.descriptionsNeeded({
      applicationId: this.clientId!
    }));

  }

  getScope(accessNeed: AccessNeed): string {
    if (accessNeed.parent) return 'Inherited'
    // TODO based on user input
    return 'All'
  }

  // TODO use case when there is a `parent` access need
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createDataAuthorizations(accessNeed: AccessNeed, parent?: AccessNeed): DataAuthorization[] {
    const dataAuthorization = {
      accessNeed: accessNeed.id,
      scope: this.getScope(accessNeed),
    } as DataAuthorization
    let children: DataAuthorization[] = []
    if (accessNeed.children) {
      children = accessNeed.children.flatMap(childAccessNeed => this.createDataAuthorizations(childAccessNeed, accessNeed))
    }

    return [ dataAuthorization, ...children]
  }

  authorize(granted = true) {
    if (this.authorizationData) {
      let authorization: Authorization
      const baseAuthorization = {
        grantee: this.authorizationData.id,
        accessNeedGroup: this.authorizationData.accessNeedGroup.id,
      } as BaseAuthorization;
      if (granted) {
        authorization =  {
          ...baseAuthorization,
          dataAuthorizations: this.authorizationData.accessNeedGroup.needs.flatMap(accessNeed => this.createDataAuthorizations(accessNeed)),
          granted: true,
        }
      } else {
        authorization =  {
          ...baseAuthorization,
          granted: false,
        }
      }
      this.store.dispatch(DataActions.authorizeApplication({ authorization }));
      // TODO: show spinner
    }
  }

  // TODO: access modes
  share(agentOptions: MatListOption[], resourceOptions: MatListOption[]) {
    this.resource$?.pipe(
      filter(resource => !!resource),
      take(1)
    ).subscribe(resource => {
      const shareAuthorization: ShareAuthorization = {
        resource: resource!.id,
        applicationId: this.clientId!,
        agents: agentOptions.map(opt => opt.value),
        children: resourceOptions.map(opt => opt.value)
      }
      this.store.dispatch(DataActions.shareResource({ shareAuthorization }));
      // TODO: show spinner
    });
  }
}
