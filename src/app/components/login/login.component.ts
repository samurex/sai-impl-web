import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'sai-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Input() idps = [
    { name: 'localhost', url: 'http://localhost:3000' },
    { name: 'XFORM.id', url: 'http://localhost:3000' },
    { name: 'pod.gov.tld', url: 'http://localhost:3000' },
  ];

  @Output() login = new EventEmitter<string>();

  form = new FormGroup({
    issuer: new FormControl<string>(''),
  });
}
