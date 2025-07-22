import { inject, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { LoginService } from '../../services/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [MatButton],
  templateUrl: './logout.html',
  styleUrl: './logout.scss',
})
export class Logout {
  private loginService = inject(LoginService);
  private router = inject(Router);

  logout() {
    this.loginService.logout();
    // Redirect to login or home page
    this.router.navigate(['/login']);
  }
}
