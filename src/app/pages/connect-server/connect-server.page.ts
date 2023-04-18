import {Component} from '@angular/core';
import {Store} from '@ngrx/store'
import * as CoreActions from 'src/app/state/actions/core.actions';

@Component({
  selector: 'sai-connect-server',
  templateUrl: './connect-server.page.html',
  styleUrls: ['./connect-server.page.css']
})
export class ConnectServerPage {

  constructor(
    private store: Store,
  ) {}

  loginServer() {
    this.store.dispatch(CoreActions.serverLoginRequested())
  }
}
