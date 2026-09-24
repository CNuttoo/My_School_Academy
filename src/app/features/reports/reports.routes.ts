import { Routes } from '@angular/router';
export const REPORTS_ROUTES:Routes=[{path:'',data:{title:'Reports',description:'Configurable academic and operational reports will be available here.'},loadComponent:()=>import('../../shared/components/page-placeholder/page-placeholder.component').then((component)=>component.PagePlaceholderComponent)}];
