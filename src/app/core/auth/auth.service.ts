import { Injectable, signal } from '@angular/core';

const AUTH_STORAGE_KEY = 'school-demo-auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly authenticatedState = signal(this.readStoredSession());
  readonly authenticated = this.authenticatedState.asReadonly();

  isAuthenticated(): boolean {
    return this.authenticatedState();
  }

  signIn(): void {
    sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
    this.authenticatedState.set(true);
  }

  signOut(): void {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    this.authenticatedState.set(false);
  }

  private readStoredSession(): boolean {
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  }
}
