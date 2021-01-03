import { HttpHeaders } from '@angular/common/http';

export abstract class BaseApiService {
  protected getHeaders(options?: { [name: string]: any }): HttpHeaders {
    return new HttpHeaders({
      ...{ 'Content-Type': 'application/json' },
      ...options
    });
  }
}
