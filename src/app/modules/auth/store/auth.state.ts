import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoginWithEmailAndPassword, Logout } from './auth.actions';
import { AuthStateModel } from './auth.model';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { UserAuth } from '../models/user-auth';

const getDefaultState = (): AuthStateModel => ({
  token: null,
  userId: null,
  userName: null,
  userEmail: null
});

export const stateName = 'auth';

@State<AuthStateModel>({
  name: stateName,
  defaults: getDefaultState()
})
@Injectable()
export class AuthState {
  @Selector()
  static token(state: AuthStateModel): string {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return AuthState.isTokenValid(state.token);
  }

  @Selector()
  static currentUser(state: AuthStateModel): User {
    return {
      id: state.userId,
      name: state.userName,
      email: state.userEmail
    };
  }

  private static isTokenValid(token: string): boolean {
    return !!token;
  }

  constructor(private readonly authService: AuthService) {}

  @Action(LoginWithEmailAndPassword)
  loginWithEmailAndPassword(
    ctx: StateContext<AuthStateModel>,
    { email, password }: LoginWithEmailAndPassword
  ): Observable<any> {
    return this.authService.loginWithEmailAndPassword(email, password).pipe(
      tap((user: UserAuth) => {
        ctx.patchState({
          token: user.token,
          userId: user.id,
          userName: user.name,
          userEmail: user.email
        });
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>): Observable<any> {
    return this.authService.logout().pipe(
      tap(() => {
        ctx.setState(getDefaultState());
      })
    );
  }
}
