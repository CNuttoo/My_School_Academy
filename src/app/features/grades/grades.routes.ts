import { Routes } from '@angular/router';

export const GRADES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/grades-shell.component').then((component) => component.GradesShellComponent),
    children: [
      { path: '', pathMatch: 'full', title: 'Grades overview', loadComponent: () => import('./pages/grades-overview/grades-overview.component').then((component) => component.GradesOverviewComponent) },
      { path: 'gradebook', title: 'Gradebook', data: { breadcrumb: 'Gradebook' }, loadComponent: () => import('./pages/gradebook/gradebook.component').then((component) => component.GradebookComponent) },
      { path: 'assessments', title: 'Assessments', data: { breadcrumb: 'Assessments' }, loadComponent: () => import('./pages/assessments/assessments.component').then((component) => component.AssessmentsComponent) },
      { path: 'report-cards', title: 'Report cards', data: { breadcrumb: 'Report cards' }, loadComponent: () => import('./pages/report-cards/report-cards.component').then((component) => component.ReportCardsComponent) }
    ]
  }
];
