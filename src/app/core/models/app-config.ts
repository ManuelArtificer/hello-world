import { Config } from './config';

export class AppConfig {
  constructor(private readonly config: Config) {}

  get baseApiUrl(): string {
    return this.config.baseApiUrl;
  }
}
