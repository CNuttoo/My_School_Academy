import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ScheduleDraft, Weekday } from '../../models/academic.model';
import { AcademicService } from '../../services/academic.service';

@Component({ selector: 'app-timetable', imports: [FormsModule, ReactiveFormsModule], templateUrl: './timetable.component.html', styleUrls: ['./timetable.component.scss', '../../academics.shared.scss'], changeDetection: ChangeDetectionStrategy.OnPush })
export class TimetableComponent {
  readonly days: readonly Weekday[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  readonly adding = signal(false);
  readonly selectedClass = signal('Grade 10A');
  readonly classes = computed(() => [...new Set([...this.academicService.classrooms().map((item) => item.name), ...this.academicService.schedule().map((item) => item.className)])].sort());
  readonly entries = computed(() => this.academicService.schedule().filter((item) => item.className === this.selectedClass()).sort((a, b) => a.period - b.period));
  readonly form = this.formBuilder.nonNullable.group({ day: ['Monday' as Weekday, Validators.required], period: [1, [Validators.required, Validators.min(1), Validators.max(7)]], className: ['Grade 10A', Validators.required], subject: ['', Validators.required], teacher: ['', Validators.required], room: ['', Validators.required] });

  constructor(private readonly formBuilder: FormBuilder, readonly academicService: AcademicService) {}
  entriesFor(day: Weekday) { return this.entries().filter((item) => item.day === day); }
  submit(): void { if (this.form.invalid) { this.form.markAllAsTouched(); return; } const draft = this.form.getRawValue() as ScheduleDraft; this.academicService.addSchedule(draft); this.selectedClass.set(draft.className); this.form.reset({ day: 'Monday', period: 1, className: draft.className, subject: '', teacher: '', room: '' }); this.adding.set(false); }
}
