import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AcademicStatus, CurriculumDraft } from '../../models/academic.model';
import { AcademicService } from '../../services/academic.service';

@Component({ selector: 'app-curriculum', imports: [ReactiveFormsModule], templateUrl: './curriculum.component.html', styleUrls: ['./curriculum.component.scss', '../../academics.shared.scss'], changeDetection: ChangeDetectionStrategy.OnPush })
export class CurriculumComponent {
  readonly adding = signal(false);
  readonly form = this.formBuilder.nonNullable.group({ name: ['', Validators.required], academicYear: ['2026–2027', Validators.required], gradeRange: ['', Validators.required], subjectCount: [10, [Validators.required, Validators.min(1)]], weeklyPeriods: [35, [Validators.required, Validators.min(1)]], status: ['Draft' as AcademicStatus, Validators.required] });

  constructor(private readonly formBuilder: FormBuilder, readonly academicService: AcademicService) {}
  submit(): void { if (this.form.invalid) { this.form.markAllAsTouched(); return; } this.academicService.addCurriculum(this.form.getRawValue() as CurriculumDraft); this.form.reset({ name: '', academicYear: '2026–2027', gradeRange: '', subjectCount: 10, weeklyPeriods: 35, status: 'Draft' }); this.adding.set(false); }
}
