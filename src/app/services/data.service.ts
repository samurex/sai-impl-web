import {Injectable} from '@angular/core';
import { Request, ResponseMessage, ApplicationsRequest, ApplicationsResponse, ApplicationsResponseMessage,
  Application, DescriptionsRequest, DescriptionsResponse, IRI, DescriptionsResponseMessage,
  DataRegistriesRequest, DataRegistriesResponse, DataRegistriesResponseMessage, DataRegistry,
  SocialAgentsRequest, SocialAgentsResponse, SocialAgent, SocialAgentsResponseMessage,
  AddSocialAgentRequest, SocialAgentResponse, SocialAgentResponseMessage, AuthorizationData, AccessAuthorization, Authorization, ApplicationAuthorizationRequest, ApplicationAuthorizationResponseMessage, ApplicationAuthorizationResponse
} from '@janeirodigital/sai-api-messages'
import {ENV} from "../../environments/environment";
import { SolidClient } from '../utils/solid-client';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private solidClient: SolidClient,
  ) {}

  private async getDataFromApi<T extends ResponseMessage>(request: Request): Promise<T> {
    const commonOptions = {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          }
    }
    const options = {
      ...commonOptions,
      body: request.stringify()
    }
    const response = await this.solidClient.fetch(`${ENV.SRV_BASE}/api`, options)
    return (await response.json()) as T
  }

  async getApplicationProfiles(): Promise<Application[]> {
    const request = new ApplicationsRequest()
    const data = await this.getDataFromApi<ApplicationsResponseMessage>(request)
    const response = new ApplicationsResponse(data)
    return response.payload
  }

  async getSocialAgentProfiles(): Promise<SocialAgent[]> {
    const request = new SocialAgentsRequest()
    const data = await this.getDataFromApi<SocialAgentsResponseMessage>(request)
    const response = new SocialAgentsResponse(data)
    return response.payload
  }

  async addSocialAgent(webId: IRI, label: string, note?: string): Promise<SocialAgent> {
    const request = new AddSocialAgentRequest(webId, label, note)
    const data = await this.getDataFromApi<SocialAgentResponseMessage>(request)
    const response = new SocialAgentResponse(data)
    return response.payload
  }

  async getDataRegistries(lang: string): Promise<DataRegistry[]> {
    const request = new DataRegistriesRequest(lang)
    const data = await this.getDataFromApi<DataRegistriesResponseMessage>(request)
    const response = new DataRegistriesResponse(data)
    return response.payload
  }

  async getDescriptions(applicationId: IRI, lang: string): Promise<AuthorizationData> {
    const request = new DescriptionsRequest(applicationId, lang)
    const data = await this.getDataFromApi<DescriptionsResponseMessage>(request)
    const response = new DescriptionsResponse(data)
    return response.payload
  }

  async authorizeApplication(authorization: Authorization): Promise<AccessAuthorization> {
    const request = new ApplicationAuthorizationRequest(authorization)
    const data = await this.getDataFromApi<ApplicationAuthorizationResponseMessage>(request)
    const response = new ApplicationAuthorizationResponse(data)
    return response.payload
  }
}
