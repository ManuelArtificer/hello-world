import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AuthState } from './store';
import { SharedModule } from '@shared';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [],
  imports: [NgxsModule.forFeature([AuthState]), SharedModule, AuthRoutingModule]
})
export class AuthModule {}
