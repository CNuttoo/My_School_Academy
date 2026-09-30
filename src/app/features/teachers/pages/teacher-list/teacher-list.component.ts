import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TeacherFilter, TeacherFilterComponent } from '../../components/teacher-filter/teacher-filter.component';
import { TeacherTableComponent } from '../../components/teacher-table/teacher-table.component';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-teacher-list',
  imports: [RouterLink, TeacherFilterComponent, TeacherTableComponent],
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeacherListComponent {
  private readonly filter = signal<TeacherFilter>({ query: '', department: 'All', status: 'All' });
  readonly departments = computed(() => [...new Set(this.teacherService.teachers().map((teacher) => teacher.department))].sort());
  readonly teachers = computed(() => {
    const filter = this.filter();
    const query = filter.query.toLowerCase();
    return this.teacherService.teachers().filter((teacher) => {
      const searchable = `${teacher.firstName} ${teacher.lastName} ${teacher.employeeNumber} ${teacher.email} ${teacher.primarySubject}`.toLowerCase();
      return searchable.includes(query)
        && (filter.department === 'All' || teacher.department === filter.department)
        && (filter.status === 'All' || teacher.status === filter.status);
    });
  });

  constructor(private readonly teacherService: TeacherService) {}

  updateFilter(filter: TeacherFilter): void {
    this.filter.set(filter);
  }
}
