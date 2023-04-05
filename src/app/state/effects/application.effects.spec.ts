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
  Resource,
  ShareAuthorization,
  ShareAuthorizationConfirmation,
  SocialAgent
} from '@janeirodigital/sai-api-messages';
import {provideMockStore} from '@ngrx/store/testing';
import {selectPrefLanguage} from '../selectors';

let actions$ = new Observable<Action>();
let dataServiceSpy: jasmine.SpyObj<DataService>;
let effects: ApplicationProfileEffects

const spy = jasmine.createSpyObj('DataService', ['getApplicationProfiles', 'getSocialAgentProfiles', 'addSocialAgent', 'getDataRegistries', 'authorizeApplication', 'getDescriptions', 'getResource', 'shareResource']);

const defaultLang = 'en'

describe('ApplicationProfileEffects', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApplicationProfileEffects,
        provideMockStore({
          selectors: [
            {
              selector: selectPrefLanguage,
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


  it('loadApplicationProfiles', (done) => {
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
      expect(dataServiceSpy.getApplicationProfiles).toHaveBeenCalledOnceWith()
      done();
    });
  });

  it('loadSocialAgentsProfiles', (done) => {
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
      expect(dataServiceSpy.getSocialAgentProfiles).toHaveBeenCalledOnceWith()
      done();
    });
  });

  it('addSocialAgent', (done) => {
    const webId = 'https://jane.example'
    const label = 'Jana'
    const note = 'A truck driver'

    actions$ = of({
      type: '[SOCIAL AGENT PROFILES] Add Social Agent',
      webId, label, note
    });

    const expectedProfile = { id: 'https://jane.example' } as SocialAgent

    dataServiceSpy.addSocialAgent.and.resolveTo(expectedProfile);

    effects.addSocialAgent$.subscribe((action) => {
      expect(action).toEqual({
        type: '[SOCIAL AGENT PROFILES] Single Social Agent Profile Received',
        profile: expectedProfile,
      });
      expect(dataServiceSpy.addSocialAgent).toHaveBeenCalledOnceWith(webId, label, note)
      done();
    });
  });

  it('loadDataRegistries', (done) => {
    actions$ = of({
      type: '[DATA REGISTRIES] Data Registries Requested'
    });

    const expectedDataRegistries = [{ id: 'https://data.bob.example/reg-1' }, { id: 'https://data.bob.example/reg-2' }] as DataRegistry[]

    dataServiceSpy.getDataRegistries.and.resolveTo(expectedDataRegistries);

    effects.loadDataRegistries$.subscribe((action) => {
      expect(action).toEqual({
        type: '[DATA REGISTRIES] Data Registries Received',
        registries: expectedDataRegistries,
      });
      expect(dataServiceSpy.getDataRegistries).toHaveBeenCalledOnceWith(defaultLang)
      done();
    });
  });

  it('authorizeApplication', (done) => {
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

  it('loadDescriptions', (done) => {
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
        expect(dataServiceSpy.getDescriptions).toHaveBeenCalledOnceWith(applicationId, defaultLang)
      },
      complete: () => done(),
    });
  });

  it('loadResource', (done) => {
    const resourceId = 'https://work.alice.example/some-resource'

    actions$ = of({
      type: '[RESOURCE] Resource Requested',
      id: resourceId
    });

    const expectedResource = {
        id: resourceId
    } as unknown as Resource;

    dataServiceSpy.getResource.and.resolveTo(expectedResource);

    effects.loadResource$.subscribe({
      next: (action) => {
        if (action.type === '[RESOURCE] Resource Received')
        expect(action).toEqual({
          type: '[RESOURCE] Resource Received',
          resource: expectedResource,
        });
        expect(dataServiceSpy.getResource).toHaveBeenCalledOnceWith(resourceId, defaultLang)
      },
      complete: () => done(),
    });
  });

  it('shareResource', (done) => {
    const shareAuthorization = {
      applicationId: 'https://work.alice.example/some-resource'
    } as unknown as ShareAuthorization      

    actions$ = of({
      type: '[RESOURCE] Share Resource',
      shareAuthorization
    });

    const expectedConfirmation = {
      confirmation: {}
    } as unknown as ShareAuthorizationConfirmation;

    dataServiceSpy.shareResource.and.resolveTo(expectedConfirmation);

    effects.shareResource$.subscribe({
      next: (action) => {
        if (action.type === '[RESOURCE] Share Confirmation')
        expect(action).toEqual({
          type: '[RESOURCE] Share Confirmation',
          confirmation: expectedConfirmation
        });
        expect(dataServiceSpy.shareResource).toHaveBeenCalledOnceWith(shareAuthorization)
      },
      complete: () => done(),
    });
  });

  // TODO
  xit('redirect to callback after authorization', async() => {
    effects.redirectToCallbackEndpoint$.subscribe().unsubscribe();
  });

  // TODO
  xit('redirect to callback after share', async() => {
    effects.redirectToCallbackEndpointAfterShare$.subscribe().unsubscribe();
  });
});
