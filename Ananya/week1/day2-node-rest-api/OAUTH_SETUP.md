# OAuth Setup Guide

This guide explains how to set up and use the Google OAuth 2.0 authentication in this Node.js REST API.

## Overview

The OAuth implementation uses:
- **Passport.js** - Authentication middleware
- **passport-google-oauth20** - Google OAuth strategy
- **express-session** - Session management for OAuth flow

## Installation

1. Install dependencies:
```bash
npm install
```

All required packages are already listed in `package.json`:
- passport
- passport-google-oauth20
- express-session
- jsonwebtoken
- dotenv

## Google OAuth Configuration

### Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Go to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Choose "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/google/callback` (for development)
   - Your production URL (when deploying)
7. Copy the Client ID and Client Secret

### Step 2: Set Environment Variables

1. Create a `.env` file in the project root (copy from `.env.example`):
```bash
cp .env.example .env
```

2. Add your Google credentials to `.env`:
```
GOOGLE_CLIENT_ID=your_client_id_from_google_console
GOOGLE_CLIENT_SECRET=your_client_secret_from_google_console
JWT_SECRET=your_secure_jwt_secret_key
SESSION_SECRET=your_secure_session_secret_key
```

## API Endpoints

### 1. Standard Login (Username/Password)
```
POST /api/auth/login
Body: {
  "username": "Ananya",
  "password": "Ananya@123"
}
Response: {
  "success": true,
  "message": "login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### 2. Google OAuth Login
```
GET /api/auth/google
```
- Redirects to Google login page
- User authenticates with Google
- Gets redirected to callback URL

### 3. Google OAuth Callback
```
GET /api/auth/google/callback
```
- Handles Google's OAuth response
- Creates session and JWT token
- Returns authentication token

## Usage Flow

### Client-Side OAuth Flow

1. **Initiate Login:**
```html
<a href="http://localhost:3000/api/auth/google">
  Sign in with Google
</a>
```

2. **After Authentication:**
   - User is redirected to Google's login page
   - User grants permissions
   - User is redirected to `/api/auth/google/callback`
   - JWT token is returned in the response

3. **Use the Token:**
   - Store the token in localStorage/sessionStorage
   - Include in subsequent API requests:
   ```javascript
   headers: {
     'Authorization': 'Bearer ' + token
   }
   ```

## Security Features

1. **Session Management**
   - Secure HTTP-only cookies
   - Session timeout: 24 hours
   - Secret-based session signing

2. **JWT Tokens**
   - Signed with JWT_SECRET
   - Contains user ID, username, and role
   - Expires in 1 hour (configurable in authController.js)

3. **Rate Limiting**
   - Auth routes limited via `authLimiter` middleware
   - Prevents brute force attacks

4. **Environment Variables**
   - Sensitive credentials stored in .env
   - .env file is in .gitignore (not committed to git)

## File Structure

```
src/
├── config/
│   └── passport.js          # Passport configuration with Google strategy
├── controllers/
│   └── authController.js    # Authentication logic
├── routes/
│   └── authRouter.js        # Auth endpoints
├── middleware/
│   ├── authMiddleware.js    # JWT verification
│   └── rateLimiter.js       # Rate limiting
└── app.js                   # Main app with passport/session setup
```

## Key Components

### 1. Passport Configuration (`config/passport.js`)
- Defines Google OAuth strategy
- Serializes/deserializes user for sessions
- Extracts user info from Google profile

### 2. Auth Routes (`routes/authRouter.js`)
- `GET /api/auth/google` - Initiates OAuth flow
- `GET /api/auth/google/callback` - Handles callback
- `POST /api/auth/login` - Standard login

### 3. Auth Controller (`controllers/authController.js`)
- `login()` - Handles standard username/password login
- `googleCallback()` - Processes successful Google OAuth

### 4. App Setup (`app.js`)
- Session middleware configuration
- Passport initialization
- Route mounting

## Testing

### Test with cURL:
```bash
# Test standard login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"Ananya","password":"Ananya@123"}'

# Initiate Google OAuth
curl -L http://localhost:3000/api/auth/google
```

## Troubleshooting

### Issue: "Callback URL mismatch"
- **Solution:** Ensure the redirect URI in Google Console exactly matches your callback URL

### Issue: "GOOGLE_CLIENT_ID is undefined"
- **Solution:** Check that .env file exists and contains correct values

### Issue: "Session not working"
- **Solution:** Verify SESSION_SECRET is set in .env file

## Next Steps

1. Install dependencies: `npm install`
2. Set up Google OAuth credentials
3. Create .env file with credentials
4. Run the server: `npm start`
5. Test OAuth flow by visiting `http://localhost:3000/api/auth/google`

## Additional Resources

- [Passport.js Documentation](http://www.passportjs.org/)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Express Session Documentation](https://github.com/expressjs/session)
