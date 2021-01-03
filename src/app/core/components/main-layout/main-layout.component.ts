import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AuthState, Logout } from '@auth/store';
import { User } from '../../models/user';

@Component({
  selector: 'hw-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  loggingOut = false;

  @Select(AuthState.currentUser) user$: Observable<User>;

  constructor(private readonly store: Store, private readonly router: Router) {}

  logout(): void {
    this.loggingOut = true;
    this.store
      .dispatch(new Logout())
      .pipe(
        finalize(() => {
          this.loggingOut = false;
        })
      )
      .subscribe(() => this.router.navigate(['/auth']));
  }
}
