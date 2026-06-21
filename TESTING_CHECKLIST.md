# MERN Portfolio - Testing Checklist

## ✅ Pre-Testing Setup

- [ ] Backend is running and accessible
- [ ] MongoDB is connected
- [ ] Cloudinary is configured
- [ ] Firebase project is set up
- [ ] Environment variables are set
- [ ] CORS is configured for your domain

## 🧪 Frontend Testing

### Homepage Tests:
- [ ] Homepage loads without errors
- [ ] Categories are displayed
- [ ] Category images load correctly
- [ ] Category count matches backend
- [ ] No console errors (except warnings)
- [ ] Loading state shows briefly
- [ ] Empty state shows if no categories

**Console Check**: Should see:
```
🔄 Loading data from API...
📦 Fetched X categories
📦 Fetched Y projects
✅ Data loaded successfully
```

### Category Page Tests:
- [ ] Click on category navigates correctly
- [ ] Projects for category are displayed
- [ ] Photo/Video filter works
- [ ] Project images load correctly
- [ ] Hover overlay shows title/description
- [ ] Back navigation works

**Console Check**: Should see:
```
👆 Category clicked: [id]
🎯 Viewing category: [name]
Found X projects for category
```

### Contact Page Tests:
- [ ] Contact page loads
- [ ] Form fields work
- [ ] Form validation works
- [ ] Submit shows success message
- [ ] Back to work link works

## 🔐 Admin Panel Testing

### Login Tests:
- [ ] Email/password login works
- [ ] Google OAuth login works
- [ ] Non-admin emails are rejected
- [ ] Logout works
- [ ] Session persists on refresh

**Access**: Navigate to `/admin`

### Category Management:
- [ ] Categories list loads
- [ ] "Add Category" button works
- [ ] Form opens in modal
- [ ] All fields are editable
- [ ] Upload image button works
- [ ] Image preview shows
- [ ] Save creates new category
- [ ] Edit button opens populated form
- [ ] Update saves changes
- [ ] Delete removes category (with confirmation)
- [ ] Changes reflect immediately

**Console Check**: Should see:
```
📝 Creating category
📤 Uploading file
✅ Category created
🔄 [Admin] Loading data...
```

### Project Management:
- [ ] Projects list loads
- [ ] "Add Project" button works
- [ ] Form opens in modal
- [ ] Category dropdown populated
- [ ] Type selection works (photo/video)
- [ ] Upload image button works
- [ ] Image preview shows
- [ ] Save creates new project
- [ ] Edit button opens populated form
- [ ] Update saves changes
- [ ] Delete removes project (with confirmation)
- [ ] Changes reflect immediately
- [ ] Category name shows correctly

**Console Check**: Should see:
```
📝 Creating project
📤 Uploading file
✅ Project created
```

## 🖼️ Image Testing

### Upload Tests:
- [ ] Small images upload (< 1MB)
- [ ] Large images upload (< 10MB)
- [ ] JPEG images work
- [ ] PNG images work
- [ ] Upload shows progress
- [ ] URL appears in form
- [ ] Preview shows correctly

### Display Tests:
- [ ] Category covers load
- [ ] Project images load
- [ ] Broken images show fallback
- [ ] Images are not distorted
- [ ] Hover effects work
- [ ] Lazy loading works

**If images fail**: Check console for:
```
❌ Image failed to load: [url]
```

## 🔍 Error Handling Tests

### Network Errors:
- [ ] Disconnect internet → See error message
- [ ] Retry button appears
- [ ] Retry button works
- [ ] Error message is clear

### API Errors:
- [ ] Invalid data → Shows error alert
- [ ] Unauthorized → Login required
- [ ] Server error → Shows error message

### Upload Errors:
- [ ] Large file → Shows error
- [ ] Wrong file type → Shows error
- [ ] Network error → Shows error

## 📱 Responsive Testing

- [ ] Mobile view (< 640px) works
- [ ] Tablet view (640-1024px) works
- [ ] Desktop view (> 1024px) works
- [ ] Images scale properly
- [ ] Text is readable
- [ ] Buttons are clickable
- [ ] Forms are usable

## 🚀 Performance Testing

