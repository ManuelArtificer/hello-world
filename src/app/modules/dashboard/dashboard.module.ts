import { NgModule } from '@angular/core';

import { DashboardRoutingModule, routedComponents } from './dashboard-routing.module';
import { SharedModule } from '@shared';
import { DashboardTitleComponent } from './components/dashboard-title/dashboard-title.component';

@NgModule({
  declarations: [routedComponents, DashboardTitleComponent],
  imports: [SharedModule, DashboardRoutingModule]
})
export class DashboardModule {}
