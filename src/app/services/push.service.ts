import { Injectable } from '@angular/core';
import { ENV } from 'src/environments/environment';
import { SolidClient } from '../utils/solid-client';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(
    private solidClient: SolidClient,
  ) {}

  async subscribe(subscription: PushSubscription) {
    const options = {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    await this.solidClient.fetch(`${ENV.SRV_BASE}/push-subscribe`, options)
  }
}
