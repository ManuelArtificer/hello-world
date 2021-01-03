import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin/';

import { ConfigProvider, CONFIG_PROVIDER } from './services/config-provider';
import { HttpConfigProviderService } from './services/http-config-provider.service';
import { environment } from '@environments';

export function configFactory(configProvider: ConfigProvider): () => Promise<void> {
  return () => configProvider.load();
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot({
      key: 'auth'
    }),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    })
  ],
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
