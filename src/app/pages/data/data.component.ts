import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as DataActions from 'src/app/state/actions/application.actions';
import {selectDataRegistries} from 'src/app/state/selectors/data.selectors';
import {Observable} from "rxjs";
import {DataRegistry} from "@janeirodigital/sai-api-messages";

@Component({
  selector: 'sai-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  registries$: Observable<DataRegistry[]> = this.store.select(selectDataRegistries);

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(DataActions.dataRegistriesNeeded())
  }

}
