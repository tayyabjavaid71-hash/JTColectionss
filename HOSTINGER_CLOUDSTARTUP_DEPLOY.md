# Hostinger Cloud Startup Auto Deploy (JT Collections)

This project is ready to deploy from one GitHub repository with two apps:
- Frontend app from `frontend`
- Backend app from `backend`

## 1) Push repository to GitHub

Use your existing repository:
- `origin`: `https://github.com/ahmadkhan32/JTColection.git`

## 2) Create Backend app in Hostinger

In Hostinger hPanel -> Websites -> Manage -> Node.js (Cloud Startup):
- Repository: `ahmadkhan32/JTColection`
- Branch: `main`
- Root Directory: `backend`
- Install Command: `npm install`
- Build Command: `npm run build`
- Start Command: `npm start`
- Node Version: `22.x`

Set backend environment variables in Hostinger (do not rely on git env files):
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `PORT=3000`
- `NODE_ENV=production`
- `FRONTEND_URL=https://jtcolections.com`
- `CORS_ORIGIN=https://jtcolections.com,https://www.jtcolections.com`
- `JWT_SECRET`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `META_PIXEL_ID`
- `META_ACCESS_TOKEN`
- `TIKTOK_PIXEL_ID`
- `TIKTOK_ACCESS_TOKEN`

Recommended domain mapping:
- `api.jtcolections.com` -> backend app

## 3) Create Frontend app in Hostinger

Create second app:
- Repository: `ahmadkhan32/JTColection`
- Branch: `main`
- Root Directory: `frontend`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Folder: `dist`

Set frontend environment variables in Hostinger:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_API_URL=https://api.jtcolections.com`
- `VITE_META_PIXEL_ID`
- `VITE_TIKTOK_PIXEL_ID`

Recommended domain mapping:
- `jtcolections.com` (and `www.jtcolections.com`) -> frontend app

## 4) Enable auto deploy

For both apps in Hostinger:
- Enable automatic deployment on push to `main`

After this, every `git push` to `main` will redeploy both apps.

## 5) Verify deployment

- Frontend: `https://jtcolections.com`
- Backend health: `https://api.jtcolections.com/health`

## 6) Security checklist

- Keep production secrets only in Hostinger environment variables.
- Do not commit `.env.production` secrets to GitHub.
- Rotate any credentials that were exposed previously.
