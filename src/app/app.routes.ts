import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { CountryFormComponent } from './pages/country-form/country-form';
import { authGuard } from './auth-guard';
import { NotAuthorizedComponent } from './pages/not-authorized/not-authorized';
import { CountryMap } from './pages/country-map/country-map';

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
  {
    path: 'map',
    component: CountryMap,
    title: 'Country Map',
    canActivate: [authGuard], // Ensure AuthGuard is imported and configured
  },
];
