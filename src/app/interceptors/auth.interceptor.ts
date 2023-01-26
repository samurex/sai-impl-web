import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap} from 'rxjs';
import * as CoreActions from '../state/actions/core.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private store: Store
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<unknown>) => {
        // Ignore the outgoing requests
        if (event.type === HttpEventType.Sent) return;

        event = event as HttpResponse<unknown>;

        if (event.status === 401) {
          console.info('[Auth Interceptor] Received 401 response - setting login status to false')
          this.store.dispatch(CoreActions.loginStatusChanged({loggedIn: false}));
        }
      })
    );
  }
}
