import {Injectable} from '@angular/core';
import {ENV} from "../../environments/environment";
import {Application, Description} from '../view-models';
import { SolidClient } from '../utils/solid-client';
import { DataActions } from '../actions/application.actions'
import { DescActions } from '../actions/description.actions'

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

  private async getDataFromApi(options: RequestInit): Promise<any> {
    const response = await this.solidClient.fetch(`${ENV.SRV_BASE}/api`, options)
    return response.json()
  }

  async getApplicationProfiles(): Promise<Application[]> {
    const options = {
      ...commonOptions,
      body: JSON.stringify({type: DataActions.applicationsPanelLoaded.type}),
    }
    const data = await this.getDataFromApi(options)
    return data.profiles as Application[]
  }

  async getDescription(applicationId: string, lang: string): Promise<Description[]> {
    const options = {
      ...commonOptions,
      body: JSON.stringify({
        type: DescActions.descriptionsNeeded.type,
        applicationId,
        lang
      }),
    }
    const data = await this.getDataFromApi(options)
    return data.descriptions as Description[]
  }
}
