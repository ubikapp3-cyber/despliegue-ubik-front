# Quick Start: Backend Integration

## ✅ What's Been Configured

The frontend is now ready to consume the backend API at `https://ubik-back.duckdns.org/`.

### Files Added/Modified:

1. **Environment Configuration**
   - ✅ `src/environments/environment.ts` - Development config
   - ✅ `src/environments/environment.prod.ts` - Production config
   - ✅ Both pointing to: `https://ubik-back.duckdns.org/api`

2. **Angular Configuration**
   - ✅ `angular.json` - File replacements for production builds
   - ✅ `app.config.ts` - HttpClient provider with fetch support

3. **Example Services** (in `src/app/services/api-examples/`)
   - ✅ `auth.service.ts` - Authentication with JWT
   - ✅ `motel.service.ts` - Motel management
   - ✅ `reservation.service.ts` - Reservation management
   - ✅ `jwt.interceptor.ts` - Automatic JWT token injection

4. **Documentation**
   - ✅ `BACKEND_CONFIG.md` - Configuration details
   - ✅ `src/app/services/api-examples/README.md` - Example usage
   - ✅ `FRONTEND_INTEGRATION_GUIDE.md` - Complete API reference (existing)

## 🚀 How to Use

### Option 1: Use Example Services Directly

Copy the example services to your main services directory:

```bash
# From frontend directory
cp -r src/app/services/api-examples/* src/app/services/
```

### Option 2: Adapt Existing Services

Update your existing services to use the environment configuration:

```typescript
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MyService {
  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) {}
  
  getData() {
    return this.http.get(`${this.apiUrl}/endpoint`);
  }
}
```

### Enable JWT Interceptor

Update `src/app/app.config.ts`:

```typescript
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './services/api-examples/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... other providers
    provideHttpClient(
      withFetch(),
      withInterceptors([jwtInterceptor])  // Add this line
    )
  ]
};
```

## 📝 Key Points

### Backend URL
- **Development**: `https://ubik-back.duckdns.org/api`
- **Production**: `https://ubik-back.duckdns.org/api`

### Authentication
1. Login via `/auth/login` returns a JWT token
2. Store token in localStorage: `localStorage.setItem('auth_token', token)`
3. JWT interceptor automatically adds token to requests
4. Token format: `Authorization: Bearer <token>`

### Public vs Protected Endpoints
- **Public** (no auth): `/auth/*`, `/motels`
- **Protected** (requires JWT): `/user/*`, `/rooms/*`, `/services/*`, `/reservations/*`, `/products/*`

## 📚 Documentation Reference

| Document | Purpose |
|----------|---------|
| `BACKEND_CONFIG.md` | Environment configuration details |
| `src/app/services/api-examples/README.md` | How to use example services |
| `FRONTEND_INTEGRATION_GUIDE.md` | Complete API specification |

## 🧪 Testing Your Integration

### 1. Test Authentication

```typescript
// In your component
constructor(private authService: AuthService) {}

login() {
  this.authService.login({ 
    username: 'test', 
    password: 'test123' 
  }).subscribe({
    next: (token) => {
      this.authService.saveToken(token);
      console.log('Login successful!');
    },
    error: (err) => console.error('Login failed:', err)
  });
}
```

### 2. Test API Calls

```typescript
// Get all motels (public endpoint)
this.motelService.getAllMotels().subscribe({
  next: (motels) => console.log('Motels:', motels),
  error: (err) => console.error('Error:', err)
});

// Check room availability (requires auth)
this.reservationService.checkRoomAvailability(
  1,  // roomId
  new Date('2024-12-20'),
  new Date('2024-12-21')
).subscribe({
  next: (available) => console.log('Available:', available),
  error: (err) => console.error('Error:', err)
});
```

## 🔧 Build Commands

```bash
# Development
npm start

# Production build
npm run build

# SSR build and serve
npm run build
npm run serve:ssr:frontend
```

## ⚠️ Important Notes

1. **Mock Services**: The existing mock services in `src/app/services/motel/` and `src/app/services/user/` are still active. You can:
   - Replace them with the real services
   - Keep them for development/testing
   - Use feature flags to switch between mock and real services

2. **Error Handling**: Always implement error handling in your components for a better user experience.

3. **CORS**: The backend is configured to accept requests from any origin in development.

4. **HTTPS**: The backend uses HTTPS, which is secure for production.

## 🎯 Next Steps

1. ✅ Configuration is complete
2. ⏭️ Test authentication flow
3. ⏭️ Replace mock services with real API calls
4. ⏭️ Implement error handling in UI
5. ⏭️ Add loading states
6. ⏭️ Test all features with real backend

## 🆘 Troubleshooting

### "Cannot connect to backend"
- Verify backend is running at `https://ubik-back.duckdns.org/`
- Check browser console for CORS errors
- Verify network connectivity

### "401 Unauthorized"
- Check if JWT token is present: `localStorage.getItem('auth_token')`
- Verify token hasn't expired
- Try logging in again

### "404 Not Found"
- Verify endpoint URL matches the integration guide
- Check that all URLs start with `/api/`

For more details, see the complete documentation in `FRONTEND_INTEGRATION_GUIDE.md`.
