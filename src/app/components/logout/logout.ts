import { inject, Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { LoginService } from '../../services/login';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-logout',
  imports: [MatIcon, MatTooltip],
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
