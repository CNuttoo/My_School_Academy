import { Routes } from '@angular/router';

export const SETTINGS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/settings-shell.component').then((component) => component.SettingsShellComponent),
    children: [
      { path: '', pathMatch: 'full', title: 'Settings overview', loadComponent: () => import('./pages/settings-overview/settings-overview.component').then((component) => component.SettingsOverviewComponent) },
      { path: 'school', title: 'School profile', data: { breadcrumb: 'School profile' }, loadComponent: () => import('./pages/school-profile/school-profile.component').then((component) => component.SchoolProfileComponent) },
      { path: 'users', title: 'Users', data: { breadcrumb: 'Users' }, loadComponent: () => import('./pages/user-management/user-management.component').then((component) => component.UserManagementComponent) },
      { path: 'roles', title: 'Roles and permissions', data: { breadcrumb: 'Roles & permissions' }, loadComponent: () => import('./pages/roles-permissions/roles-permissions.component').then((component) => component.RolesPermissionsComponent) }
    ]
  }
];
