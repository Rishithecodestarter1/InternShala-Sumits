# youtube-clone client

React + Vite frontend for the MERN capstone.

## Scripts

```powershell
npm run dev
npm run build
npm run lint
```

## Environment

Copy `.env.example` to `.env` and keep:

```env
VITE_API_URL=http://localhost:5000/api
```

The Vite dev server also proxies `/api` requests to the backend.

## Main Screens

- Home feed with search and category filters
- Auth page for sign in and register
- Video player page with likes, dislikes, and comments
- Channel page with channel creation and video management
