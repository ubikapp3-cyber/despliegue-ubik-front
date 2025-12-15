import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Authentication Service Example
 * 
 * This service demonstrates how to integrate with the backend authentication API.
 * Based on the FRONTEND_INTEGRATION_GUIDE.md specifications.
 */

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  anonymous: boolean;
  roleId: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface ResetPasswordRequest {
  email: string;
  token: string;
  newPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  /**
   * Register a new user
   * @param userData User registration data
   * @returns Observable with success message
   */
  register(userData: RegisterRequest): Observable<string> {
    return this.http.post(`${this.apiUrl}/register`, userData, {
      responseType: 'text'
    });
  }

  /**
   * Login user and get JWT token
   * @param credentials User credentials
   * @returns Observable with JWT token
   */
  login(credentials: LoginRequest): Observable<string> {
    return this.http.post(`${this.apiUrl}/login`, credentials, {
      responseType: 'text'
    });
  }

  /**
   * Request password reset
   * @param email User email
   * @returns Observable with response
   */
  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/reset-password-request`,
      null,
      { params: { email } }
    );
  }

  /**
   * Reset password with token
   * @param data Reset password data
   * @returns Observable with response
   */
  resetPassword(data: ResetPasswordRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, data);
  }

  /**
   * Save token to localStorage
   * @param token JWT token
   */
  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  /**
   * Get token from localStorage
   * @returns JWT token or null
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Remove token from localStorage
   */
  removeToken(): void {
    localStorage.removeItem('auth_token');
  }

  /**
   * Check if user is authenticated
   * @returns true if token exists
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
