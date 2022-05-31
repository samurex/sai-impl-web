import {Component, Input, OnInit} from '@angular/core';
import {Application} from "../../view-models";

@Component({
  selector: 'sai-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  @Input()
  app!: Application;

  constructor() { }

  ngOnInit(): void {
  }

}
