import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import { ENV } from "../../../environments/environment";

@Component({
  selector: 'sai-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    issuer: new FormControl(''),
  })

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {}

  onSubmit() {
    this.http.post(`${ENV.AUTH_URL}/login`, {idp: this.loginForm.get('issuer')!.value || ENV.DEFAULT_IDP}, {responseType:'text'})
      .subscribe(url => {
        window.location.href = url;
      });
  }
}
