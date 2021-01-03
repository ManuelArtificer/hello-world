import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './containers/login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  }
];

export const routedComponents = [LoginPageComponent];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AuthRoutingModule {}
