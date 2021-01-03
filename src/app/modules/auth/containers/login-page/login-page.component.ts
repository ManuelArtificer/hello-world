import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { finalize } from 'rxjs/operators';

import { UserCredential } from '../../models/user-credential';
import { LoginWithEmailAndPassword } from '../../store';

@Component({
  selector: 'hw-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loggingIn = false;
  errorMessage = '';

  constructor(private readonly route: ActivatedRoute, private readonly router: Router, private readonly store: Store) {}

  login({ email, password }: UserCredential): void {
    this.loggingIn = true;
    this.store
      .dispatch(new LoginWithEmailAndPassword(email, password))
      .pipe(
        finalize(() => {
          this.loggingIn = false;
        })
      )
      .subscribe(
        () => {
          this.errorMessage = '';
          this.redirect();
        },
        (error: Error) => {
          // TODO Change implementation
          this.errorMessage = 'Nieprawidłowy login lub hasło';
        }
      );
  }

  private redirect(): void {
    const redirectTo = this.route.snapshot.queryParams.redirectTo;

    if (redirectTo) {
      this.router.navigateByUrl(redirectTo);
    } else {
      this.router.navigate(['/']);
    }
  }
}
