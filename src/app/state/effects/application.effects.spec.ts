import { Observable, of } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { ApplicationProfileEffects } from './application.effects';
import { DataService } from '../../services/data.service';
import {
  Application,
  DataRegistry,
  Resource,
  SocialAgent,
} from '@janeirodigital/sai-api-messages';
import { provideMockStore } from '@ngrx/store/testing';
import { selectPrefLanguage } from '../selectors';

let actions$ = new Observable<Action>();
let dataServiceSpy: jasmine.SpyObj<DataService>;
let effects: ApplicationProfileEffects

const spy = jasmine.createSpyObj('DataService', ['getApplicationProfiles', 'getSocialAgentProfiles', 'addSocialAgent', 'getDataRegistries', 'authorizeApplication', 'getDescriptions', 'getResource']);

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

  xit('loadDescriptions', (done) => {
    // TODO `load descriptions` will be refactored into smaller effects
    done()
    // const applicationId = 'https://projectron.example'
    //
    // // actions$ = of({
    // //   type: '[DESCRIPTIONS] Descriptions needed for application',
    // //   applicationId
    // // });
    //
    // actions$ = from([descriptionsNeeded({applicationId})])
    //
    // const expectedAuthorizationData = {
    //   accessNeedGroup: {
    //     id: 'https://projectron.example/access-needs#need-group-pm',
    //     label: 'group',
    //     needs: [] as AccessNeed[],
    //   }
    // } as AuthorizationData;
    //
    // dataServiceSpy.getDescriptions.and.resolveTo(expectedAuthorizationData);
    //
    // effects.loadDescriptions$.subscribe({
    //   next: (action) => {
    //     if (action.type === addAccessNeed.type)
    //     expect(action).toEqual({
    //       type: '[DESCRIPTIONS] Descriptions received for application',
    //       authorizationData: expectedAuthorizationData,
    //     });
    //     expect(dataServiceSpy.getDescriptions).toHaveBeenCalledOnceWith(applicationId, defaultLang)
    //   },
    //   complete: () => done(),
    // });
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

});
