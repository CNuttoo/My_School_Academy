import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { ClassroomDraft } from '../../models/academic.model';
import { AcademicService } from '../../services/academic.service';

@Component({ selector: 'app-classrooms', imports: [FormsModule, ReactiveFormsModule], templateUrl: './classrooms.component.html', styleUrls: ['../../academics.shared.scss'], changeDetection: ChangeDetectionStrategy.OnPush })
export class ClassroomsComponent {
  readonly adding = signal(false);
  readonly query = signal('');
  readonly status = signal<'All' | 'Active' | 'Inactive'>('All');
  readonly classrooms = computed(() => this.academicService.classrooms().filter((item) => `${item.name} ${item.room} ${item.homeroomTeacher}`.toLowerCase().includes(this.query().toLowerCase()) && (this.status() === 'All' || item.status === this.status())));
  readonly form = this.formBuilder.nonNullable.group({ name: ['', Validators.required], grade: ['Grade 7', Validators.required], section: ['A', Validators.required], room: ['', Validators.required], homeroomTeacher: ['', Validators.required], studentCount: [0, [Validators.required, Validators.min(0)]], capacity: [30, [Validators.required, Validators.min(1)]], status: ['Active' as const, Validators.required] });

  constructor(private readonly formBuilder: FormBuilder, private readonly academicService: AcademicService) {}

  submit(): void { if (this.form.invalid) { this.form.markAllAsTouched(); return; } this.academicService.addClassroom(this.form.getRawValue() as ClassroomDraft); this.form.reset({ name: '', grade: 'Grade 7', section: 'A', room: '', homeroomTeacher: '', studentCount: 0, capacity: 30, status: 'Active' }); this.adding.set(false); }
}