- [ ] Initial load < 3 seconds
- [ ] Images lazy load
- [ ] No layout shifts
- [ ] Smooth scrolling
- [ ] Animations are smooth
- [ ] No memory leaks (check DevTools)

## 🐛 Debug Console Check

### Expected Logs (No Errors):
```
🔄 Loading data from API...
🔵 API Request: GET /categories
✅ API Response: 200
📦 Fetched X categories
🔵 API Request: GET /projects
✅ API Response: 200
📦 Fetched Y projects
✅ Data loaded successfully
```

### Red Flags (Need Fixing):
```
❌ Network Error
❌ API Error: 401
❌ Failed to fetch
❌ Image failed to load
```

## 🌐 Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

## 📊 Data Integrity Tests

### Categories:
- [ ] All fields save correctly
- [ ] Order field works
- [ ] Year displays correctly
- [ ] Cover image displays

### Projects:
- [ ] Title saves
- [ ] Description saves
- [ ] Category link works
- [ ] Type filter works
- [ ] Tech stack saves
- [ ] Optional fields work

### Relationships:
- [ ] Projects show under correct category
- [ ] Category deletion warning works
- [ ] Deleting category shows orphaned projects

## 🔐 Security Tests

- [ ] Admin routes require auth
- [ ] Non-admin emails rejected
- [ ] Bearer token sent in requests
- [ ] Token expires correctly
- [ ] Logout clears session

## 📝 API Direct Testing

### Using cURL or Postman:

```bash
# Health Check
curl https://vigxii-visuals-co.onrender.com/health

# Get Categories
curl https://vigxii-visuals-co.onrender.com/categories

# Get Projects
curl https://vigxii-visuals-co.onrender.com/projects
```

Expected Response Format:

**Categories**:
```json
[
  {
    "_id": "...",
    "title": "Photography",
    "year": "2024",
    "coverUrl": "https://res.cloudinary.com/...",
    "order": 1,
    "createdAt": "..."
  }
]
```

**Projects**:
```json
[
  {
    "_id": "...",
    "title": "Project Name",
    "description": "Description",
    "imageUrl": "https://res.cloudinary.com/...",
    "categoryId": "...",
    "type": "photo",
    "techStack": [],
    "createdAt": "..."
  }
]
```

## ✅ Deployment Checklist

### Frontend (Vercel/Netlify):
- [ ] Build succeeds locally (`pnpm build`)
- [ ] Environment variables set
- [ ] API URL points to production
- [ ] Firebase config is production
- [ ] CORS configured for production domain

### Backend (Render/Heroku):
- [ ] Environment variables set
- [ ] MongoDB connection string is production
- [ ] Cloudinary keys are production
- [ ] CORS allows frontend domain
- [ ] Health endpoint accessible
- [ ] Logs show no errors

### DNS & SSL:
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] HTTPS enforced

## 🎯 Final Verification

Run through this full user journey:

1. Visit homepage → See categories
2. Click category → See projects
3. Filter by photo/video → Works
4. Click contact → Form appears
5. Navigate to `/admin` → Login page
6. Login with admin email → Dashboard loads
7. Create new category → Success
8. Upload image → Image loads
9. Create new project → Success
10. View on homepage → Appears correctly
11. Edit project → Changes save
12. Delete test data → Removes correctly

**If all checks pass → You're ready for production! 🎉**

## 🆘 If Issues Occur

1. Check browser console for errors
2. Check Network tab for failed requests
3. Review `DEBUGGING_GUIDE.md`
4. Use `api-test.js` utility
5. Check backend logs
6. Verify environment variables
7. Test backend endpoints directly

## 📞 Quick Debug Commands

### Browser Console:
```javascript
// Load test utility
// (Copy api-test.js contents and paste)

// Run all tests
apiTest.all();

// Check specific endpoint
apiTest.categories();
apiTest.projects();
```

### Check Backend:
```bash
# Test health
curl https://vigxii-visuals-co.onrender.com/health

# Check if backend is sleeping (Render free tier)
# If slow response, backend may need to wake up
```

---

**Remember**: First load may be slow if backend is sleeping (Render free tier). Subsequent loads should be fast.

**Happy Testing! 🚀**
