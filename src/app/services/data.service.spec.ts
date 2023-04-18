import { SolidClient } from '../utils/solid-client';
import { DataService } from './data.service';
import {
  ApplicationsRequest,
  Application, DescriptionsRequest,
  DataRegistriesRequest, DataRegistry,
  SocialAgentsRequest, SocialAgent,
  AddSocialAgentRequest, AuthorizationData,
  AccessAuthorization, Authorization,
  ApplicationAuthorizationRequest, ResponseMessageTypes, UnregisteredApplicationProfileRequest, RequestMessageTypes
} from '@janeirodigital/sai-api-messages'
import { ENV } from 'src/environments/environment';

let solidClientSpy: jasmine.SpyObj<SolidClient>;
let service: DataService;

const apiUrl = `${ENV.SRV_BASE}/api`
const commonOptions = {
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
};

beforeEach(() => {
  solidClientSpy = jasmine.createSpyObj('SolidClient', ['fetch']);
  service = new DataService(solidClientSpy);
});

describe('getApplicationProfiles', () => {
  it('should return the correct payload', async () => {
    const message = {
      type: ResponseMessageTypes.APPLICATIONS_RESPONSE,
      payload: [ { id: 'app-1' }, { id: 'app-2' } ] as Application[]
    }
    solidClientSpy.fetch.and.resolveTo({ json: async () => message } as unknown as Response)
    const payload = await service.getApplicationProfiles()
    expect(payload).toBe(message.payload)
    const options = {
      ...commonOptions,
      body: (new ApplicationsRequest()).stringify()
    }
    expect(solidClientSpy.fetch).toHaveBeenCalledWith(apiUrl, options);
  })

  it('should throw if incorrect response type', async () => {
    const message = {
      type: ResponseMessageTypes.SOCIAL_AGENTS_RESPONSE,
      payload: []
    }
    solidClientSpy.fetch.and.resolveTo({ json: async () => message } as unknown as Response)
    const errorMessage = new RegExp('Invalid message type!');
    await expectAsync(service.getApplicationProfiles()).toBeRejectedWithError(Error, errorMessage)
  })
})


describe('getSocialAgentProfiles', () => {
  it('should return the correct payload', async () => {
    const message = {
      type: ResponseMessageTypes.SOCIAL_AGENTS_RESPONSE,
      payload: [ { id: 'agent-1' }, { id: 'app-2' } ] as SocialAgent[]
    }
    solidClientSpy.fetch.and.resolveTo({ json: async () => message } as unknown as Response)
    const payload = await service.getSocialAgentProfiles()
    expect(payload).toBe(message.payload)
    const options = {
      ...commonOptions,
      body: (new SocialAgentsRequest()).stringify()
    }
    expect(solidClientSpy.fetch).toHaveBeenCalledWith(apiUrl, options);
  })

  it('should throw if incorrect response type', async () => {
    const message = {
      type: ResponseMessageTypes.APPLICATIONS_RESPONSE,
      payload: []
    }
    solidClientSpy.fetch.and.resolveTo({ json: async () => message } as unknown as Response)
    const errorMessage = new RegExp('Invalid message type!');
    await expectAsync(service.getSocialAgentProfiles()).toBeRejectedWithError(Error, errorMessage)
  })
})


describe('addSocialAgent', () => {
  const webId = 'https://bob.example'
  const label = 'Bob'
  const note = 'a jolly fella'

  it('should return the correct payload', async () => {
    const message = {
      type: ResponseMessageTypes.SOCIAL_AGENT_RESPONSE,
      payload: { id: 'agent-1' } as SocialAgent,
    }
    solidClientSpy.fetch.and.resolveTo({ json: async () => message } as unknown as Response)
    const payload = await service.addSocialAgent(webId, label, note)
    expect(payload).toBe(message.payload)
    const options = {
      ...commonOptions,
      body: (new AddSocialAgentRequest(webId, label, note)).stringify()
    }
    expect(solidClientSpy.fetch).toHaveBeenCalledWith(apiUrl, options);
  })

  it('should throw if incorrect response type', async () => {
    const message = {
      type: ResponseMessageTypes.APPLICATIONS_RESPONSE,
      payload: []
    }
    solidClientSpy.fetch.and.resolveTo({ json: async () => message } as unknown as Response)
    const errorMessage = new RegExp('Invalid message type!');
    await expectAsync(service.addSocialAgent(webId, label, note)).toBeRejectedWithError(Error, errorMessage)
  })
})

