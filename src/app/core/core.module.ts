import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin/';

import { MaterialModule } from '../material.module';
import { ConfigProvider, CONFIG_PROVIDER } from './services/config-provider';
import { HttpConfigProviderService } from './services/http-config-provider.service';
import { environment } from '@environments';
import { stateName as authStateName } from '@auth/store';
import { TokenInterceptor } from '@auth/services';
import { ErrorInterceptor } from './services/error-interceptor';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';

export function configFactory(configProvider: ConfigProvider): () => Promise<void> {
  return () => configProvider.load();
}

@NgModule({
  declarations: [MainHeaderComponent, MainLayoutComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
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
    MaterialModule
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
