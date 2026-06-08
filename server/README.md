# youtube-clone server

Express + MongoDB backend for the MERN capstone.

## Scripts

```powershell
npm run dev
npm start
npm run seed
```

## Environment

Copy `.env.example` to `.env` and provide:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_very_long_secret_key_here
```

## Seed Data

`npm run seed` creates:

- 2 users
- 1 channel
- 6 videos
- 3 comments

Use `john@example.com` or `jane@example.com` with password `password123`.
