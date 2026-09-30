import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Teacher } from '../../models/teacher.model';

@Component({
  selector: 'app-teacher-table',
  imports: [RouterLink],
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeacherTableComponent {
  @Input() teachers: readonly Teacher[] = [];

  initials(teacher: Teacher): string {
    return `${teacher.firstName[0]}${teacher.lastName[0]}`;
  }
}
