import { Routes } from '@angular/router';
export const TEACHERS_ROUTES:Routes=[{path:'',data:{title:'Teacher Management',description:'Teacher profiles, assignments, and workload planning will live here.'},loadComponent:()=>import('../../shared/components/page-placeholder/page-placeholder.component').then((component)=>component.PagePlaceholderComponent)}];