describe('getDataRegistries', () => {
  const lang = 'pl'

  it('should return the correct payload', async () => {
    const message = {
      type: ResponseMessageTypes.DATA_REGISTRIES_RESPONSE,
      payload:[{ id: 'reg-1' }, { id: 'reg-2' }] as DataRegistry[],
    }
    solidClientSpy.fetch.and.resolveTo({ json: async () => message } as unknown as Response)
    const payload = await service.getDataRegistries(lang)
    expect(payload).toBe(message.payload)
    const options = {
      ...commonOptions,
      body: (new DataRegistriesRequest(lang)).stringify()
    }
    expect(solidClientSpy.fetch).toHaveBeenCalledWith(apiUrl, options);
  })

  it('should throw if incorrect response type', async () => {
    const message = {
      type: ResponseMessageTypes.APPLICATIONS_RESPONSE,
      payload: []
    }
    solidClientSpy.fetch.and.resolveTo({ json: async () => message } as unknown as Response)
    const errorMessage = new RegExp('Invalid message type!');
    await expectAsync(service.getDataRegistries(lang)).toBeRejectedWithError(Error, errorMessage)
  })
})

describe('getDescriptions', () => {
  const applicationId = 'https://projectron.example'
  const lang = 'pl'

  it('should return the correct payload', async () => {
    const message = {
      type: ResponseMessageTypes.DESCRIPTIONS_RESPONSE,
      payload: { id: '123' } as AuthorizationData,
    }
    solidClientSpy.fetch.and.resolveTo({ json: async () => message } as unknown as Response)
    const payload = await service.getDescriptions(applicationId, lang);
    expect(payload).toBe(message.payload)
    const options = {
      ...commonOptions,
      body: (new DescriptionsRequest(applicationId, lang)).stringify()
    }
    expect(solidClientSpy.fetch).toHaveBeenCalledWith(apiUrl, options);
  })

  it('should throw if incorrect response type', async () => {
    const message = {
      type: ResponseMessageTypes.APPLICATIONS_RESPONSE,
      payload: []
    }
    solidClientSpy.fetch.and.resolveTo({ json: async () => message } as unknown as Response)
    const errorMessage = new RegExp('Invalid message type!');
    await expectAsync(service.getDescriptions(applicationId, lang)).toBeRejectedWithError(Error, errorMessage)
  })
})


describe('authorizeApplication', () => {
  const authorization = {
    grantee: 'https://projectron.example'
  } as unknown as Authorization

  it('should return the correct payload', async () => {
    const message = {
      type: ResponseMessageTypes.APPLICATION_AUTHORIZATION_REGISTERED,
      payload: { grantee: 'https://projectron.example' } as AccessAuthorization,
    }
    solidClientSpy.fetch.and.resolveTo({ json: async () => message } as unknown as Response)
    const payload = await service.authorizeApplication(authorization);
    expect(payload).toBe(message.payload)
    const options = {
      ...commonOptions,
      body: (new ApplicationAuthorizationRequest(authorization)).stringify()
    }
    expect(solidClientSpy.fetch).toHaveBeenCalledWith(apiUrl, options);
  })

  it('should throw if incorrect response type', async () => {
    const message = {
      type: ResponseMessageTypes.APPLICATIONS_RESPONSE,
      payload: []
    }
    solidClientSpy.fetch.and.resolveTo({ json: async () => message } as unknown as Response)
    const errorMessage = new RegExp('Invalid message type!');
    await expectAsync(service.authorizeApplication(authorization)).toBeRejectedWithError(Error, errorMessage)
  })
})

describe('getUnregisteredApplicationProfile', () => {
  const applicationId = 'https://app.id'

  describe('with a right response', () => {

    let response: Response;

    beforeEach(() => {
      response = { json: async () => ({type: ResponseMessageTypes.UNREGISTERED_APPLICATION_PROFILE})} as Response;
    })

    it('should call the api with the right inputs', async () => {
      const expectedOptions = {
        ...commonOptions,
        body: (new UnregisteredApplicationProfileRequest(applicationId)).stringify(),
      }
      solidClientSpy.fetch.and.resolveTo(response)
      await service.getUnregisteredApplicationProfile(applicationId);

      expect(solidClientSpy.fetch).toHaveBeenCalledWith(apiUrl, expectedOptions);
    })
  })
})
