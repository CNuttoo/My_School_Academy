import { Routes } from '@angular/router';
export const NOTIFICATIONS_ROUTES:Routes=[{path:'',data:{title:'Notifications',description:'School announcements and personal notifications will appear here.'},loadComponent:()=>import('../../shared/components/page-placeholder/page-placeholder.component').then((component)=>component.PagePlaceholderComponent)}];
