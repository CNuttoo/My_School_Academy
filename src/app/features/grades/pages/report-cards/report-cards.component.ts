import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ReportStatus } from '../../models/grade.model';
import { GradeService } from '../../services/grade.service';

@Component({ selector: 'app-report-cards', imports: [FormsModule, ReactiveFormsModule], templateUrl: './report-cards.component.html', styleUrls: ['./report-cards.component.scss', '../../grades.shared.scss'], changeDetection: ChangeDetectionStrategy.OnPush })
export class ReportCardsComponent {
  readonly generating = signal(false); readonly status = signal('All');
  readonly reports = computed(() => this.gradeService.reports().filter((item) => this.status() === 'All' || item.status === this.status()));
  readonly form = this.formBuilder.nonNullable.group({ studentId: [this.gradeService.students[0].id, Validators.required], term: ['Term 1 · 2026–2027', Validators.required], status: ['Draft' as ReportStatus, Validators.required] });
  constructor(private readonly formBuilder: FormBuilder, readonly gradeService: GradeService) {}
  submit(): void { if (this.form.invalid) return; const value = this.form.getRawValue(); this.gradeService.generateReport(value.studentId, value.term, value.status); this.generating.set(false); }
}
