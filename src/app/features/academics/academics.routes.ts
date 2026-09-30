import { Routes } from '@angular/router';

export const ACADEMICS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/academic-shell.component').then((component) => component.AcademicShellComponent),
    children: [
      { path: '', pathMatch: 'full', title: 'Academic overview', loadComponent: () => import('./pages/academic-overview/academic-overview.component').then((component) => component.AcademicOverviewComponent) },
      { path: 'classrooms', title: 'Classrooms', data: { breadcrumb: 'Classrooms' }, loadComponent: () => import('./pages/classrooms/classrooms.component').then((component) => component.ClassroomsComponent) },
      { path: 'subjects', title: 'Subjects', data: { breadcrumb: 'Subjects' }, loadComponent: () => import('./pages/subjects/subjects.component').then((component) => component.SubjectsComponent) },
      { path: 'curriculum', title: 'Curriculum', data: { breadcrumb: 'Curriculum' }, loadComponent: () => import('./pages/curriculum/curriculum.component').then((component) => component.CurriculumComponent) },
      { path: 'timetable', title: 'Timetable', data: { breadcrumb: 'Timetable' }, loadComponent: () => import('./pages/timetable/timetable.component').then((component) => component.TimetableComponent) }
    ]
  }
];
