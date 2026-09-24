import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/auth/auth.routes').then((routes) => routes.AUTH_ROUTES)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/main-layout/main-layout.component').then((component) => component.MainLayoutComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', title: 'Dashboard', data: { breadcrumb: 'Dashboard' }, loadChildren: () => import('./features/dashboard/dashboard.routes').then((routes) => routes.DASHBOARD_ROUTES) },
      { path: 'students', data: { breadcrumb: 'Students' }, loadChildren: () => import('./features/students/students.routes').then((routes) => routes.STUDENTS_ROUTES) },
      { path: 'teachers', title: 'Teachers', data: { breadcrumb: 'Teachers' }, loadChildren: () => import('./features/teachers/teachers.routes').then((routes) => routes.TEACHERS_ROUTES) },
      { path: 'academics', title: 'Academic', data: { breadcrumb: 'Academic' }, loadChildren: () => import('./features/academics/academics.routes').then((routes) => routes.ACADEMICS_ROUTES) },
      { path: 'attendance', title: 'Attendance', data: { breadcrumb: 'Attendance' }, loadChildren: () => import('./features/attendance/attendance.routes').then((routes) => routes.ATTENDANCE_ROUTES) },
      { path: 'grades', title: 'Grades', data: { breadcrumb: 'Grades' }, loadChildren: () => import('./features/grades/grades.routes').then((routes) => routes.GRADES_ROUTES) },
      { path: 'finance', title: 'Finance', data: { breadcrumb: 'Finance' }, loadChildren: () => import('./features/finance/finance.routes').then((routes) => routes.FINANCE_ROUTES) },
      { path: 'reports', title: 'Reports', data: { breadcrumb: 'Reports' }, loadChildren: () => import('./features/reports/reports.routes').then((routes) => routes.REPORTS_ROUTES) },
      { path: 'notifications', title: 'Notifications', data: { breadcrumb: 'Notifications' }, loadChildren: () => import('./features/notifications/notifications.routes').then((routes) => routes.NOTIFICATIONS_ROUTES) },
      { path: 'settings', title: 'Settings', data: { breadcrumb: 'Settings' }, loadChildren: () => import('./features/settings/settings.routes').then((routes) => routes.SETTINGS_ROUTES) }
    ]
  },
  { path: '**', redirectTo: '' }
];
