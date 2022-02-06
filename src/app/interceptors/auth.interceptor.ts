import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap} from 'rxjs';
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        // Ignore the outgoing requests
        if (event.type === 0) return;

        event = event as HttpResponse<unknown>;
        console.log(event.url);

        if (event instanceof HttpResponse && event.status === 401) {

          // If we're already in the login page then do not redirect again to login
          if (window.location.pathname === '/login') {
            console.log('[Auth Interceptor] Already in login page, not redirecting')
            return;
          }

          // TODO (angel) better logging
          console.log('[Auth Interceptor] Received 401 response - navigating to /login')
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
