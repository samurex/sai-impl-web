import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Consent, ConsentGroup, ConsentNeed} from "../../models/consent";

@Component({
  selector: 'sai-consent-panel',
  templateUrl: './consent-panel.component.html',
  styleUrls: ['./consent-panel.component.scss']
})
export class ConsentPanelComponent implements OnInit {

  @Input()
  consent!: Consent;

  @Input()
  groups!: ConsentGroup[];

  @Output()
  openAuthorUrl = new EventEmitter<void>();
  @Output()
  updateConsent = new EventEmitter<Consent>();

  constructor() { }

  ngOnInit(): void {
  }

  noop() {}

}
