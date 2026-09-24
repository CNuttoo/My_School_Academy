import { Routes } from '@angular/router';
export const GRADES_ROUTES:Routes=[{path:'',data:{title:'Grades',description:'Assessments, scores, grading periods, and report cards will be managed here.'},loadComponent:()=>import('../../shared/components/page-placeholder/page-placeholder.component').then((component)=>component.PagePlaceholderComponent)}];
