import { Routes } from '@angular/router';
export const AUTH_ROUTES: Routes = [{ path:'', title:'Sign in', loadComponent:()=>import('./pages/login/login.component').then((component)=>component.LoginComponent) }];
