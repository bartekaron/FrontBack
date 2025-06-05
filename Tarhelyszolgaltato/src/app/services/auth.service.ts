import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenName = environment.tokenName;
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {}

  private hasToken(): boolean {
    const token = localStorage.getItem(this.tokenName);
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenName);
  }

  login(token: string, user: any) {
    localStorage.setItem(this.tokenName, token);
    localStorage.setItem('user', JSON.stringify(user));
    this.isLoggedInSubject.next(true);
  }

  logout() {
    localStorage.removeItem(this.tokenName);
    localStorage.removeItem('user');
    this.isLoggedInSubject.next(false);
  }

  loggedUser() {
    const token = localStorage.getItem(this.tokenName);
    if (token) {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const decodedUTF8Payload = new TextDecoder('utf-8').decode(
        new Uint8Array(decodedPayload.split('').map(char => char.charCodeAt(0)))
      );
      return JSON.parse(decodedUTF8Payload);
    }
    return null;
  }

  isAdmin(): boolean {
    const user = this.loggedUser();
    return user ? user.role === 'admin' : false;
  }
}
