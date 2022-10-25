import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthInterceptor,
      provideMockStore({}),
    ]
  }));

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
