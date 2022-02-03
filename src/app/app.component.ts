import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {StateService} from "./services/state.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'sai-web-app';

  webId!: string;
  constructor(
    public state: StateService,
  ) {}

  ngOnInit() {
    this.state.getWebId().subscribe(id => this.webId = id);
  }
}
