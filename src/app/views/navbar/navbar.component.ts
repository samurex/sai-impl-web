import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Store } from '@ngrx/store';
import { CoreActions } from 'src/app/actions';
import {ENV} from "../../../environments/environment";
import {SolidClient} from "../../utils/solid-client";

@Component({
  selector: 'sai-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() idP!: string;
  @Input() isServerLoggedIn!: boolean;
  @Input() webId!: string | null;

  constructor(
    private solidClient: SolidClient,
    private store: Store,
  ) { }

  ngOnInit(): void {}

  loginServer() {
    this.store.dispatch(CoreActions.serverLoginRequested())
  }
}
