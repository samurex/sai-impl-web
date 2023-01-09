import { Component, Input, OnInit } from '@angular/core';
import { Languages } from "../../languages";

@Component({
  selector: 'sai-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() webId!: string | null;
  @Input() languageSelect = Languages;

  constructor(
  ) {}

  ngOnInit(): void {}

}
