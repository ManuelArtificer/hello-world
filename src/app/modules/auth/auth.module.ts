import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { AuthState } from './store';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgxsModule.forFeature([AuthState])]
})
export class AuthModule {}
