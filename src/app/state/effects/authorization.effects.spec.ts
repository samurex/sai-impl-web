import {provideMockActions} from "@ngrx/effects/testing";
import {Observable, of} from "rxjs";
import {TestBed} from "@angular/core/testing";
import {AuthorizationEffects} from "./authorization.effects";
import {Action} from "@ngrx/store";
import {provideMockStore} from "@ngrx/store/testing";
import {DataService} from "../../services/data.service";
import {authorizationPageLoaded, authorizationReceived, authorizationRequested} from "../actions/authorization.actions";
import {
  unregisteredApplicationProfileError,
  unregisteredApplicationProfileReceived
} from "../actions/application.actions";
import {descriptionsNeeded} from "../actions/description.actions";
import {AccessAuthorization, Authorization, BaseAuthorization} from "@janeirodigital/sai-api-messages";

const initialState = {}
const dataSpy = jasmine.createSpyObj('data service', [
  'getUnregisteredApplicationProfile',
  'authorizeApplication',
])

const applicationId = 'https://app.id'

describe('Authorization Effects', () => {
  let actions$: Observable<Action>;
  let effects: AuthorizationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthorizationEffects,
        provideMockStore({initialState}),
        {provide: DataService, useValue: dataSpy},
        provideMockActions(() => actions$),
      ],
    })

    effects = TestBed.inject(AuthorizationEffects);
  })

  describe('requestUnregisteredApplicationProfile', () => {
    describe('if service correct response', () => {

      beforeEach(() => {
        actions$ = of(authorizationPageLoaded({applicationId}));
        dataSpy.getUnregisteredApplicationProfile.and.returnValue(of({id: applicationId}))
      })

      it('calls the service with the right application id', done => {

        effects.requestUnregisteredApplicationProfile$.subscribe(() => {
          expect(dataSpy.getUnregisteredApplicationProfile).toHaveBeenCalledWith(applicationId);
          done()
        })
      })

      it('returns a "unregistered profile received" action', done => {
        effects.requestUnregisteredApplicationProfile$.subscribe(action => {
          expect(action.type).toEqual(unregisteredApplicationProfileReceived({profile:{}}).type)
          done()
        })
      })

      it('returns the profile in the actions payload', done => {
        effects.requestUnregisteredApplicationProfile$.subscribe(action => {
          // @ts-ignore
          expect(action.profile).toEqual({id: applicationId});
          done();
        })
      })
    })

    describe('if service throws', () => {
      beforeEach(() => {
        actions$ = of(authorizationPageLoaded({applicationId}));
        dataSpy.getUnregisteredApplicationProfile.and.throwError('Error');
      })

      it('returns an error action if the service throws', done => {
        effects.requestUnregisteredApplicationProfile$.subscribe(action => {
          expect(action.type).toEqual(unregisteredApplicationProfileError().type)
          done();
        })
      })
    })
  })

  describe('requestUnregisteredApplicationNeeds', () => {

    beforeEach(() => {
      actions$ = of(authorizationPageLoaded({applicationId}));
    })

    it('triggers a "descriptions needed" action with the right id', (done) => {
      effects.requestUnregisteredApplicationNeeds$.subscribe(action => {
        expect(action.type).toEqual(descriptionsNeeded({applicationId}).type)
        done()
      })
    })
  })

  describe('requestAuthorization', () => {
    beforeEach(() => {
      const authorization: Authorization = {grantee: 'https://app.id', granted: false, accessNeedGroup: {} as any};
      actions$ = of(authorizationRequested({authorization}))
    })


    it('returns the right action after running', (done) => {
      dataSpy.authorizeApplication.and.returnValue(of({id: 'sai:auth'} as AccessAuthorization));


      effects.requestAuthorization$.subscribe(action => {
        expect(action.type).toEqual(authorizationReceived.type);
        done()
      })
    })
  })

  // TODO
  xit('redirect to callback', async() => {
    effects.redirectToCallbackEndpoint.subscribe().unsubscribe();
  });
})
