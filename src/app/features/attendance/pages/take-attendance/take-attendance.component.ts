import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AttendanceRecord, AttendanceStatus } from '../../models/attendance.model';
import { AttendanceService } from '../../services/attendance.service';

@Component({ selector: 'app-take-attendance', imports: [FormsModule], templateUrl: './take-attendance.component.html', styleUrls: ['./take-attendance.component.scss', '../../attendance.shared.scss'], changeDetection: ChangeDetectionStrategy.OnPush })
export class TakeAttendanceComponent {
  readonly statuses: readonly AttendanceStatus[] = ['Present', 'Late', 'Absent', 'Excused'];
  readonly selectedDate = signal('2026-09-25');
  readonly selectedClass = signal(this.attendanceService.classes[0]);
  readonly records = signal<readonly AttendanceRecord[]>(this.attendanceService.createDraft(this.selectedDate(), this.selectedClass()));
  readonly counts = computed(() => this.attendanceService.counts(this.records()));
  readonly saved = signal(false);

  constructor(readonly attendanceService: AttendanceService) {}
  reload(): void { this.records.set(this.attendanceService.createDraft(this.selectedDate(), this.selectedClass())); this.saved.set(false); }
  changeDate(value: string): void { this.selectedDate.set(value); this.reload(); }
  changeClass(value: string): void { this.selectedClass.set(value); this.reload(); }
  setStatus(id: string, status: AttendanceStatus): void { this.records.update((items) => items.map((item) => item.id === id ? { ...item, status } : item)); this.saved.set(false); }
  setNote(id: string, note: string): void { this.records.update((items) => items.map((item) => item.id === id ? { ...item, note } : item)); this.saved.set(false); }
  markAllPresent(): void { this.records.update((items) => items.map((item) => ({ ...item, status: 'Present' }))); this.saved.set(false); }
  save(): void { this.attendanceService.saveSession(this.selectedDate(), this.selectedClass(), this.records()); this.saved.set(true); }
}
