import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Instance} from "../../state/models";
import {MatCheckboxChange} from "@angular/material/checkbox";

/**
 * While this component is intended to display up-to individual instances of data, for now it displays
 * up-to the data registry because sai-js/service does not expose more fine-grained data
 */
@Component({
  selector: 'sai-instance-selector',
  templateUrl: './instance-selector.component.html',
  styleUrls: ['./instance-selector.component.scss']
})
export class InstanceSelectorComponent implements OnInit {

  selectAll = false;

  // @Input() instances!: Instance[];
  @Input() registryIds!: string[];

  // List of the selected instances ids
  @Output() selected = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit(): void {
  }

  handleToggle(change: MatCheckboxChange): void {
    const id = change.source.id;
  }
}
