import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({ selector: 'app-attendance-shell', imports: [RouterLink, RouterLinkActive, RouterOutlet], templateUrl: './attendance-shell.component.html', styleUrls: ['./attendance-shell.component.scss'], changeDetection: ChangeDetectionStrategy.OnPush })
export class AttendanceShellComponent {
  readonly sections = [{ label: 'Overview', route: '/attendance', exact: true }, { label: 'Take attendance', route: '/attendance/take', exact: false }, { label: 'Records', route: '/attendance/records', exact: false }];
}
