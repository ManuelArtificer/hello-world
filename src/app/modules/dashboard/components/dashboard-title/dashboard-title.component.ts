import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'hw-dashboard-title',
  templateUrl: './dashboard-title.component.html',
  styleUrls: ['./dashboard-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardTitleComponent {
  @Input() userName: string;
}
