import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import {Store} from "@ngrx/store";
import {CoreActions} from "../../state/actions";
import {ENV} from "../../../environments/environment";
@Component({
  selector: 'sai-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  defaultIdP = ENV.DEFAULT_IDP;

  loginForm = new UntypedFormGroup({
    issuer: new UntypedFormControl(''),
  })

  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const oidcIssuer = this.loginForm.get('issuer')!.value || ENV.DEFAULT_IDP;
    this.store.dispatch(CoreActions.loginRequested({ oidcIssuer }));
  }
}
