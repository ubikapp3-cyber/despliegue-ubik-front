# API Integration Examples

This directory contains example service implementations that demonstrate how to integrate with the Ubik backend API.

## Overview

These services are **examples** to help you understand how to:
- Use the environment configuration for API URLs
- Make HTTP requests to the backend
- Handle authentication with JWT tokens
- Implement interceptors for automatic token injection
- Type your API requests and responses with TypeScript interfaces

## Files

### `auth.service.ts`
Authentication service demonstrating:
- User registration
- Login and JWT token management
- Password reset functionality
- Token storage in localStorage

### `jwt.interceptor.ts`
HTTP interceptor that:
- Automatically adds JWT token to all requests
- Handles 401 Unauthorized responses
- Redirects to login when token is invalid

### `motel.service.ts`
Motel management service demonstrating:
- CRUD operations for motels
- Public endpoints (no authentication required)
- Authenticated endpoints (requires JWT)
- City-based filtering

### `reservation.service.ts`
Reservation service demonstrating:
- Complete reservation lifecycle management
- Room availability checking
- Status-based filtering
- Date handling with ISO 8601 format

## How to Use These Examples

### 1. Enable the JWT Interceptor

Update your `app.config.ts` to include the JWT interceptor:

```typescript
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './services/api-examples/jwt.interceptor';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([jwtInterceptor])
    )
  ]
};
```

### 2. Use Services in Your Components

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './services/api-examples/auth.service';
import { MotelService } from './services/api-examples/motel.service';

@Component({
  selector: 'app-my-component',
  template: `...`
})
export class MyComponent implements OnInit {
  private authService = inject(AuthService);
  private motelService = inject(MotelService);

  ngOnInit() {
    // Example: Login
    this.authService.login({
      username: 'user@example.com',
      password: 'password'
    }).subscribe({
      next: (token) => {
        this.authService.saveToken(token);
        this.loadMotels();
      },
      error: (error) => console.error('Login failed', error)
    });
  }

  loadMotels() {
    this.motelService.getAllMotels().subscribe({
      next: (motels) => console.log('Motels:', motels),
      error: (error) => console.error('Failed to load motels', error)
    });
  }
}
```

### 3. Replace Mock Services

When you're ready to integrate with the real backend:

1. Remove or rename your mock services
2. Copy these example services to your main services directory
3. Update your components to use the new services
4. Test thoroughly with the backend API

## Important Notes

### Authentication Flow
1. User logs in via `AuthService.login()`
2. JWT token is saved to localStorage
3. `jwtInterceptor` automatically adds token to all subsequent requests
4. On 401 error, user is redirected to login page

### Error Handling
Always implement proper error handling in your components:

```typescript
this.motelService.getMotelById(1).subscribe({
  next: (motel) => {
    // Handle success
  },
  error: (error) => {
    // Handle error
    console.error('Error:', error);
    // Show user-friendly error message
  }
});
```

### Date Handling
When working with dates (especially for reservations):
- Use ISO 8601 format: `2024-12-20T14:00:00`
- Convert JavaScript Date objects: `date.toISOString()`
- Backend expects dates in this format

### TypeScript Interfaces
All interfaces are exported and match the backend DTOs. Use them for type safety:

```typescript
const newReservation: CreateReservationRequest = {
  roomId: 1,
  userId: 1,
  checkInDate: new Date('2024-12-20T14:00:00').toISOString(),
  checkOutDate: new Date('2024-12-21T12:00:00').toISOString(),
  totalPrice: 50000,
  specialRequests: 'High floor please'
};
```

## API Documentation

For complete API documentation, refer to:
- `FRONTEND_INTEGRATION_GUIDE.md` in the frontend root directory
- Backend Swagger documentation (when available)

## Testing

Before deploying to production:
1. Test all authentication flows
2. Verify JWT token handling
3. Test error scenarios (network errors, 401, 404, etc.)
4. Validate all date formats
5. Check that interceptor works correctly

## Migration Checklist

- [ ] Review all example services
- [ ] Enable JWT interceptor in app.config.ts
- [ ] Test authentication flow
- [ ] Replace mock services gradually
- [ ] Update component dependencies
- [ ] Test all API integrations
- [ ] Handle loading states in UI
- [ ] Implement error handling
- [ ] Test with real backend API
- [ ] Update documentation

## Support

For questions about:
- API endpoints and responses: See `FRONTEND_INTEGRATION_GUIDE.md`
- Environment configuration: See `BACKEND_CONFIG.md`
- Backend issues: Contact backend team
