import { Routes } from '@angular/router';
export const SETTINGS_ROUTES:Routes=[{path:'',data:{title:'Settings',description:'School profile, roles, permissions, and application preferences will be configured here.'},loadComponent:()=>import('../../shared/components/page-placeholder/page-placeholder.component').then((component)=>component.PagePlaceholderComponent)}];
