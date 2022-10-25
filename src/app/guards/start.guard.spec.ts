import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { StartGuard } from './start.guard';

describe('StartGuard', () => {
  let guard: StartGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ provideMockStore({
        initialState: { core: { loginKnown: false } }
      }) ]
    });
    guard = TestBed.inject(StartGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
