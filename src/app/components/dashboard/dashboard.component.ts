import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectApplicationProfiles} from "../../selectors/application.selectors";
import {BehaviorSubject, Observable} from "rxjs";
import {serverLoggedInStatus} from "../../selectors";
import {SolidClient} from "../../utils/solid-client";
import {CoreActions} from "../../actions";
import {ENV} from "../../../environments/environment";
import { SwPush } from '@angular/service-worker';
import { PushService } from 'src/app/services/push.service';

@Component({
  selector: 'sai-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  applications = this.store.select(selectApplicationProfiles);
  isServerLoggedIn$ = this.store.select(serverLoggedInStatus);

  public latestMessage: Observable<unknown> = new BehaviorSubject<unknown>(JSON.stringify({}));
  public subscription$ = this.swPush.subscription;

  constructor(
    private store: Store,
    private swPush: SwPush,
    private push: PushService,
  ) {
  }

  async subscribeToNotifications() {

    const subscription = await this.swPush.requestSubscription({
      serverPublicKey: ENV.VAPID_PUBLIC_KEY
    });
    await this.push.subscribe(subscription)
  }

  ngOnInit(): void {}
}
