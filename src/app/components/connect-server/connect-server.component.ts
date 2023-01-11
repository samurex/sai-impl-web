import {Component} from '@angular/core';
import {Store} from '@ngrx/store'
import {CoreActions} from 'src/app/state/actions';

@Component({
  selector: 'sai-connect-server',
  templateUrl: './connect-server.component.html',
  styleUrls: ['./connect-server.component.scss']
})
export class ConnectServerComponent {

  constructor(
    private store: Store,
  ) {}

  loginServer() {
    this.store.dispatch(CoreActions.serverLoginRequested())
  }
}
