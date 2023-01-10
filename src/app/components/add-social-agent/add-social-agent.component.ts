import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from "@ngrx/store";
import {IRI} from "@janeirodigital/sai-api-messages";
import {DataActions} from "../../state/actions/application.actions";

@Component({
  selector: 'sai-add-social-agent',
  templateUrl: './add-social-agent.component.html',
  styleUrls: ['./add-social-agent.component.scss']
})
export class AddSocialAgentComponent implements OnInit {
  webid: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.webid = this.route.snapshot.queryParamMap.get('webid')
  }

  onSubmit(data: {webid: IRI, label: string, note?: string}) {
    const { webid: webId, label, note } = data;
    this.store.dispatch(DataActions.addSocialAgent({webId, label, note}))
    // TODO confirm action was successful/handle error before turning the user away
    this.router.navigateByUrl('/dashboard');
  }
}
