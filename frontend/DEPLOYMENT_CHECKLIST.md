# Deployment Checklist ✅

## Pre-Deployment Checks

### Environment Setup
- [x] `.env` file created with all variables
- [x] Firebase credentials configured
- [x] API base URL set
- [x] Admin emails configured

### Code Complete
- [x] Firebase authentication implemented
- [x] API service layer created
- [x] Admin panel with CRUD operations
- [x] Public portfolio with dynamic data
- [x] Image upload functionality
- [x] Routing configured

### Testing Required
- [ ] Test login with email/password
- [ ] Test login with Google
- [ ] Test unauthorized email rejection
- [ ] Test category CRUD operations
- [ ] Test project CRUD operations
- [ ] Test image upload
- [ ] Test public portfolio loads categories
- [ ] Test public portfolio loads projects
- [ ] Test photo/video filtering
- [ ] Test responsive design (mobile, tablet, desktop)

## Installation Steps

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Test the application
# - Open http://localhost:5173 (public site)
# - Open http://localhost:5173/admin (admin panel)
# - Login with admin credentials
# - Add test category
# - Add test project
# - Verify data appears on public site
```

## Firebase Console Checks

- [ ] Authentication enabled
- [ ] Email/Password provider enabled
- [ ] Google provider enabled
- [ ] Admin user created (or can sign up)
- [ ] Authorized domains configured for production

## Production Deployment

### Vercel Deployment
```bash
# 1. Build locally first
npm run build

# 2. Test production build
npm run preview

# 3. Deploy to Vercel
vercel

# 4. Add environment variables in Vercel dashboard
# - Copy all variables from .env
# - Paste in Vercel → Settings → Environment Variables

# 5. Add vercel.json for SPA routing
```

### Environment Variables for Vercel
```
VITE_API_BASE_URL
VITE_ADMIN_EMAILS
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

### vercel.json
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## Post-Deployment Checks

- [ ] Production site loads
- [ ] Public portfolio displays
- [ ] Admin login works
- [ ] CRUD operations work
- [ ] Image upload works
- [ ] API calls succeed
- [ ] No console errors
- [ ] Mobile responsive
- [ ] SSL/HTTPS enabled

## Troubleshooting Guide

### If login fails:
1. Check Firebase Console → Authentication
2. Verify admin email in VITE_ADMIN_EMAILS
3. Check browser console for errors
4. Test with different browser

### If API calls fail:
1. Verify VITE_API_BASE_URL is correct
2. Check backend is running
3. Test API endpoints directly
4. Check CORS configuration

### If build fails:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Success Criteria

✅ Local development works  
✅ All features tested  
✅ No console errors  
✅ Production build succeeds  
✅ Deployed to hosting  
✅ Environment variables set  
✅ Firebase authentication works  
✅ Backend API integration works  
✅ Admin panel functional  
✅ Public site displays data  

## Final Steps

1. ✅ Code complete
2. ⏳ Run `npm install`
3. ⏳ Test locally with `npm run dev`
4. ⏳ Test all features
5. ⏳ Build for production `npm run build`
6. ⏳ Deploy to Vercel
7. ⏳ Configure environment variables
8. ⏳ Test production deployment
9. ⏳ Share with client

## Ready to Launch! 🚀

Once all checkboxes are complete, the application is ready for production use.
