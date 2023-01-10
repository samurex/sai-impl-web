import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Store } from '@ngrx/store';
import {Router} from "@angular/router";
import { Languages } from "../../languages";

@Component({
  selector: 'sai-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() webId!: string | null;
  @Input() isLoggedIn : boolean = false;
  @Input() withNotificationsAction: boolean = true;
  @Input() languageSelect = Languages;
  
  @Output() notifications = new EventEmitter();


  constructor(
    public router: Router,
  ) {}

  ngOnInit(): void {}
}
