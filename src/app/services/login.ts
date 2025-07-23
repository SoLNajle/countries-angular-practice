import { signal, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'http://localhost:3000/users';
  private isAuthenticated = signal(false);
  readonly isAuthenticatedSignal = this.isAuthenticated.asReadonly();

  authenticate(email: string, password: string): Promise<boolean> {
    return this.getUserByEmail(email).then((user) => {
      console.log('User found:', user);
      if (user?.password === password) {
        this.isAuthenticated.set(true);
        return user.password === password;
      }
      this.isAuthenticated.set(false);
      return false;
    });
  }

  getAllUsers(): Promise<User[]> {
    return fetch(this.url)
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error fetching users:', error);
        throw error;
      });
  }

  getUserByEmail(email: string): Promise<User | null> {
    return fetch(`${this.url}?email=${email}`)
      .then((response) => response.json())
      .then((users) => (users.length > 0 ? users[0] : null))
      .catch((error) => {
        console.error('Error fetching user by email:', error);
        throw error;
      });
  }

  setIsAuthenticated(value: boolean): void {
    this.isAuthenticated.set(value);
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated();
  }

  logout(): void {
    this.setIsAuthenticated(false);
    console.log('User logged out');
  }
}
