import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-academic-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './academic-shell.component.html',
  styleUrls: ['./academic-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcademicShellComponent {
  readonly sections = [
    { label: 'Overview', route: '/academics', exact: true },
    { label: 'Classrooms', route: '/academics/classrooms', exact: false },
    { label: 'Subjects', route: '/academics/subjects', exact: false },
    { label: 'Curriculum', route: '/academics/curriculum', exact: false },
    { label: 'Timetable', route: '/academics/timetable', exact: false }
  ];
}
