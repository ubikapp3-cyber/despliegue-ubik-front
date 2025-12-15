import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpHandlerFn
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { inject as injectFn } from '@angular/core';
import { Router } from '@angular/router';

/**
 * JWT Interceptor Function
 * 
 * This interceptor automatically adds the JWT token to all HTTP requests
 * and handles 401 Unauthorized responses by redirecting to login.
 * 
 * Usage: Add to app.config.ts providers:
 * provideHttpClient(
 *   withFetch(),
 *   withInterceptors([jwtInterceptor])
 * )
 */
export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const router = injectFn(Router);
  
  // Get token from localStorage
  const token = localStorage.getItem('auth_token');
  
  // Clone request and add authorization header if token exists
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Handle the request and catch errors
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Token is invalid or expired, clear it and redirect to login
        localStorage.removeItem('auth_token');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
