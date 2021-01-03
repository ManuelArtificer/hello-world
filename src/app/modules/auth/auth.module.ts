import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AuthState } from './store';
import { SharedModule } from '@shared';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

@NgModule({
  declarations: [LoginPageComponent, LoginFormComponent],
  imports: [SharedModule, NgxsModule.forFeature([AuthState]), AuthRoutingModule]
})
export class AuthModule {}
