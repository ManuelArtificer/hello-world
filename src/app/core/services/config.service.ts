import { Inject, Injectable } from '@angular/core';

import { AppConfig } from '../models/app-config';
import { ConfigProvider, CONFIG_PROVIDER } from './config-provider';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private appConfig: AppConfig;

  constructor(@Inject(CONFIG_PROVIDER) private readonly configProvider: ConfigProvider) {}

  getAppConfig(): AppConfig {
    if (!this.appConfig) {
      this.appConfig = new AppConfig(this.configProvider.getConfig());
    }

    return this.appConfig;
  }
}
