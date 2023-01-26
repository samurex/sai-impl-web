import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as CoreActions from "../../state/actions/core.actions";

@Component({
  selector: 'sai-redirect-handler',
  templateUrl: './redirect-handler.component.html',
  styleUrls: ['./redirect-handler.component.scss']
})
export class RedirectHandlerComponent implements OnInit {

  constructor(
    private router: Router,
    private store: Store,
  ) {}

  async ngOnInit(): Promise<void> {
    this.store.dispatch(CoreActions.incomingLoginRedirect({url: window.location.href}));
    this.router.navigateByUrl('/start')
  }
}
