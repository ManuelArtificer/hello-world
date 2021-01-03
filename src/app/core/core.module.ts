import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ConfigProvider, CONFIG_PROVIDER } from './services/config-provider';
import { HttpConfigProviderService } from './services/http-config-provider.service';

export function configFactory(configProvider: ConfigProvider): () => Promise<void> {
  return () => configProvider.load();
}

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: CONFIG_PROVIDER,
      useClass: HttpConfigProviderService
    },
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [CONFIG_PROVIDER],
      multi: true
    }
  ]
})
export class CoreModule {}
