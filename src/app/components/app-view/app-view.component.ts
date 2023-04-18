import { Component, Input } from '@angular/core';
import { Application, IRI } from '@janeirodigital/sai-api-messages';
import { AccessNeed, AccessNeedGroup, ShapeTree } from '../../state/models';
import { faEye, faPencil } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sai-app-view',
  templateUrl: './app-view.component.html',
  styleUrls: ['./app-view.component.css']
})
export class AppViewComponent {
  faEye = faEye;
  faPencil = faPencil;

  @Input() expanded = false;
  @Input() application!: Application;
  @Input() group: AccessNeedGroup | null = null;
  @Input() needs: AccessNeed[] | null = null;
  @Input() shapetrees: ShapeTree[] | null = null;

  getShapetreesForNeed(need: AccessNeed): ShapeTree {
    if (!this.shapetrees) throw Error("Invalid shapetree data");

    const shapetrees =  this.shapetrees.filter(tree => need.shapeTree.includes(tree.id)).pop();

    if (!shapetrees) throw Error("Invalid shapetree data");

    return shapetrees;
  }
}
