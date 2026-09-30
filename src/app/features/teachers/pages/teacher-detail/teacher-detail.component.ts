import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Teacher } from '../../models/teacher.model';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-teacher-detail',
  imports: [RouterLink],
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeacherDetailComponent {
  readonly teacher: Teacher | undefined;

  constructor(route: ActivatedRoute, teacherService: TeacherService) {
    this.teacher = teacherService.getById(route.snapshot.paramMap.get('id') ?? '');
  }

  get initials(): string {
    return this.teacher ? `${this.teacher.firstName[0]}${this.teacher.lastName[0]}` : '';
  }
}
