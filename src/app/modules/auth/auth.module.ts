import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AuthState } from './store';
import { SharedModule } from '@shared';
import { AuthRoutingModule, routedComponents } from './auth-routing.module';
import { LoginFormComponent } from './components/login-form/login-form.component';

@NgModule({
  declarations: [routedComponents, LoginFormComponent],
  imports: [SharedModule, NgxsModule.forFeature([AuthState]), AuthRoutingModule]
})
export class AuthModule {}
