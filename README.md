# LAB 6 PASSPORT

## Setup

Create an `.env` file with:
```
   PORT=8000
   SESSION_SECRET=secret
   GITHUB_CLIENT_ID=xxxxxxxxx
   GITHUB_CLIENT_SECRET=yyyyyyyyyyy
   GITHUB_CALLBACK_URL=http://localhost:8000/auth/github/callback
```

## Run

instead of 'tsx app.ts', run the app: (had to load the .env file from the package.json rather than importing it on app.ts and githubStrategy.ts files)
```bash
tsx --env-file=.env app.ts
```

## What I Did
- Fixed all "😭 Fix Me" comments
- added GitHub OAuth login strategy
- Added a separate admin dashboard (`/admin`) with session management
- Fixed `ensureAdmin` middleware
- Added user roles (admin/user) to database, (for github, adds them as a regular user as a default)

## Test Users
- Admin: `jimmy123@gmail.com` / `jimmy123!`
- changed the db to have this user as an admin; use this account to see admin page or troubleshoot admin actions

## Routes
- `/auth/login` - Login page
- `/dashboard` - User dashboard
- `/admin` - Admin dashboard (admins only page)
- `/auth/github` - GitHub OAuth login
- `/auth/logout` - Logout
