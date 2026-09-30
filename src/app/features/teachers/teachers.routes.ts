import { Routes } from '@angular/router';

export const TEACHERS_ROUTES: Routes = [
  {
    path: '',
    title: 'Teachers',
    loadComponent: () =>
      import('./pages/teacher-list/teacher-list.component').then(
        (component) => component.TeacherListComponent
      )
  },
  {
    path: 'new',
    title: 'Add teacher',
    data: { breadcrumb: 'Add teacher' },
    loadComponent: () =>
      import('./pages/teacher-form/teacher-form.component').then(
        (component) => component.TeacherFormComponent
      )
  },
  {
    path: ':id/edit',
    title: 'Edit teacher',
    data: { breadcrumb: 'Edit' },
    loadComponent: () =>
      import('./pages/teacher-form/teacher-form.component').then(
        (component) => component.TeacherFormComponent
      )
  },
  {
    path: ':id',
    title: 'Teacher details',
    data: { breadcrumb: 'Details' },
    loadComponent: () =>
      import('./pages/teacher-detail/teacher-detail.component').then(
        (component) => component.TeacherDetailComponent
      )
  }
];
