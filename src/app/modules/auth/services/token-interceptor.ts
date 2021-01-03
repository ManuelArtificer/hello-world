import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

import { AuthState } from '../store';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private readonly store: Store) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.store.selectSnapshot(AuthState.token);
    const newRequest = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });

    return next.handle(newRequest);
  }
}
