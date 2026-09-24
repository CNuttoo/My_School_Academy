import { Routes } from '@angular/router';
export const ATTENDANCE_ROUTES:Routes=[{path:'',data:{title:'Attendance',description:'Daily attendance recording, review, and follow-up workflows will be built here.'},loadComponent:()=>import('../../shared/components/page-placeholder/page-placeholder.component').then((component)=>component.PagePlaceholderComponent)}];
