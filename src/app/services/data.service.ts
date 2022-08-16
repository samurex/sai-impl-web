import {Injectable} from '@angular/core';
import { Message, ApplicationsRequest, ApplicationsResponse, Application } from '@janeirodigital/sai-api-messages'
import {ENV} from "../../environments/environment";
import { SolidClient } from '../utils/solid-client';

const commonOptions = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private solidClient: SolidClient,
  ) {}

  private async getDataFromApi(options: RequestInit): Promise<Message> {
    const response = await this.solidClient.fetch(`${ENV.SRV_BASE}/api`, options)
    return (await response.json()) as Message
  }

  async getApplicationProfiles(): Promise<Application[]> {
    const requestMessage = new ApplicationsRequest()
    const options = {
      ...commonOptions,
      body: JSON.stringify({type: requestMessage.type}),
    }
    const data = await this.getDataFromApi(options)
    const responseMessage = new ApplicationsResponse(data)
    return responseMessage.payload
  }

//   async getDescription(applicationId: string, lang: string): Promise<Description[]> {
//     const options = {
//       ...commonOptions,
//       body: JSON.stringify({
//         type: MessageTypes.DESCRIPTION_REQUESTED,
//         applicationId,
//         lang
//       }),
//     }
//     const data = await this.getDataFromApi(options)
//     return data.descriptions as Description[]
//   }
// }

}
