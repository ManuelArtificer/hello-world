import { InjectionToken } from '@angular/core';

import { Config } from '../models/config';

export const CONFIG_PROVIDER = new InjectionToken<ConfigProvider>('configProvider');

export interface ConfigProvider {
  load(): Promise<void>;
  getConfig(): Config;
}
