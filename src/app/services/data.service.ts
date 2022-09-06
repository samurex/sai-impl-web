import {Injectable} from '@angular/core';
import { Request, ResponseMessage, ApplicationsRequest, ApplicationsResponse, ApplicationsResponseMessage, Application, DescriptionsRequest, DescriptionsResponse, Description, IRI, DescriptionsResponseMessage  } from '@janeirodigital/sai-api-messages'
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

  async getDescriptions(applicationId: IRI, lang: string): Promise<Description[]> {
    const request = new DescriptionsRequest(applicationId, lang)
    const data = await this.getDataFromApi<DescriptionsResponseMessage>(request)
    const response = new DescriptionsResponse(data)
    return response.payload
  }
}
