# 🚀 Quick Start - Fix "Failed to load data"

## The Problem
You're seeing "Failed to load data" because the **development server is not running**.

## The Solution

### 1️⃣ Start the Dev Server

```bash
cd d:\vigxi11\frontend
npm run dev
```

### 2️⃣ Open Your Browser

Go to: **http://localhost:5173**

### 3️⃣ Verify It's Working

You should see:
- ✅ 3 categories on the homepage (test, wedding, Graphic Design)
- ✅ Images loading from Cloudinary
- ✅ No errors in the browser console

## 🔍 Troubleshooting

### If you see "command not found"
```bash
npm install
npm run dev
```

### If port 5173 is already in use
The server will automatically use the next available port (5174, 5175, etc.)

### Check if the backend is working
```bash
curl https://vigxii-visuals-co.onrender.com/health
```

Should return: `{"status":"ok","message":"Server is healthy"}`

## ✅ Status Check

- ✅ Backend API is online and working
- ✅ Backend has 3 categories with data
- ✅ Environment variables are configured
- ✅ Code is properly set up
- ⏳ Just need to start the dev server!

## 🎯 Next Steps After Starting

1. **Test the public portfolio** - Browse categories and projects
2. **Test admin login** - Go to `/admin` and log in
3. **Add more content** - Use the admin panel to add categories/projects

## 📝 Admin Access

- URL: http://localhost:5173/admin
- Email: rajkishorvarma2703@gmail.com
- Password: Set in Firebase Console (or use Google Sign-In)

---

**You're almost there! Just run `npm run dev` and everything will work! 🚀**
