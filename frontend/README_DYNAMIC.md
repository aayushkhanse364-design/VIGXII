# VIGXII Visuals Co. - Dynamic Portfolio Frontend

## Overview
A dynamic portfolio website that connects to the backend API to manage categories and projects. Built with React 18, TypeScript, Vite, and Tailwind CSS.

## Features

### Public Portfolio
- **Home Page** - Grid display of all portfolio categories
- **Category Pages** - Filtered view of projects by category
- **Photo/Video Filtering** - Toggle between photo and video projects
- **Contact Form** - Get in touch section
- **Responsive Design** - Mobile-first, works on all devices
- **Elegant UI** - Luxury design with smooth animations

### Admin Panel
- **Category Management** - Create, edit, delete categories
- **Project Management** - Create, edit, delete projects
- **Image Upload** - Upload media files to backend
- **Authentication** - Token-based access control
- **Real-time Preview** - See changes immediately

## Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Environment Configuration
Create `.env` file in `frontend/` directory:
```
VITE_API_BASE_URL=https://vigxii-visuals-co.onrender.com
```

### 3. Start Development Server
```bash
npm run dev
```

The site will be available at:
- **Public Portfolio**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin

### 4. Build for Production
```bash
npm run build
```

## API Integration

### Service Layer (`src/services/api.ts`)
All backend communication is handled through the API service:

**Projects:**
- `getProjects()` - Fetch all projects
- `createProject(data)` - Create new project
- `updateProject(id, data)` - Update existing project
- `deleteProject(id)` - Delete project

**Categories:**
- `getCategories()` - Fetch all categories
- `createCategory(data)` - Create new category
- `updateCategory(id, data)` - Update existing category
- `deleteCategory(id)` - Delete category

**Upload:**
- `uploadMedia(file)` - Upload image/video file

### Data Models

**Category:**
```typescript
{
  _id: string;
  title: string;
  year: string;
  coverUrl: string;
  order: number;
  createdAt: string;
}
```

**Project:**
```typescript
{
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  techStack: string[];
  githubLink?: string;
  categoryId: string;
  createdAt: string;
  type?: "photo" | "video";
}
```

## Admin Access

### Login
1. Navigate to `/admin`
2. Enter your auth token (Bearer token from backend)
3. Token is stored in localStorage for persistent sessions

### Managing Categories
- Click "Add Category" to create new
- Fill in: Title, Year, Cover URL, Order
- Use "Upload Image" to upload cover image
- Edit or delete existing categories

### Managing Projects
- Click "Add Project" to create new
- Fill in: Title, Description, Image URL, Category, Type
- Add optional: Video URL, GitHub Link, Tech Stack
- Use "Upload Image" to upload project image
- Edit or delete existing projects

## File Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── figma/
│   │   │   └── ui/          # shadcn UI components
│   │   ├── Admin.tsx         # Admin panel component
│   │   └── App.tsx           # Public portfolio component
│   ├── services/
│   │   └── api.ts            # API service layer
│   ├── styles/               # Global styles
│   └── main.tsx              # Entry point with routing
├── .env                      # Environment variables
├── package.json
└── vite.config.ts
```

## Technologies

- **React 18.3.1** - UI framework
- **TypeScript** - Type safety
- **Vite 6.3.5** - Build tool
- **Tailwind CSS 4** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons
- **Fetch API** - HTTP requests

## Design System

**Typography:**
- Headings: Playfair Display
- Body: Inter

**Colors:**
- Accent: #C8A96A (Gold)
- Background: #ffffff (White)
- Text: #000000 (Black)

**Spacing:**
- Letter-spacing: Heavy for luxury feel
- Padding: Generous whitespace

## Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist/` folder
3. Set environment variable: `VITE_API_BASE_URL`
4. Configure rewrites for SPA routing:
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```

### Backend URL
Update `.env` with your backend URL:
```
VITE_API_BASE_URL=https://your-backend-url.com
```

## Troubleshooting

**API Connection Issues:**
- Check `.env` file has correct `VITE_API_BASE_URL`
- Verify backend is running
- Check browser console for CORS errors

**Admin Login Issues:**
- Verify auth token is correct
- Check localStorage: `localStorage.getItem('authToken')`
- Try clearing localStorage and re-login

**Build Errors:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`
- Update dependencies: `npm update`

## License
© 2024 VIGXII Visuals Co. by Vighnesh Walunj
