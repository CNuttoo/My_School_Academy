import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { AssessmentDraft, AssessmentStatus, AssessmentType } from '../../models/grade.model';
import { GradeService } from '../../services/grade.service';

@Component({ selector: 'app-assessments', imports: [FormsModule, ReactiveFormsModule], templateUrl: './assessments.component.html', styleUrls: ['../../grades.shared.scss'], changeDetection: ChangeDetectionStrategy.OnPush })
export class AssessmentsComponent {
  readonly adding = signal(false); readonly query = signal(''); readonly status = signal('All');
  readonly assessments = computed(() => this.gradeService.assessments().filter((item) => `${item.title} ${item.subject} ${item.className}`.toLowerCase().includes(this.query().toLowerCase()) && (this.status() === 'All' || item.status === this.status())));
  readonly form = this.formBuilder.nonNullable.group({ title: ['', Validators.required], subject: ['Mathematics', Validators.required], className: ['Grade 10A', Validators.required], type: ['Quiz' as AssessmentType, Validators.required], maxScore: [100, [Validators.required, Validators.min(1)]], weight: [10, [Validators.required, Validators.min(1), Validators.max(100)]], dueDate: ['', Validators.required], status: ['Draft' as AssessmentStatus, Validators.required] });
  constructor(private readonly formBuilder: FormBuilder, readonly gradeService: GradeService) {}
  submit(): void { if (this.form.invalid) { this.form.markAllAsTouched(); return; } this.gradeService.addAssessment(this.form.getRawValue() as AssessmentDraft); this.form.reset({ title: '', subject: 'Mathematics', className: 'Grade 10A', type: 'Quiz', maxScore: 100, weight: 10, dueDate: '', status: 'Draft' }); this.adding.set(false); }
}
