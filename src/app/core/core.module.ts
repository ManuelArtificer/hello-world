import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin/';

import { ConfigProvider, CONFIG_PROVIDER } from './services/config-provider';
import { HttpConfigProviderService } from './services/http-config-provider.service';
import { environment } from '@environments';
import { AuthModule } from '@auth';
import { stateName as authStateName } from '@auth/store';
import { TokenInterceptor } from '@auth/services';
import { ErrorInterceptor } from './services/error-interceptor';

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
      key: authStateName
    }),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),
    AuthModule
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
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {}
