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
import { CoreActions } from '../state/actions';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private store: Store
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        // Ignore the outgoing requests
        if (event.type === HttpEventType.Sent) return;

        event = event as HttpResponse<unknown>;
        console.log(event.url);

        if (event instanceof HttpResponse && event.status === 401) {
          console.log('[Auth Interceptor] Received 401 response - setting login status to false')
          this.store.dispatch(CoreActions.loginStatusChanged({loggedIn: false}));
        }
      })
    );
  }
}
