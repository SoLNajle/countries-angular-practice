import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { CountryFormComponent } from './pages/country-form/country-form';
import { authGuard } from './auth-guard';
import { NotAuthorizedComponent } from './pages/not-authorized/not-authorized';

export const routes: Routes = [
  { path: 'login', component: Login, title: 'Login' },
  {
    path: 'country-form',
    component: CountryFormComponent,
    title: 'Country Form',
    canActivate: [authGuard], // Ensure AuthGuard is imported and configured
  },
  {
    path: 'not-authorized',
    component: NotAuthorizedComponent,
    title: 'Not Authorized',
  },
];
