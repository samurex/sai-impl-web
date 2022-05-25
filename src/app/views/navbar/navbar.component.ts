import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ENV} from "../../../environments/environment";
import {SolidClient} from "../../utils/solid-client";

@Component({
  selector: 'sai-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() isServerLoggedIn!: boolean;
  @Input() webId!: string | null;

  @Output() serverLogin = new EventEmitter();
  constructor(
    private solidClient: SolidClient,
  ) { }

  ngOnInit(): void {
  }

  public async loginServer(): Promise<void> {
    type ResponseShape = {
      redirectUrl: string,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify({idp: 'http://localhost:3000/'}),
    } as RequestInit;

    const redir = await this.solidClient.fetch(ENV.SRV_BASE + '/login', options)
      .then(r => r.json())
      .then((r: ResponseShape) => r.redirectUrl)

    if (redir) window.location.href = redir;
    else {
      console.warn('Bad login response');
    }
  }
}

