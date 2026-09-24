import { Routes } from '@angular/router';
export const ACADEMICS_ROUTES:Routes=[{path:'',data:{title:'Academic Management',description:'Academic years, classrooms, subjects, curriculum, and schedules will be organized here.'},loadComponent:()=>import('../../shared/components/page-placeholder/page-placeholder.component').then((component)=>component.PagePlaceholderComponent)}];
