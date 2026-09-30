import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Teacher, TeacherDraft, TeacherStatus } from '../../models/teacher.model';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-teacher-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeacherFormComponent {
  readonly departments = ['Arts', 'Humanities', 'Languages', 'Mathematics', 'Physical Education', 'Science'];
  readonly teacherId: string | null;
  readonly existingTeacher: Teacher | undefined;
  submitted = false;
  readonly form = this.formBuilder.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    department: ['Mathematics', Validators.required],
    primarySubject: ['', Validators.required],
    homeroom: ['Not assigned', Validators.required],
    joinDate: ['', Validators.required],
    status: ['Active' as TeacherStatus, Validators.required]
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    route: ActivatedRoute,
    private readonly router: Router,
    private readonly teacherService: TeacherService
  ) {
    this.teacherId = route.snapshot.paramMap.get('id');
    this.existingTeacher = this.teacherId ? teacherService.getById(this.teacherId) : undefined;
    if (this.existingTeacher) {
      const { id: _id, employeeNumber: _employeeNumber, ...draft } = this.existingTeacher;
      this.form.patchValue(draft);
    }
  }

  get title(): string {
    return this.teacherId ? 'Edit teacher' : 'Add new teacher';
  }

  submit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const saved = this.teacherService.save(this.form.getRawValue() as TeacherDraft, this.teacherId ?? undefined);
    void this.router.navigate(['/teachers', saved.id]);
  }
}
