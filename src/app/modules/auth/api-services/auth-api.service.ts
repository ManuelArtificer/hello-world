import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserAuth } from '../models/user-auth';
import { BaseApiService } from '@shared/abstracts/base-api.service';
import { ApiResult } from '@shared/models/api-result';
import { ConfigService } from '@core';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService extends BaseApiService {
  private get apiUrl(): string {
    return `${this.configService.getAppConfig().baseApiUrl}/auth`;
  }

  constructor(private readonly http: HttpClient, private readonly configService: ConfigService) {
    super();
  }

  login(email: string, password: string): Observable<UserAuth> {
    return this.http
      .post<ApiResult<any>>(`${this.apiUrl}/login`, { email, password }, { headers: this.getHeaders() })
      .pipe(map((apiResult) => apiResult.payload));
  }

  logout(): Observable<void> {
    return this.http
      .post<ApiResult<any>>(`${this.apiUrl}/logout`, { headers: this.getHeaders() })
      .pipe(map(() => {}));
  }
}
