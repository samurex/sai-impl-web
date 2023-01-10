import {Observable, of} from 'rxjs';
import {provideMockActions} from '@ngrx/effects/testing';
import {TestBed} from '@angular/core/testing';
import {Action} from '@ngrx/store';
import {ApplicationProfileEffects} from './application.effects';
import {DataService} from '../../services/data.service';
import {
  AccessAuthorization,
  AccessNeed,
  Application,
  Authorization,
  AuthorizationData,
  DataRegistry,
  SocialAgent
} from '@janeirodigital/sai-api-messages';
import {provideMockStore} from '@ngrx/store/testing';
import {prefLanguage} from '../selectors';

let actions$ = new Observable<Action>();
let dataServiceSpy: jasmine.SpyObj<DataService>;
let effects: ApplicationProfileEffects

const spy = jasmine.createSpyObj('DataService', ['getApplicationProfiles', 'getSocialAgentProfiles', 'addSocialAgent', 'getDataRegistries', 'authorizeApplication', 'getDescriptions']);

const defaultLang = 'en'

describe('ApplicationProfileEffects', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApplicationProfileEffects,
        provideMockStore({
          selectors: [
            {
              selector: prefLanguage,
              value: defaultLang
            }
          ]
        }),
        provideMockActions(() => actions$),
        { provide: DataService, useValue: spy },
      ],
    });

    dataServiceSpy = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;

    effects = TestBed.inject<ApplicationProfileEffects>(
      ApplicationProfileEffects
    );
  })


  it('loadApplicationProfiles', (done: any) => {
    actions$ = of({
      type: '[APPLICATION PROFILES] Application Profiles Requested',
    });

    const expectedProfiles = [
      { id: 'https://projectron.example' } as Application,
    ];

    dataServiceSpy.getApplicationProfiles.and.resolveTo(expectedProfiles);

    effects.loadApplicationProfiles$.subscribe((action) => {
      expect(action).toEqual({
        type: '[APPLICATION PROFILES] Application Profiles Received',
        profiles: expectedProfiles,
      });
      done();
    });
  });

  it('loadSocialAgentsProfiles', (done: any) => {
    actions$ = of({
      type: '[SOCIAL AGENT PROFILES] Social Agent Profiles Requested',
    });

    const expectedProfiles = [
      { id: 'https://bob.example' } as SocialAgent,
    ];

    dataServiceSpy.getSocialAgentProfiles.and.resolveTo(expectedProfiles);

    effects.loadSocialAgentsProfiles$.subscribe((action) => {
      expect(action).toEqual({
        type: '[SOCIAL AGENT PROFILES] Social Agent Profiles Received',
        profiles: expectedProfiles,
      });
      done();
    });
  });

  it('addSocialAgent', (done: any) => {
    const webId = 'https://jane.example'
    const label = 'Jana'
    const note = 'A truck driver'

    actions$ = of({
      type: '[SOCIAL AGENT PROFILES] Add Social Agent',
      webId, label, note
    });

    const expectedProfile = { id: 'https://jane.example' } as SocialAgent

    // TODO params
    dataServiceSpy.addSocialAgent.and.resolveTo(expectedProfile);

    // TODO expect spy params
    effects.addSocialAgent$.subscribe((action) => {
      expect(action).toEqual({
        type: '[SOCIAL AGENT PROFILES] Single Social Agent Profile Received',
        profile: expectedProfile,
      });
      expect(dataServiceSpy.addSocialAgent).toHaveBeenCalledOnceWith(webId, label, note)
      done();
    });
  });

  it('loadDataRegistries', (done: any) => {
    const lang = 'en'
    actions$ = of({
      type: '[DATA REGISTRIES] Data Registries Requested',
      lang
    });

    const expectedDataRegistries = [{ id: 'https://data.bob.example/reg-1' }, { id: 'https://data.bob.example/reg-2' }] as DataRegistry[]

    dataServiceSpy.getDataRegistries.and.resolveTo(expectedDataRegistries);

    effects.loadDataRegistries$.subscribe((action) => {
      expect(action).toEqual({
        type: '[DATA REGISTRIES] Data Registries Received',
        registries: expectedDataRegistries,
      });
      expect(dataServiceSpy.getDataRegistries).toHaveBeenCalledOnceWith(lang)
      done();
    });
  });

  it('authorizeApplication', (done: any) => {
    const authorization = { grantee: 'https://bob.example'} as Authorization
    actions$ = of({
      type: '[APPLICATION PROFILES] Authorize Application',
      authorization
    });

    const expectedAccessAuthorization = { grantee: 'https://bob.example' } as AccessAuthorization

    dataServiceSpy.authorizeApplication.and.resolveTo(expectedAccessAuthorization);

    effects.authorizeApplication$.subscribe((action) => {
      expect(action).toEqual({
        type: '[APPLICATION PROFILES] Authorization Received',
        accessAuthorization: expectedAccessAuthorization,
      });
      expect(dataServiceSpy.authorizeApplication).toHaveBeenCalledOnceWith(authorization)
      done();
    });
  });

  it('loadDescriptions', (done: any) => {
    const applicationId = 'https://projectron.example'

    actions$ = of({
      type: '[DESCRIPTIONS] Descriptions needed for application',
      applicationId
    });

    const expectedAuthorizationData = {
      accessNeedGroup: {
        id: 'https://projectron.example/access-needs#need-group-pm',
        label: 'group',
        needs: [] as AccessNeed[],
      }
    } as AuthorizationData;

    dataServiceSpy.getDescriptions.and.resolveTo(expectedAuthorizationData);

    effects.loadDescriptions$.subscribe({
      next: (action) => {
        if (action.type === '[DESCRIPTIONS] Descriptions received for application')
        expect(action).toEqual({
          type: '[DESCRIPTIONS] Descriptions received for application',
          authorizationData: expectedAuthorizationData,
        });
      },
      complete: done(),
    });
  });
});
