import { Injectable } from '@angular/core';
import { User } from '../pages/login/interfaces/user'; 

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = 'http://localhost:3000/users';
  private isAuthenticated: boolean = false
  constructor() {}

  authenticate(email: string, password: string): Promise<boolean> {
    return this.getUserByEmail(email).then(user => {
      if (user) {
        this.isAuthenticated = true;
        return user.password === password;
      }
      this.isAuthenticated = false;
      return false;
    });
  }

  getAllUsers(): Promise<User[]> {
    return fetch(this.url)
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching users:', error);
        throw error;
      });
  }

  getUserByEmail(email: string): Promise<User | null> {
    return fetch(`${this.url}?email=${email}`)
      .then(response => response.json())
      .then(users => users.length > 0 ? users[0] : null)
      .catch(error => {
        console.error('Error fetching user by email:', error);
        throw error;
      });
  }

  setIsAuthenticated(value: boolean): void {
    this.isAuthenticated = value;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}