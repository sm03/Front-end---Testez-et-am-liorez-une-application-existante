import { Routes } from '@angular/router';
import {RegisterComponent} from './pages/register/register.component';
import {AppComponent} from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { StudentListComponent } from './pages/students/student-list/student-list.component';
import { authGuard } from './core/guards/auth.gards';
import { StudentAddComponent } from './pages/students/student-add/student-add.component';
import { StudentDetailComponent } from './pages/students/student-detail/student-detail.component';
import { StudentEditComponent } from './pages/students/student-edit/student-edit.component';
import { StudentDeleteComponent } from './pages/students/student-delete/student-delete.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
/*  {
    path: 'login',
    component: LoginComponent
  }
*/{ 
    path: 'login', 
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) 
  },
  {
    path: 'students',
    canActivate: [authGuard],
    children: [
      { path: '', component: StudentListComponent },
      { path: 'add', component: StudentAddComponent },
      { path: ':id', component: StudentDetailComponent },
      { path: 'edit/:id', component: StudentEditComponent },
      { path: 'delete/:id', component: StudentDeleteComponent }
    ]
  },
  { 
    path: '', 
    redirectTo: 'students', 
    pathMatch: 'full' 
  }
];
