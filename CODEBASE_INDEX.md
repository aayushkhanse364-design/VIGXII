# Codebase Index - VIGXII Visuals Co.

## Project Overview
**Type:** Dark Portfolio Website (Visual Storytelling Platform)  
**Framework:** React 18.3.1 + TypeScript + Vite 6.3.5  
**UI Library:** shadcn/ui with Radix UI primitives  
**Styling:** Tailwind CSS v4.1.12 + Material UI  
**Backend:** Firebase Auth + REST API (https://vigxii-visuals-co.onrender.com)  
**Package Manager:** pnpm  
**Owner:** Vighnesh Walunj

## Project Structure

```
vigxi11/
├── frontend/
│   ├── guidelines/             # Project guidelines
│   ├── src/
│   │   ├── app/               # Application components
│   │   │   ├── components/
│   │   │   │   ├── figma/     # ImageWithFallback component
│   │   │   │   └── ui/        # shadcn UI components (45+)
│   │   │   ├── Admin.tsx      # Admin dashboard (CMS)
│   │   │   ├── App.tsx        # Main portfolio SPA
│   │   │   └── AppDynamic.tsx # Dynamic app variant
│   │   ├── config/
│   │   │   └── firebase.ts    # Firebase configuration
│   │   ├── services/
│   │   │   ├── api.ts         # REST API client
│   │   │   └── auth.ts        # Firebase Auth service
│   │   ├── imports/           # Static images (image-1 to image-9)
│   │   ├── styles/            # CSS modules
│   │   └── main.tsx           # React root entry
│   └── [config files]         # Vite, Tailwind, PostCSS, etc.
├── CODEBASE_INDEX.md          # This file
└── postman_collection.json    # API testing collection
```

## Core Files

### Entry Point
- **`src/main.tsx`** - React 18 root rendering, imports global styles

### Main Applications
- **`src/app/App.tsx`** (437 lines) - Main portfolio SPA
  - Pages: Home, Category, Contact
  - Components: SiteHeader, PortfolioCard, HomePage, CategoryPage, ContactPage
  - State: View routing (home | category | contact)
  - Features: Dynamic category loading from API, photo/video filtering, contact form
  - Integration: Firebase Auth, REST API for categories/projects

- **`src/app/Admin.tsx`** - Admin dashboard/CMS
  - Authentication required (Firebase)
  - Manage categories and projects
  - Media upload functionality
  - Admin-only access with email whitelist

- **`src/app/AppDynamic.tsx`** - Dynamic variant of main app

### Styling
- **`src/styles/index.css`** - Global styles import
- **`src/styles/globals.css`** - Base global styles
- **`src/styles/tailwind.css`** - Tailwind directives
- **`src/styles/theme.css`** - Custom theme variables
- **`src/styles/fonts.css`** - Font definitions

### UI Components (45 components)
Located in `src/app/components/ui/`:
- Forms: button, input, textarea, select, checkbox, radio-group, switch, form
- Dialogs: alert-dialog, dialog, drawer, sheet
- Navigation: navigation-menu, menubar, breadcrumb, pagination
- Overlays: popover, tooltip, hover-card, dropdown-menu, context-menu
- Layout: card, separator, resizable, scroll-area, sidebar, tabs, accordion, collapsible
- Data Display: table, avatar, badge, calendar, chart, carousel
- Feedback: alert, progress, skeleton, sonner (toast)
- Input: input-otp, slider
- Toggle: toggle, toggle-group
- Utilities: use-mobile.ts, utils.ts

### Backend Integration
- **`src/config/firebase.ts`** - Firebase app initialization and auth setup
  - Environment variables: API key, auth domain, project ID, storage bucket, etc.

- **`src/services/api.ts`** - REST API client
  - Base URL: https://vigxii-visuals-co.onrender.com
  - Endpoints: Projects (CRUD), Categories (CRUD), Upload, Health check
  - Auth: Bearer token from Firebase
  - Types: Project, Category

- **`src/services/auth.ts`** - Firebase Authentication service
  - Email/password login
  - Google OAuth login
  - Admin email whitelist validation
  - Auth state management
  - Token retrieval

### Custom Components
- **`src/app/components/figma/ImageWithFallback.tsx`** - Image component with fallback handling

## Configuration Files

### Build & Dev
- **`vite.config.ts`** - Vite configuration
- **`package.json`** - Dependencies & scripts
  - Scripts: `dev`, `build`
  - Main deps: React 18.3.1, Radix UI, Material UI, React Router 7.13.0, Motion, Firebase 11.2.0
- **`.env`** - Environment variables (Firebase config, API URLs, admin emails)
  
### Styling
- **`postcss.config.mjs`** - PostCSS setup
- **`default_shadcn_theme.css`** - shadcn theme defaults

### Workspace
- **`pnpm-workspace.yaml`** - pnpm workspace config

## Key Dependencies

### Backend & Auth
- firebase v11.2.0 (Auth + SDK)

### UI & Styling
- @radix-ui/* (30+ primitives: dialog, dropdown, select, etc.)
- @mui/material v7.3.5 + @mui/icons-material v7.3.5
- tailwindcss v4.1.12 + @tailwindcss/vite v4.1.12
- lucide-react v0.487.0 (icons)
- class-variance-authority v0.7.1
- tailwind-merge v3.2.0

### Functionality
- react-router v7.13.0
- react-hook-form v7.55.0 (form management)
- react-dnd v16.0.1 + react-dnd-html5-backend (drag & drop)
- motion v12.23.24 (animations)
- recharts v2.15.2 (charts)
- date-fns v3.6.0 (date utilities)

### UI Components
- cmdk v1.1.1 (command menu)
- sonner v2.0.3 (toast notifications)
- vaul v1.1.2 (drawer)
- embla-carousel-react v8.6.0
- react-day-picker v8.10.1
- canvas-confetti v1.9.4
- react-responsive-masonry v2.7.1

## Application Features

### Public Pages
1. **Home** - Dynamic portfolio grid (categories loaded from API)
   - Displays all portfolio categories with cover images
   - Responsive grid layout (1-3 columns)
   - Loading states
   - Sorted by order field

2. **Category** - Filtered gallery view
   - Photo/video filter toggle
   - Projects filtered by category
   - Hover overlay with title/description
   - Dynamic data from API

3. **Contact** - Contact form
   - Fields: name, email, project type, message
   - Service selection: Photography, Videography, Commercials, Graphic Design, Events, Other
   - Success confirmation screen
   - Form validation

### Admin Features (Admin.tsx)
- Firebase authentication required
- Admin email whitelist validation
- Category management: Create, update, delete, reorder
- Project management: Create, update, delete
- Media upload to server
- Real-time data synchronization

### Navigation
- Header: Brand name, tagline, nav links (Work, Contact)
- Social links: Instagram, YouTube, LinkedIn
- Smooth scrolling
- Back to top button
- Footer with copyright

### Design System
- Typography: Playfair Display (headings), Inter (body)
- Color: Gold accent (#C8A96A), Black text, White background
- Minimal, elegant, high-end portfolio aesthetic
- Letter-spacing heavy for luxury feel
- Hover transitions and animations

## Data Models

### Category
```typescript
interface Category {
  _id: string;
  title: string;
  year: string;
  coverUrl: string;
  order: number;
  createdAt: string;
}
```

### Project
```typescript
interface Project {
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

## Image Strategy
- Dynamic images from API (imageUrl, coverUrl, videoUrl)
- Lazy loading with loading="lazy"
- Aspect ratio: 3:2 for portfolio items
- Hover scale effects (1.04x)
- Fallback background color: #f0f0f0

## State Management
- React useState for local state
- View routing: `{ type: "home" } | { type: "category"; id: string } | { type: "contact" }`
- Global state: categories[], projects[], loading
- Form state in contact page
- Filter state in category pages ("all" | "photo" | "video")
- Firebase auth state listener

## API Endpoints

Base URL: `https://vigxii-visuals-co.onrender.com`

### Public Endpoints
- `GET /health` - Health check
- `GET /projects` - Get all projects
- `GET /categories` - Get all categories

### Protected Endpoints (requires Bearer token)
- `POST /projects` - Create project
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project
- `POST /categories` - Create category
- `PUT /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category
- `POST /upload` - Upload media file

## Environment Variables

Required in `.env`:
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_API_BASE_URL (optional, defaults to production API)
VITE_ADMIN_EMAILS (comma-separated list)
```

## Development

### Commands
```bash
pnpm i             # Install dependencies
pnpm dev           # Start dev server (Vite)
pnpm build         # Production build
```

### Tech Stack Version
- React: 18.3.1
- Vite: 6.3.5
- Tailwind: 4.1.12
- TypeScript: via Vite plugin

## Deployment
- Frontend: Vercel (config in `vercel.json`)
- Backend: Render.com (API)
- Documentation: See `DEPLOYMENT_CHECKLIST.md`, `SETUP_GUIDE.md`, `QUICKSTART.md`

## Notes
- Single-page application with state-based routing (no React Router routes)
- All routing handled via View type: `home | category | contact`
- Fully responsive design (mobile-first, breakpoints: sm, md, lg)
- Accessibility: ARIA labels, semantic HTML, focus states, keyboard navigation
- Backend integration: Firebase Auth + REST API for data
- Contact form: Frontend-only (no backend submission yet)
- Admin access: Email whitelist validation
- Error handling: Try-catch blocks with console logging
- Loading states: Skeleton screens and loading messages
