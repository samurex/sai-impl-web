import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'sai-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() webId!: string | null;

  constructor(
  ) {}

  ngOnInit(): void {}

}
