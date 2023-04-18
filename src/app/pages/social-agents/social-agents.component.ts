import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { selectSocialAgents } from 'src/app/state/selectors/social-agent.selectors';
import  * as DataActions from 'src/app/state/actions/application.actions';
import {Observable} from "rxjs";
import {SocialAgent} from "@janeirodigital/sai-api-messages";
import {faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sai-social-agents',
  templateUrl: './social-agents.component.html',
  styleUrls: ['./social-agents.component.css']
})
export class SocialAgentsComponent implements OnInit {
  faPlus = faPlus;
  socialAgents$: Observable<SocialAgent[]> = this.store.select(selectSocialAgents);

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(DataActions.socialAgentsPanelLoaded())
  }

}
