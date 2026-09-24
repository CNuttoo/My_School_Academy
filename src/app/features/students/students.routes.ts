import { Routes } from '@angular/router';
export const STUDENTS_ROUTES:Routes=[
  {path:'',title:'Students',loadComponent:()=>import('./pages/student-list/student-list.component').then((component)=>component.StudentListComponent)},
  {path:'new',title:'Add student',data:{breadcrumb:'Add student'},loadComponent:()=>import('./pages/student-form/student-form.component').then((component)=>component.StudentFormComponent)},
  {path:':id/edit',title:'Edit student',data:{breadcrumb:'Edit'},loadComponent:()=>import('./pages/student-form/student-form.component').then((component)=>component.StudentFormComponent)},
  {path:':id',title:'Student details',data:{breadcrumb:'Details'},loadComponent:()=>import('./pages/student-detail/student-detail.component').then((component)=>component.StudentDetailComponent)}
];
