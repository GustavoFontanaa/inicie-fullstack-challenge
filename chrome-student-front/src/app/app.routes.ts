import { Routes } from '@angular/router';
import { StudentFormComponent } from './pages/student-form/student-form.component';
import { FirstAccessComponent } from './pages/first-access/first-access.component';
import { ChatComponent } from './pages/chat/chat.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
  },
  { path: 'first-access', component: FirstAccessComponent },

  {
    path: 'students',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/student-list/student-list.component').then(m => m.StudentListComponent),
  },
  { path: 'students/new', component: StudentFormComponent },
  { path: 'students/:id/edit', component: StudentFormComponent },

  { path: 'chat', component: ChatComponent },

  {
    path: '**',
    redirectTo: 'students',
  }
];
