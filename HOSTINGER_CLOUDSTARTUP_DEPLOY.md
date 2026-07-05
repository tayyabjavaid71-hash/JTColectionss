# Hostinger Cloud Startup Auto Deploy (JT Collections)

This project is ready to deploy from one GitHub repository with two apps:
- Frontend app from `frontend`
- Backend app from `backend`

## 1) Push repository to GitHub

Use your existing repository:
- Full monorepo: `https://github.com/tayyabjavaid71-hash/JTColectionss.git`
- Backend only: `https://github.com/tayyabjavaid71-hash/backend.git`
- Frontend only: `https://github.com/tayyabjavaid71-hash/frontend.git`

## 2) Create Backend app in Hostinger

In Hostinger hPanel -> Websites -> Manage -> Node.js (Cloud Startup):
- Repository: `ahmadkhan32/JTColection`
- Repository: `tayyabjavaid71-hash/backend` (recommended) OR `tayyabjavaid71-hash/JTColectionss` with root `backend`
- Branch: `main`
- Root Directory: `backend`
- Install Command: `npm ci`
- Build Command: `npm run build`
- Start Command: `npm start`
- Node Version: `20.x` or `22.x`
- Entry file (if Hostinger asks): `server.js`

Why this avoids build errors:
- `backend/.npmrc` includes `include=dev`, so TypeScript/compiler dependencies are installed even when `NODE_ENV=production` is set.

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
- Repository: `tayyabjavaid71-hash/frontend` (recommended) OR `tayyabjavaid71-hash/JTColectionss` with root `frontend`
- Branch: `main`
- Root Directory: `frontend`
- Install Command: `npm ci`
- Build Command: `npm run build`
- Output Folder: `dist`

Why this avoids build errors:
- `frontend/.npmrc` includes `include=dev`, so Vite/TypeScript build tools are available during Hostinger build.

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

## 4.1) Auto deploy vs manual deploy (recommended choices)

- Auto deploy + separate apps (recommended):
	- Use two Hostinger apps (`backend` + `frontend`) and enable auto deploy on `main` for both.
	- Best for reliability and easier debugging.
- Manual deploy + separate apps:
	- Trigger deploy manually from Hostinger after each push.
	- Useful while testing environment variables the first time.
- Deploy together as one app (not recommended for this repo):
	- Possible, but harder to manage domains/scaling and can cause build confusion.
	- Keep separate unless you have a strict one-app requirement.

## 5) Verify deployment

- Frontend: `https://jtcolections.com`
- Backend health: `https://api.jtcolections.com/health`

## 6) Security checklist

- Keep production secrets only in Hostinger environment variables.
- Do not commit `.env.production` secrets to GitHub.
- Rotate any credentials that were exposed previously.

## 7) If jtcolections.com shows 403 Forbidden

Most common reason: deploying repository root to `public_html` where no site `index.html` exists.
In this project, the real website files are generated in `frontend/dist`.

Fix options:

- Preferred for static hosting panel: deploy only `frontend/dist` content to `public_html`.
- If using GitHub Actions, this repository includes `.github/workflows/deploy-frontend-hostinger.yml` which builds frontend and uploads `frontend/dist` to `/public_html/` over FTP.
- Apache SPA fallback is included in `frontend/public/.htaccess` so client-side routes do not return 404/403 after refresh.

Required GitHub repository secrets for the workflow:
- `HOSTINGER_FTP_HOST`
- `HOSTINGER_FTP_USERNAME`
- `HOSTINGER_FTP_PASSWORD`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_API_URL`
- `VITE_META_PIXEL_ID`
- `VITE_TIKTOK_PIXEL_ID`
