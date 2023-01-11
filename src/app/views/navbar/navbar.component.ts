import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";
import {Languages} from "../../languages";

@Component({
  selector: 'sai-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input() webId!: string | null;
  @Input() isLoggedIn  = false;
  @Input() withNotificationsAction = true;
  @Input() languageSelect = Languages;

  @Output() notifications = new EventEmitter();


  constructor(
    public router: Router,
  ) {}
}
