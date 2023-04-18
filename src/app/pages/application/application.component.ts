import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {descriptionsNeeded} from "../../state/actions/description.actions";

@Component({
  selector: 'sai-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    const applicationId = this.route.snapshot.queryParamMap.get('client_id');

    if (!applicationId) {
      this.router.navigateByUrl('/dashboard');
    } else {
      this.store.dispatch(descriptionsNeeded({applicationId}));
    }
  }
}
