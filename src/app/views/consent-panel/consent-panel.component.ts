import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import type { ApplicationProfile, AccessNeedGroup } from '../../view-models';

@Component({
  selector: 'sai-consent-panel',
  templateUrl: './consent-panel.component.html',
  styleUrls: ['./consent-panel.component.scss']
})
export class ConsentPanelComponent implements OnInit {

  @Input()
  profile!: ApplicationProfile;

  @Input()
  groups!: AccessNeedGroup[];

  @Output()
  openAuthorUrl = new EventEmitter<void>();
  // @Output()
  // change = new EventEmitter<AccessNeedGroup>();

  constructor() { }

  ngOnInit(): void {
  }

  noop() {}

}
