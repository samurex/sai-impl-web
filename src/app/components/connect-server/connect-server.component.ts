import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'
import { CoreActions } from 'src/app/actions';

@Component({
  selector: 'sai-connect-server',
  templateUrl: './connect-server.component.html',
  styleUrls: ['./connect-server.component.scss']
})
export class ConnectServerComponent implements OnInit {

  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {
  }

  loginServer() {
    this.store.dispatch(CoreActions.serverLoginRequested())
  }
}
