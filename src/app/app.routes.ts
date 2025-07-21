import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { FormInventory } from './pages/form-inventory/form-inventory';
import { authGuard } from './auth-guard'; 
import { NotAuthorizedComponent } from './pages/not-authorized/not-authorized';

export const routes: Routes = [
{    path: '',
    component: Login,
    title: 'Login',
},
{
    path: 'form-inventory',
    component: FormInventory,
    title: 'Form Inventory',
    canActivate: [authGuard] // Ensure AuthGuard is imported and configured
    
},
{
  path: 'not-authorized',
  component: NotAuthorizedComponent,
  title: 'Not Authorized'
}
];
