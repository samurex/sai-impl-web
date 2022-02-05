import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import type { ApplicationProfile } from '@janeirodigital/sai-server/dist/sai-api';

@Component({
  selector: 'sai-consent-panel',
  templateUrl: './consent-panel.component.html',
  styleUrls: ['./consent-panel.component.scss']
})
export class ConsentPanelComponent implements OnInit {

  @Input()
  profile!: ApplicationProfile;

  // @Input()
  // groups!: AccessConsent[];

  @Output()
  openAuthorUrl = new EventEmitter<void>();
  // @Output()
  // updateConsent = new EventEmitter<ConsentGroup>();

  constructor() { }

  ngOnInit(): void {
  }

  noop() {}

}
