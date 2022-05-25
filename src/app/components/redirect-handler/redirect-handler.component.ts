import {Component, OnInit} from '@angular/core';
import {handleIncomingRedirect} from "@inrupt/solid-client-authn-browser";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {CoreActions} from "../../actions";
import {firstValueFrom} from "rxjs";
import {loggedInStatus} from "../../selectors";

@Component({
  selector: 'sai-redirect-handler',
  templateUrl: './redirect-handler.component.html',
  styleUrls: ['./redirect-handler.component.scss']
})
export class RedirectHandlerComponent implements OnInit {

  constructor(
    private router: Router,
    private store: Store,
  ) { }

  async ngOnInit(): Promise<void> {

    const isLoggedIn = await firstValueFrom(this.store.select(loggedInStatus));

    try {
      if (!isLoggedIn) {
        console.log('Restoring from redirect handler');
        await handleIncomingRedirect()
          .then((info) => {
            if (info && info.isLoggedIn) {
              console.log(info);
              this.store.dispatch(CoreActions.webIdReceived({webId: info.webId!}));
              this.store.dispatch(CoreActions.loginStatusChanged({loggedIn: true}))
              this.router.navigate(['/']).then(() => console.log('Login successful'));
            } else {
              this.router.navigate(['/login']).then(() => console.log('Login failed'));
            }
          });

      }
      // Hit the server to check for a server-side session, or create one.
    } catch (e) {
      // TODO handle
    }
  }
}
