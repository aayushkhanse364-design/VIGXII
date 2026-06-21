# VIGXII Visuals Co. - Frontend Setup Guide

## Overview
Dynamic portfolio website with Firebase authentication and backend API integration. Built with React 18, TypeScript, Vite, and Tailwind CSS.

## Features

### Public Portfolio
✅ Home page with category grid  
✅ Category pages with project filtering  
✅ Photo/Video toggle filter  
✅ Contact form  
✅ Responsive design  
✅ Smooth animations  

### Admin Panel
✅ Firebase Authentication (Email + Google)  
✅ Authorized admin emails only  
✅ Category management (CRUD)  
✅ Project management (CRUD)  
✅ Image upload  
✅ Real-time updates  

## Setup Instructions

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Environment Configuration
Create `.env` file in `frontend/` directory:

```env
VITE_API_BASE_URL=https://vigxii-visuals-co.onrender.com
VITE_ADMIN_EMAILS=rajkishorvarma2703@gmail.com
VITE_FIREBASE_API_KEY=AIzaSyDOXObNyqDzGEmf76SwEX8S2MdL53JvRqY
VITE_FIREBASE_AUTH_DOMAIN=vigxii-visuals.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=vigxii-visuals
VITE_FIREBASE_STORAGE_BUCKET=vigxii-visuals.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=598421913263
VITE_FIREBASE_APP_ID=1:598421913263:web:d5f9b51ebdb24cd2029e5a
```

### 3. Firebase Setup (Already Configured)
The Firebase project is already set up with:
- Authentication enabled (Email/Password + Google)
- Authorized admin email: `rajkishorvarma2703@gmail.com`
- Web app configured

### 4. Start Development Server
```bash
npm run dev
```

Access:
- **Public Site**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin

### 5. Build for Production
```bash
npm run build
```

## Admin Access

### First Time Login Setup

**Option 1: Email/Password**
1. Go to http://localhost:5173/admin
2. Click "Login with Email"
3. Use your admin email and password
4. If you haven't set a password, go to Firebase Console → Authentication → Add User

**Option 2: Google Sign-In**
1. Go to http://localhost:5173/admin
2. Click "Continue with Google"
3. Sign in with authorized Google account
4. Only `rajkishorvarma2703@gmail.com` is authorized

### Adding More Admin Users
1. Go to Firebase Console
2. Update `.env` file:
   ```
   VITE_ADMIN_EMAILS=admin1@gmail.com,admin2@gmail.com
   ```
3. Restart dev server

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── figma/
│   │   │   └── ui/           # shadcn UI components
│   │   ├── Admin.tsx          # Admin panel with auth
│   │   └── App.tsx            # Public portfolio
│   ├── config/
│   │   └── firebase.ts        # Firebase configuration
│   ├── services/
│   │   ├── api.ts             # Backend API calls
│   │   └── auth.ts            # Firebase auth helpers
│   ├── styles/
│   └── main.tsx               # Entry point with routing
├── .env                       # Environment variables
├── package.json
└── vite.config.ts
```

## Authentication Flow

### Public Users
- Access portfolio at `/`
- View categories and projects
- No authentication required

### Admin Users
1. Navigate to `/admin`
2. Login with Email/Password or Google
3. System checks if email is in authorized list
4. If authorized → access admin panel
5. If not authorized → login rejected

### Security
- Firebase ID tokens used for API authentication
- Backend validates tokens on protected routes
- Only authorized emails can access admin panel
- Tokens auto-refresh when expired

## API Integration

### Endpoints Used
```
GET    /health              # Health check
GET    /categories          # Fetch all categories
POST   /categories          # Create category (auth required)
PUT    /categories/:id      # Update category (auth required)
DELETE /categories/:id      # Delete category (auth required)
GET    /projects            # Fetch all projects
POST   /projects            # Create project (auth required)
PUT    /projects/:id        # Update project (auth required)
DELETE /projects/:id        # Delete project (auth required)
POST   /upload              # Upload media (auth required)
```

### Authentication Headers
```javascript
Authorization: Bearer <firebase-id-token>
```

## Development Workflow

### Testing Locally
1. Start backend: Ensure API is running
2. Start frontend: `npm run dev`
3. Login as admin
4. Add test categories and projects
5. View changes on public site

### Common Tasks

**Add Category:**
1. Login to admin panel
2. Click "Add Category"
3. Fill form or upload image
4. Save

**Add Project:**
1. Login to admin panel
2. Click "Add Project"
3. Select category
4. Fill details and upload image
5. Choose type (photo/video)
6. Save

**Edit/Delete:**
- Click edit/delete icons on any item
- Changes reflect immediately

## Troubleshooting

### Firebase Authentication Issues
**Problem:** Can't login with email  
**Solution:** 
- Check Firebase Console → Authentication → Sign-in method
- Ensure Email/Password is enabled
- Verify user exists in Firebase

**Problem:** Google login fails  
**Solution:**
- Check Firebase Console → Authentication → Sign-in method
- Ensure Google provider is enabled
- Check authorized domains

**Problem:** "Unauthorized: Not an admin user"  
**Solution:**
- Verify email in `VITE_ADMIN_EMAILS` matches exactly
- Check for typos or extra spaces
- Restart dev server after .env changes

### API Connection Issues
**Problem:** API requests fail  
**Solution:**
- Check `VITE_API_BASE_URL` is correct
- Verify backend is running
- Check browser console for CORS errors
- Ensure Firebase token is valid

**Problem:** Upload fails  
**Solution:**
- Check file size (backend may have limits)
- Verify upload endpoint is working
- Check network tab for error details

### Build Issues
**Problem:** Build fails  
**Solution:**
```bash
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

## Deployment

### Frontend Deployment (Vercel)
1. Connect GitHub repo to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy

### Environment Variables in Vercel
Add all variables from `.env`:
- `VITE_API_BASE_URL`
- `VITE_ADMIN_EMAILS`
- All Firebase variables

### SPA Routing Configuration
Add `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## Tech Stack

**Frontend:**
- React 18.3.1
- TypeScript
- Vite 6.3.5
- Tailwind CSS 4

**Authentication:**
- Firebase Auth 11.2.0
- Email/Password provider
- Google OAuth provider

**UI Components:**
- shadcn/ui
- Radix UI primitives
- Lucide React icons

**State Management:**
- React useState/useEffect
- Firebase onAuthStateChanged

## Security Best Practices

✅ Firebase tokens used for authentication  
✅ Backend validates all tokens  
✅ Admin emails whitelisted  
✅ No sensitive data in frontend  
✅ Environment variables for config  
✅ HTTPS in production  

## Support

For issues or questions:
1. Check console for errors
2. Verify all environment variables
3. Check Firebase Console logs
4. Review backend API logs

## License
© 2024 VIGXII Visuals Co. by Vighnesh Walunj
