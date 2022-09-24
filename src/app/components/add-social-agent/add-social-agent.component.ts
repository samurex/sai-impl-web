import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { DataActions } from 'src/app/actions/application.actions';

@Component({
  selector: 'sai-add-social-agent',
  templateUrl: './add-social-agent.component.html',
  styleUrls: ['./add-social-agent.component.scss']
})
export class AddSocialAgentComponent implements OnInit {

  @Input() webId: string | null = null

  loginForm = new UntypedFormGroup({
    label: new UntypedFormControl(''),
    note: new UntypedFormControl(''),
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.webId = this.route.snapshot.queryParamMap.get('webid')
    if (!this.webId) {
      throw new Error('authorization requires webid query parameter')
    }
  }

  onSubmit() {
    const label = this.loginForm.get('label')!.value
    const note = this.loginForm.get('note')!.value

    if(this.webId! && label) {
      this.store.dispatch(DataActions.addSocialAgent({
        webId: this.webId,
        label,
        note
      }));
    }
    this.router.navigateByUrl('/dashboard')
  }

}
