import { Routes } from '@angular/router';

export const ATTENDANCE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/attendance-shell.component').then((component) => component.AttendanceShellComponent),
    children: [
      { path: '', pathMatch: 'full', title: 'Attendance overview', loadComponent: () => import('./pages/attendance-overview/attendance-overview.component').then((component) => component.AttendanceOverviewComponent) },
      { path: 'take', title: 'Take attendance', data: { breadcrumb: 'Take attendance' }, loadComponent: () => import('./pages/take-attendance/take-attendance.component').then((component) => component.TakeAttendanceComponent) },
      { path: 'records', title: 'Attendance records', data: { breadcrumb: 'Records' }, loadComponent: () => import('./pages/attendance-records/attendance-records.component').then((component) => component.AttendanceRecordsComponent) }
    ]
  }
];
