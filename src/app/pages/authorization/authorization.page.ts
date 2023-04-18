import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccessNeed, AccessNeedGroup, ShapeTree } from '../../state/models';
import {
  Application,
  Authorization,
  DataAuthorization,
  IRI,
} from '@janeirodigital/sai-api-messages';
import { Store } from '@ngrx/store';
import {
  authorizationPageLoaded,
  authorizationRequested,
} from '../../state/actions/authorization.actions';
import { applicationProfile } from '../../state/selectors/application.selectors';
import { filter, firstValueFrom, Observable } from 'rxjs';
import {
  selectAccessNeeds,
  selectGroupFromClientId,
  selectNeedsFromClientId,
  selectShapetreesFromClientId,
} from '../../state/selectors/access-needs.selectors';

@Component({
  selector: 'sai-authorization-page',
  templateUrl: './authorization.page.html',
  styleUrls: ['./authorization.page.css'],
})
export class AuthorizationPage implements OnInit {
  clientId!: IRI;

  application$!: Observable<Application>;
  group$!: Observable<AccessNeedGroup>;
  needs$!: Observable<AccessNeed[]>;
  shapetrees$!: Observable<ShapeTree[]>;

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
}
