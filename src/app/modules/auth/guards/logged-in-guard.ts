import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngxs/store';

import { AuthState } from '../store';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(private readonly store: Store, private readonly router: Router) {}

  canActivate(): Promise<boolean> {
    const isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated);

    return !isAuthenticated ? Promise.resolve(true) : this.router.navigate(['/']);
  }
}
