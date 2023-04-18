import {Component} from '@angular/core';
import { faMagnifyingGlass, faPerson } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'sai-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  faPerson = faPerson;
}
