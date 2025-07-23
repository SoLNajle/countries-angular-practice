import { Component, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Logout } from '../logout/logout';
@Component({
  selector: 'app-menu',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    Logout,
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  standalone: true,
})
export class Menu {
  router = inject(Router);
  loginService = inject(LoginService);
  isAuthenticated = computed(() => this.loginService.isAuthenticatedSignal());
}
