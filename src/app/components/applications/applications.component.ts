import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { selectApplications} from 'src/app/selectors/application.selectors';
import { DataActions } from 'src/app/actions/application.actions';

@Component({
  selector: 'sai-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  applications$ = this.store.select(selectApplications);

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(DataActions.applicationsPanelLoaded())
  }

}
