import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AcademicService } from '../../services/academic.service';

@Component({
  selector: 'app-academic-overview',
  imports: [RouterLink],
  templateUrl: './academic-overview.component.html',
  styleUrls: ['./academic-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcademicOverviewComponent {
  readonly activeClassrooms = computed(() => this.academicService.classrooms().filter((item) => item.status === 'Active').length);
  readonly enrolledStudents = computed(() => this.academicService.classrooms().reduce((total, item) => total + item.studentCount, 0));
  readonly activeSubjects = computed(() => this.academicService.subjects().filter((item) => item.status === 'Active').length);
  readonly activeCurricula = computed(() => this.academicService.curricula().filter((item) => item.status === 'Active').length);

  constructor(readonly academicService: AcademicService) {}
}
