import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AttendanceService } from '../../services/attendance.service';

@Component({ selector: 'app-attendance-records', imports: [FormsModule], templateUrl: './attendance-records.component.html', styleUrls: ['./attendance-records.component.scss', '../../attendance.shared.scss'], changeDetection: ChangeDetectionStrategy.OnPush })
export class AttendanceRecordsComponent {
  readonly selectedClass = signal('All');
  readonly selectedDate = signal('All');
  readonly dates = computed(() => [...new Set(this.attendanceService.sessions().map((item) => item.date))].sort().reverse());
  readonly sessions = computed(() => this.attendanceService.sessions().filter((item) => (this.selectedClass() === 'All' || item.className === this.selectedClass()) && (this.selectedDate() === 'All' || item.date === this.selectedDate())).sort((a, b) => `${b.date}${b.submittedAt}`.localeCompare(`${a.date}${a.submittedAt}`)));
  readonly records = computed(() => this.sessions().flatMap((item) => item.records));
  readonly counts = computed(() => this.attendanceService.counts(this.records()));
  readonly attendanceRate = computed(() => this.counts().total ? Math.round((this.counts().present + this.counts().late) / this.counts().total * 1000) / 10 : 0);
  constructor(readonly attendanceService: AttendanceService) {}
}
