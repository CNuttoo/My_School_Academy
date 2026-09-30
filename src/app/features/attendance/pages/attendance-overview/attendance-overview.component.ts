import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AttendanceService } from '../../services/attendance.service';

@Component({ selector: 'app-attendance-overview', imports: [RouterLink], templateUrl: './attendance-overview.component.html', styleUrls: ['./attendance-overview.component.scss', '../../attendance.shared.scss'], changeDetection: ChangeDetectionStrategy.OnPush })
export class AttendanceOverviewComponent {
  readonly latestDate = computed(() => this.attendanceService.sessions().map((item) => item.date).sort().at(-1) ?? '');
  readonly todaySessions = computed(() => this.attendanceService.sessions().filter((item) => item.date === this.latestDate()));
  readonly todayRecords = computed(() => this.todaySessions().flatMap((item) => item.records));
  readonly counts = computed(() => this.attendanceService.counts(this.todayRecords()));
  readonly completion = computed(() => Math.round(this.todaySessions().length / this.attendanceService.classes.length * 100));
  constructor(readonly attendanceService: AttendanceService) {}
}
