import {ENV} from 'src/environments/environment';
import {SolidClient} from '../utils/solid-client';

import {PushService} from './push.service';

let pushService: PushService;
let solidClientSpy: jasmine.SpyObj<SolidClient>;

beforeEach(() => {
  solidClientSpy = jasmine.createSpyObj('SolidClient', ['fetch']);

  pushService = new PushService(solidClientSpy);
});


describe('subscribe', () => {
  const url = `${ENV.SRV_BASE}/push-subscribe`;
  it('solid client is correctly used', async () => {
    const subscription = { endpoint: 'some-endpoint'} as unknown as PushSubscription;
    const options = {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    await pushService.subscribe(subscription);
    expect(solidClientSpy.fetch).toHaveBeenCalledWith(url , options);
  })
});
