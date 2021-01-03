import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Config } from '../models/config';
import { ConfigProvider } from './config-provider';

@Injectable()
export class HttpConfigProviderService implements ConfigProvider {
  private readonly configUrl = 'assets/config.json';
  private config: Config;

  constructor(private readonly http: HttpClient) {}

  load(): Promise<void> {
    return this.http
      .get<Config>(this.configUrl)
      .pipe(map((config: Config) => this.setConfig(config)))
      .toPromise();
  }

  getConfig(): Config {
    return { ...this.config };
  }

  private setConfig(config: Config): void {
    this.config = config;
  }
}
