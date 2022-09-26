import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { AccessNeed } from '@janeirodigital/sai-api-messages';
import {Store} from "@ngrx/store";
import { DescActions } from 'src/app/actions/description.actions';
import { selectDescriptions } from 'src/app/selectors/description.selectors'

@Component({
  selector: 'sai-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  accessNeedGruop$ = this.store.select(selectDescriptions);

  treeControl = new NestedTreeControl<AccessNeed>(node => node.children);
  dataSource = new MatTreeNestedDataSource<AccessNeed>();

  hasChild = (_: number, node: AccessNeed) => !!node.children && node.children.length > 0;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    ) {
      // this.dataSource.data = [];
      this.accessNeedGruop$.subscribe(data => {
        if (data) {
          this.dataSource.data = data.needs;
        }
      });
    }

  ngOnInit(): void {
    const clientId = this.route.snapshot.queryParamMap.get('client_id')
    if (clientId) {
      this.store.dispatch(DescActions.descriptionsNeeded({
        applicationId: clientId
      }))
    } else {
      throw new Error('authorization requires client_id query parameter')
    }
  }

}
