import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {CoreActions} from "../../actions";

@Component({
  selector: 'sai-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() logout = new EventEmitter<void>();
  @Input() webId!: string | null;
  constructor(
    private readonly store: Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(CoreActions.requestWebId());
  }
}
