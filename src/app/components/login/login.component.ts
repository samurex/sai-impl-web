import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {Store} from "@ngrx/store";
import {CoreActions} from "../../actions";
import {ENV} from "../../../environments/environment";
@Component({
  selector: 'sai-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  defaultIdP = ENV.DEFAULT_IDP;

  loginForm = new FormGroup({
    issuer: new FormControl(''),
  })

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {}

  onSubmit() {
    const idP = this.loginForm.get('issuer')!.value || ENV.DEFAULT_IDP;
    this.store.dispatch(CoreActions.loginRequested({ idP }));
  }
}
