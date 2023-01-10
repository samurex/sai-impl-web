import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Application, IRI} from "@janeirodigital/sai-api-messages";

import {AccessNeed, AccessNeedGroup, ShapeTree} from "../../state/models";

export type AppChangeSet = {[AccessNeedId: IRI]: IRI[]};

@Component({
  selector: 'sai-app-view',
  templateUrl: './app-view.component.html',
  styleUrls: ['./app-view.component.scss']
})
export class AppViewComponent implements OnInit {

  @Input() expanded = false;
  @Input() application!: Application;
  @Input() group: AccessNeedGroup | null = null;
  @Input() needs: AccessNeed[] | null = null;
  @Input() shapetrees: ShapeTree[] | null = null;

  // TODO prompt for confirmation
  @Output() remove = new EventEmitter<{id: IRI}>();
  @Output() save = new EventEmitter<{changeSet: AppChangeSet}>();

  public changeSet: AppChangeSet = {};
  public changed = false;

  constructor() { }

  ngOnInit(): void {
  }

  handleNeedChange(changed: {id: IRI, access: IRI[]}): void {
    this.changed = true;
    this.changeSet[changed.id] = changed.access;
  }

  handleDiscard(): void {
    this.changed = false;
    this.expanded = false;
    this.changeSet = {};
  }

  submit(): void {
    // TODO
  }

  getShapetreesForNeed(need: AccessNeed): ShapeTree {
    const match = this.shapetrees!.filter(tree => need.shapeTree.includes(tree.id)).pop()!;
    return match;
  }
}
