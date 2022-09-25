import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { selectSocialAgents } from 'src/app/selectors/social-agent.selectors';
import { DataActions } from 'src/app/actions/application.actions';

@Component({
  selector: 'sai-social-agents',
  templateUrl: './social-agents.component.html',
  styleUrls: ['./social-agents.component.scss']
})
export class SocialAgentsComponent implements OnInit {

  socialAgents$ = this.store.select(selectSocialAgents);

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(DataActions.socialAgentsPanelLoaded())
  }

}
