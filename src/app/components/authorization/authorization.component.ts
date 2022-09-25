import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Store} from "@ngrx/store";
import { DescActions } from 'src/app/actions/description.actions';
import { selectDescriptions } from 'src/app/selectors/description.selectors'

@Component({
  selector: 'sai-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  descriptions$ = this.store.select(selectDescriptions)

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    ) { }

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
