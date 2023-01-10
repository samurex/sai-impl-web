import {TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard.service';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {CORE_STATE_KEY} from "../state/reducers/core.reducer";
import {RouterTestingModule} from "@angular/router/testing";
import {Observable} from "rxjs";

function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
  } as RouterStateSnapshot;
}

describe('Auth Guard', () => {
  let guard: AuthGuard;
  let store: MockStore;
  let router: Router;
  const dummyRoute = {} as ActivatedRouteSnapshot;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [provideMockStore()],
    });
    guard = TestBed.inject(AuthGuard);
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('when the user is logged in', () => {
    beforeEach(() => {
      store.setState({[CORE_STATE_KEY]: { isLoggedIn: true, isServerLoggedIn: true}});
    })

    it('should grant access to any route', (done) => {
      const canActivateChild = guard.canActivateChild(dummyRoute, fakeRouterState('/fakeUrl')) as Observable<boolean>;
      canActivateChild.subscribe(r => {
        expect(r).toBeTrue();
        done();
      })
    })
  })

  describe('when the user is logged out', () => {
    beforeEach(() => {
      store.setState({[CORE_STATE_KEY]: { isLoggedIn: false }});
    })

    it('should deny access to any route', (done) => {
      const spy = spyOn(router, 'parseUrl');
      const canActivateChild = guard.canActivateChild(dummyRoute, fakeRouterState('/fakeUrl')) as Observable<UrlTree>;
      canActivateChild.subscribe(r => {
        expect(spy).toHaveBeenCalledWith('start');
        done();
      })
    })
  })
});
