import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Logout } from '@auth/store';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private readonly store: Store, private readonly router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.unauthorizedAction();
        }

        return throwError(error);
      })
    );
  }

  unauthorizedAction(): void {
    this.store.dispatch(new Logout()).subscribe(() => this.router.navigate(['/auth']));
  }
}
