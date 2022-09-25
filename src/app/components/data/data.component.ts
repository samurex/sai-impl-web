import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { selectApplications} from 'src/app/selectors/application.selectors';
import { DataActions } from 'src/app/actions/application.actions';
import { selectDataRegistries } from 'src/app/selectors/data.selectors';

@Component({
  selector: 'sai-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  registries$ = this.store.select(selectDataRegistries);

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(DataActions.dataRegistriesNeeded())
  }

}
