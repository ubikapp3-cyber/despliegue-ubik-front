# Frontend Backend Integration Configuration

## Overview

This frontend application has been configured to consume the backend API at `https://ubik-back.duckdns.org/`.

## Environment Configuration

The application uses environment-specific configuration files:

### Files Created

1. **src/environments/environment.ts** - Development environment
2. **src/environments/environment.prod.ts** - Production environment

Both environments are configured to use the same backend URL:
```
https://ubik-back.duckdns.org/api
```

## Configuration Details

### Environment Variables

Each environment file exports an `environment` object with:

- `production`: Boolean indicating if this is production build
- `apiUrl`: Base URL for all API calls

### Angular Configuration

The `angular.json` has been configured with file replacements to automatically use the correct environment file based on the build configuration:

- **Development builds**: Uses `environment.ts`
- **Production builds**: Uses `environment.prod.ts`

### HTTP Client Setup

The application has been configured to use Angular's HttpClient:

- `app.config.ts` provides `HttpClient` with `withFetch()` for modern fetch API support
- Available for both client-side and server-side rendering (SSR)

## Usage in Services

To use the API URL in your services, import the environment configuration:

```typescript
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(`${this.apiUrl}/endpoint`);
  }
}
```

## API Endpoints

As per the integration guide, all API endpoints are available at:

```
Base URL: https://ubik-back.duckdns.org/api

Authentication:
- POST /auth/register
- POST /auth/login
- POST /auth/reset-password-request
- POST /auth/reset-password

User Management:
- GET /user
- PUT /user

Motels:
- GET /motels
- GET /motels/{id}
- GET /motels/city/{city}
- POST /motels
- PUT /motels/{id}
- DELETE /motels/{id}

Rooms:
- GET /rooms
- GET /rooms/{id}
- GET /rooms/motel/{motelId}
- GET /rooms/motel/{motelId}/available
- POST /rooms
- PUT /rooms/{id}
- DELETE /rooms/{id}

Services:
- GET /services
- GET /services/{id}
- GET /services/name/{name}
- GET /services/room/{roomId}
- POST /services
- POST /services/room/{roomId}/service/{serviceId}
- PUT /services/{id}
- DELETE /services/{id}
- DELETE /services/room/{roomId}/service/{serviceId}

Reservations:
- GET /reservations
- GET /reservations/{id}
- GET /reservations/room/{roomId}
- GET /reservations/user/{userId}
- GET /reservations/room/{roomId}/active
- GET /reservations/status/{status}
- GET /reservations/room/{roomId}/available
- POST /reservations
- PUT /reservations/{id}
- PATCH /reservations/{id}/confirm
- PATCH /reservations/{id}/cancel
- PATCH /reservations/{id}/checkin
- PATCH /reservations/{id}/checkout
- DELETE /reservations/{id}

Products:
- GET /products
- GET /products/{id}
- POST /products
- PUT /products/{id}
- DELETE /products/{id}
```

## Building and Running

### Development
```bash
npm start
# or
ng serve
```

### Production Build
```bash
npm run build
# or
ng build --configuration production
```

### Server-Side Rendering
```bash
npm run build
npm run serve:ssr:frontend
```

## Next Steps

Now that the environment is configured, you can:

1. Create service implementations based on the integration guide examples
2. Implement authentication interceptors for JWT tokens
3. Create DTOs/interfaces matching the backend API
4. Replace mock services with real HTTP calls

For detailed API documentation and integration examples, see `FRONTEND_INTEGRATION_GUIDE.md`.
