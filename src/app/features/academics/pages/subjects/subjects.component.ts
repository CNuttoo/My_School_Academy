import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { SubjectDraft } from '../../models/academic.model';
import { AcademicService } from '../../services/academic.service';

@Component({ selector: 'app-subjects', imports: [FormsModule, ReactiveFormsModule], templateUrl: './subjects.component.html', styleUrls: ['../../academics.shared.scss'], changeDetection: ChangeDetectionStrategy.OnPush })
export class SubjectsComponent {
  readonly adding = signal(false);
  readonly query = signal('');
  readonly department = signal('All');
  readonly departments = computed(() => [...new Set(this.academicService.subjects().map((item) => item.department))].sort());
  readonly subjects = computed(() => this.academicService.subjects().filter((item) => `${item.code} ${item.name} ${item.leadTeacher}`.toLowerCase().includes(this.query().toLowerCase()) && (this.department() === 'All' || item.department === this.department())));
  readonly form = this.formBuilder.nonNullable.group({ name: ['', Validators.required], department: ['Mathematics', Validators.required], leadTeacher: ['', Validators.required], gradeLevels: ['', Validators.required], weeklyPeriods: [3, [Validators.required, Validators.min(1)]], status: ['Active' as const, Validators.required] });

  constructor(private readonly formBuilder: FormBuilder, private readonly academicService: AcademicService) {}
  submit(): void { if (this.form.invalid) { this.form.markAllAsTouched(); return; } this.academicService.addSubject(this.form.getRawValue() as SubjectDraft); this.form.reset({ name: '', department: 'Mathematics', leadTeacher: '', gradeLevels: '', weeklyPeriods: 3, status: 'Active' }); this.adding.set(false); }
}
