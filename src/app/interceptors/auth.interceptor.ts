import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map(event => {
        // If the server session is expired then the user has to re-authenticate
        if (event instanceof HttpResponse && event.status === 401) {
          // TODO (angel) better logging
          console.log('[Auth Interceptor] Received 401 response - navigating to /login')
          this.router.navigate(['/login']);
        }
        return event;
      })
    );
  }
}
