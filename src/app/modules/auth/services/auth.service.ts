import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserAuth } from '../models/user-auth';
import { AuthApiService } from '../api-services/auth-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly authApiService: AuthApiService) {}

  loginWithEmailAndPassword(email: string, password: string): Observable<UserAuth> {
    return this.authApiService.login(email, password);
  }

  logout(): Observable<any> {
    return this.authApiService.logout();
  }
}
