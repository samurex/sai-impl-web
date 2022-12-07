import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ActivatedRoute, Data } from '@angular/router';
import { AccessNeed, AuthorizationData, DataAuthorization, IRI } from '@janeirodigital/sai-api-messages';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { DescActions } from 'src/app/actions/description.actions';
import { selectDescriptions } from 'src/app/selectors/description.selectors'
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DataActions } from 'src/app/actions/application.actions';
import { getRtlScrollAxisType } from '@angular/cdk/platform';

@Component({
  selector: 'sai-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  clientId?: IRI;

  authorizationData$ = this.store.select(selectDescriptions);
  authorizationData?: AuthorizationData

  treeControl = new NestedTreeControl<AccessNeed>(node => node.children);
  dataSource = new MatTreeNestedDataSource<AccessNeed>();

  hasChild = (_: number, node: AccessNeed) => !!node.children && node.children.length > 0;

  loginForm = new UntypedFormGroup({
    label: new UntypedFormControl(''),
    note: new UntypedFormControl(''),
  })

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
    const clientId = this.route.snapshot.queryParamMap.get('client_id')
    if (clientId) {
      this.clientId = clientId
      this.store.dispatch(DescActions.descriptionsNeeded({
        applicationId: clientId
      }))
    } else {
      throw new Error('authorization requires client_id query parameter')
    }
  }

  getScope(accessNeed: AccessNeed): string {
    if (accessNeed.parent) return 'Inherited'
    // TODO based on user input
    return 'All'
  }

  createDataAuthorizations(accessNeed: AccessNeed, parent?: AccessNeed): DataAuthorization[] {
    const dataAuthorization = {
      accessNeed: accessNeed.id,
      scope: this.getScope(accessNeed), // TODO
    } as DataAuthorization
    let children: DataAuthorization[] = []
    if (accessNeed.children) {
      children = accessNeed.children.flatMap(childAccessNeed => this.createDataAuthorizations(childAccessNeed, accessNeed))
    }

    return [ dataAuthorization, ...children]
  }

  onSubmit() {
    if (this.authorizationData) {
      const dataAuthorizations: DataAuthorization[] = []

      this.store.dispatch(DataActions.authorizeApplication({
        authorization: {
          grantee: this.authorizationData.id,
          accessNeedGroup: this.authorizationData.accessNeedGroup.id,
          dataAuthorizations: this.authorizationData.accessNeedGroup.needs.flatMap(accessNeed => this.createDataAuthorizations(accessNeed))
        }
      }));
      // TODO: show spinner
    }
  }

}
