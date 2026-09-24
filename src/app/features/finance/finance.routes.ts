import { Routes } from '@angular/router';
export const FINANCE_ROUTES:Routes=[{path:'',data:{title:'Finance',description:'Fees, invoices, payments, and financial summaries will be managed here.'},loadComponent:()=>import('../../shared/components/page-placeholder/page-placeholder.component').then((component)=>component.PagePlaceholderComponent)}];
